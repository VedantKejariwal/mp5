import UrlForm from "@/components/UrlForm";
import DatabaseNotice from "@/components/DatabaseNotice";

export default function Home() {
  const showDatabaseNotice = !process.env.MONGO_URI || 
    process.env.MONGO_URI === "mongodb+srv://username:password@cluster.mongodb.net/database-name";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Link Shortener
          </h1>
          <p className="text-xl text-gray-300">
            Create compact, shareable links from your long URLs
          </p>
        </div>
        {showDatabaseNotice && <DatabaseNotice />}
        <UrlForm />
      </div>
    </main>
  );
} 