"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RiErrorWarningLine } from "@remixicon/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  const isAuthError = error.message.includes("401");
  const isServerError = error.message.includes("500");

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="section-container max-w-2xl mx-auto text-center">
        <RiErrorWarningLine className="size-20 text-red-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold font-hanken text-gray-900 mb-4">
          {isAuthError
            ? "Authentication Error"
            : isServerError
            ? "Server Error"
            : "Something Went Wrong"}
        </h1>
        <p className="text-gray-600 font-rubik mb-8">
          {isAuthError
            ? "Unable to authenticate with the blog service. Please check your configuration."
            : isServerError
            ? "The blog service is currently unavailable. Please try again later."
            : "An unexpected error occurred while loading the blog."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-secondary text-white font-rubik font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3 bg-gray-200 text-gray-700 font-rubik font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
