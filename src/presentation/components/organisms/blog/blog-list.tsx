"use client";

import Link from "next/link";
import Image from "next/image";
import type { BlogArticleSummary } from "@/types/blog.type";
import {
  getBlogExcerpt,
  getBlogReadingTime,
  getPrimaryBlogImage,
} from "@/lib/blog-content";
import { formatBlogDate } from "@/lib/blog-date";

interface BlogListProps {
  articles: BlogArticleSummary[];
  currentPage: number;
  totalPages: number;
}

export function BlogList({ articles, currentPage, totalPages }: BlogListProps) {
  console.log("[BlogList] Total articles:", articles.length);
  articles.forEach((article) => {
    console.log(`[BlogList] Article "${article.title}":`, {
      images_raw: article.images,
      images_count: article.images?.length ?? 0,
      primary_image: getPrimaryBlogImage(article.images),
    });
  });

  return (
    <div className="space-y-10">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const image = getPrimaryBlogImage(article.images);
          return (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="block group"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {/* Image area */}
                <div className="relative h-48 w-full bg-gray-100">
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.alt || article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 font-rubik text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base font-bold font-hanken text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 font-rubik text-sm line-clamp-2">
                    {getBlogExcerpt(article.content, 100)}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-rubik mt-1">
                    <span>{formatBlogDate(article.published_at)}</span>
                    <span>•</span>
                    <span>{getBlogReadingTime(article.content)} min read</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-rubik font-semibold transition-colors"
            >
              Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              className={`px-4 py-2 rounded-lg font-rubik font-semibold transition-colors ${
                page === currentPage
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-rubik font-semibold transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
