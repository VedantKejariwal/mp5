"use client";

export default function DatabaseNotice() {
  return (
    <div className="w-full bg-yellow-900 border border-yellow-700 text-yellow-200 px-6 py-4 rounded-lg mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="text-yellow-400 text-xl">⚠️</div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-1">Database Configuration Required</h3>
          <p className="text-sm mb-2">
            To use this URL shortener, you need to configure your MongoDB connection.
          </p>
          <ol className="text-xs space-y-1 list-decimal list-inside">
            <li>Create a MongoDB Atlas account at mongodb.com/atlas</li>
            <li>Create a new cluster and database</li>
            <li>Get your connection string</li>
            <li>Update the MONGO_URI in your .env.local file</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 