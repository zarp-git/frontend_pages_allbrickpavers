import type { Metadata } from "next";
import { getArticles } from "@/lib/blog-api";
import { BlogList } from "@/presentation/components/organisms/blog/blog-list";

export const metadata: Metadata = {
  title: "Blog | AllBrick Pavers",
  description:
    "Explore our blog for tips, guides, and inspiration for your paver projects. Learn from the experts at AllBrick Pavers.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 9;

  const { data: articles, meta } = await getArticles(page, limit);

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="section-container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-rubik uppercase tracking-[3px] text-primary font-medium mb-2">
            Our Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-hanken text-gray-900 uppercase mb-4">
            Latest Articles
          </h1>
          <p className="text-gray-600 font-rubik max-w-2xl mx-auto">
            Discover tips, guides, and inspiration for your paver projects from
            our team of experts.
          </p>
        </div>

        {/* Blog List */}
        <BlogList
          articles={articles}
          currentPage={meta.page}
          totalPages={meta.total_pages}
        />
      </div>
    </main>
  );
}
