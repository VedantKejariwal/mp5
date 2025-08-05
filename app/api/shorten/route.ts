import { NextRequest, NextResponse } from "next/server";
import getDatabaseCollection, { LINKS_COLLECTION_NAME } from "@/config/database";
import { LinkData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { longUrl, customSlug } = body;

    // Basic validation
    if (!longUrl || !customSlug) {
      return NextResponse.json(
        { success: false, error: "URL and custom slug are required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(longUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "Please enter a valid URL" },
        { status: 400 }
      );
    }

    // Check for cycles
    if (
      longUrl.includes("localhost:3000") ||
      longUrl.includes("url-shortener-app.vercel.app")
    ) {
      return NextResponse.json(
        { success: false, error: "Cannot shorten URLs that point to this service" },
        { status: 400 }
      );
    }

    // Validate slug format
    if (encodeURIComponent(customSlug) !== customSlug) {
      return NextResponse.json(
        { success: false, error: "Slug contains invalid characters" },
        { status: 400 }
      );
    }

    const linksCollection = await getDatabaseCollection(LINKS_COLLECTION_NAME);

    // Check if slug already exists
    const existingLink = await linksCollection.findOne({ slug: customSlug });
    if (existingLink) {
      return NextResponse.json(
        { success: false, error: "This alias is already taken." },
        { status: 409 }
      );
    }

    // Verify URL is reachable
    try {
      const response = await fetch(longUrl);
      if (response.status >= 400) {
        return NextResponse.json(
          { success: false, error: `URL returned error status: ${response.status}` },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "Could not verify URL accessibility" },
        { status: 400 }
      );
    }

    // Create new link document
    const newLink: Omit<LinkData, '_id'> = {
      slug: customSlug,
      targetUrl: longUrl,
      createdAt: new Date(),
      clickCount: 0,
    };

    const result = await linksCollection.insertOne(newLink);

    if (result.acknowledged) {
      // Use production domain in production, local domain in development
      const isProduction = process.env.NODE_ENV === "production";
      const baseUrl = isProduction 
        ? "https://cs391-url-shortener.vercel.app" 
        : request.nextUrl.origin;
      const shortenedUrl = `${baseUrl}/${customSlug}`;
      return NextResponse.json({
        success: true,
        shortenedUrl,
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to create shortened URL" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in shorten API:", error);
    const errorMessage = error instanceof Error && error.message.includes("MONGO_URI") 
      ? "Database configuration error. Please check your MongoDB connection." 
      : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
} 