import { redirect } from "next/navigation";
import findUrlBySlug from "@/utils/findUrlBySlug";
import incrementClickCount from "@/utils/incrementClickCount";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("Redirecting slug:", slug);

  const targetUrl = await findUrlBySlug(slug);

  if (targetUrl) {
    // Increment click count for analytics
    await incrementClickCount(slug);
    redirect(targetUrl);
  }

  // If no URL found, redirect to home
  redirect("/");
} 