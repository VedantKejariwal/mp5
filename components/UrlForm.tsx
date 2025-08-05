"use client";
import { useState, useEffect } from "react";

export default function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentDomain, setCurrentDomain] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Use production domain if available, otherwise fallback to current origin
    const productionDomain = "https://cs391-url-shortener.vercel.app";
    const isDevelopment = window.location.hostname === "localhost";
    setCurrentDomain(isDevelopment ? window.location.origin : productionDomain);
  }, []);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setCopySuccess(false);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl,
          customSlug,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShortenedUrl(data.shortenedUrl);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="w-full bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-xl">
      <div className="mb-8">
        <h2 className="font-semibold text-3xl text-white mb-2">Create Short Link</h2>
        <p className="text-gray-400">
          Transform your long URLs into clean, shareable links
        </p>
      </div>
      
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label htmlFor="longUrl" className="block text-lg font-medium text-white mb-2">
            Long URL
          </label>
          <input
            id="longUrl"
            type="url"
            placeholder="https://example.com/your/very/long/url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            disabled={isLoading}
            required
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="customSlug" className="block text-lg font-medium text-white mb-2">
            Custom Alias
          </label>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 whitespace-nowrap text-sm">
              {currentDomain}/
            </span>
            <input
              id="customSlug"
              type="text"
              placeholder="my-custom-link"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              disabled={isLoading}
              required
              className="flex-1 bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
        >
          {isLoading ? "Creating..." : "Create Short Link"}
        </button>

        {errorMessage && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md text-center">
            {errorMessage}
          </div>
        )}
      </form>

      {shortenedUrl && (
        <div className="mt-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-300">
              Your shortened link:
            </div>
            <div className="flex items-center gap-3">
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium break-all"
              >
                {shortenedUrl}
              </a>
              <button
                onClick={handleCopyToClipboard}
                className="flex-shrink-0 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors"
              >
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 