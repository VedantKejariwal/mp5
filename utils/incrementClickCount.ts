import getDatabaseCollection, { LINKS_COLLECTION_NAME } from "@/config/database";

export default async function incrementClickCount(slug: string): Promise<void> {
  if (!slug) {
    return;
  }

  try {
    const linksCollection = await getDatabaseCollection(LINKS_COLLECTION_NAME);
    await linksCollection.updateOne(
      { slug },
      { $inc: { clickCount: 1 } }
    );
  } catch (error) {
    console.error("Error incrementing click count:", error);
  }
} 