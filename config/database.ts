import { MongoClient, Db, Collection } from "mongodb";

const DATABASE_NAME = "url-shortener-app";
export const LINKS_COLLECTION_NAME = "shortened-links";

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

async function connectToDatabase(): Promise<Db> {
  const CONNECTION_STRING = process.env.MONGO_URI as string;
  if (!CONNECTION_STRING || CONNECTION_STRING === "mongodb+srv://username:password@cluster.mongodb.net/database-name") {
    throw new Error("Please configure MONGO_URI environment variable with your actual MongoDB connection string");
  }
  
  if (!mongoClient) {
    mongoClient = new MongoClient(CONNECTION_STRING);
    await mongoClient.connect();
  }
  return mongoClient.db(DATABASE_NAME);
}

export default async function getDatabaseCollection(
  collectionName: string,
): Promise<Collection> {
  if (!database) {
    database = await connectToDatabase();
  }
  
  return database.collection(collectionName);
} 