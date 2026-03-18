"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogArticleSummary } from "@/types/blog.type";
import { getBlogReadingTime, getPrimaryBlogImage } from "@/lib/blog-content";
import { formatBlogDate } from "@/lib/blog-date";

interface ArticleDetailProps {
  article: BlogArticleSummary;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const primaryImage = getPrimaryBlogImage(article.images);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-hanken text-gray-900 mb-6">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          {article.author?.avatar && (
            <Image
              src={article.author.avatar.url}
              alt={article.author.full_name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            {article.author && (
              <p className="font-rubik font-semibold text-gray-900">
                {article.author.full_name}
              </p>
            )}
            <div className="flex items-center gap-3 text-sm text-gray-500 font-rubik">
              <span>{formatBlogDate(article.published_at)}</span>
              <span>•</span>
              <span>{getBlogReadingTime(article.content)} min read</span>
            </div>
          </div>
        </div>

        {primaryImage && (
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg prose-gray max-w-none prose-headings:font-hanken prose-headings:font-bold prose-headings:text-gray-900 prose-p:font-rubik prose-p:text-gray-700 prose-a:text-primary prose-strong:text-gray-900 prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>

      {/* Author Bio */}
      {article.author?.biography && (
        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <div className="flex items-start gap-4">
            {article.author.avatar && (
              <Image
                src={article.author.avatar.url}
                alt={article.author.full_name}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-rubik font-semibold text-gray-900 mb-2">
                About {article.author.full_name}
              </p>
              <p className="font-rubik text-gray-600 text-sm">
                {article.author.biography}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
