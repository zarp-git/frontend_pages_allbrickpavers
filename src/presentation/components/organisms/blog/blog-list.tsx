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
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <div className="space-y-12">

      {/* Featured Article */}
      {featuredArticle && (
        <Link
          href={`/blog/${featuredArticle.slug}`}
          className="block group"
        >
          <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-full">
                {getPrimaryBlogImage(featuredArticle.images) ? (
                  <Image
                    src={getPrimaryBlogImage(featuredArticle.images)!.url}
                    alt={
                      getPrimaryBlogImage(featuredArticle.images)!.alt ||
                      featuredArticle.title
                    }
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-rubik font-semibold rounded-full mb-4 w-fit">
                  Featured
                </span>
                <h2 className="text-3xl font-bold font-hanken text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 font-rubik mb-4">
                  {getBlogExcerpt(featuredArticle.content, 200)}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-rubik">
                  <span>{formatBlogDate(featuredArticle.published_at)}</span>
                  <span>•</span>
                  <span>{getBlogReadingTime(featuredArticle.content)} min read</span>
                  {featuredArticle.author && (
                    <>
                      <span>•</span>
                      <span>{featuredArticle.author.full_name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </article>
        </Link>
      )}

      {/* Regular Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularArticles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="block group"
          >
            <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="relative h-48">
                {getPrimaryBlogImage(article.images) ? (
                  <Image
                    src={getPrimaryBlogImage(article.images)!.url}
                    alt={
                      getPrimaryBlogImage(article.images)!.alt || article.title
                    }
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-hanken text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 font-rubik text-sm mb-4 flex-grow">
                  {getBlogExcerpt(article.content, 120)}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-rubik">
                  <span>{formatBlogDate(article.published_at)}</span>
                  <span>•</span>
                  <span>{getBlogReadingTime(article.content)} min</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
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
