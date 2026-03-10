import Link from "next/link";
import { RiArticleLine } from "@remixicon/react";

export default function NotFound() {
  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="section-container max-w-2xl mx-auto text-center">
        <RiArticleLine className="size-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-4xl font-bold font-hanken text-gray-900 mb-4">
          Article Not Found
        </h1>
        <p className="text-gray-600 font-rubik mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="inline-block px-8 py-3 bg-secondary text-white font-rubik font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
