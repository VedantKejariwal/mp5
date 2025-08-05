import getDatabaseCollection, { LINKS_COLLECTION_NAME } from "@/config/database";

export default async function findUrlBySlug(slug: string): Promise<string | null> {
  if (!slug) {
    return null;
  }

  try {
    const linksCollection = await getDatabaseCollection(LINKS_COLLECTION_NAME);
    const linkDocument = await linksCollection.findOne({ slug });

    if (!linkDocument) {
      return null;
    }

    return linkDocument.targetUrl;
  } catch (error) {
    console.error("Error finding URL by slug:", error);
    return null;
  }
} 