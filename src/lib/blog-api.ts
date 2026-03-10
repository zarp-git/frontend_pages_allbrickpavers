import type {
  BlogArticleSummary,
  PaginatedArticles,
  BlogAPIError,
  BlogArticleImage,
  BlogArticleImageObject,
} from "@/types/blog.type";

const BLOG_API_BASE_URL =
  process.env.BLOG_API_BASE_URL || "https://api.zarpstudio.com";
const BLOG_SECRET = process.env.BLOG_SECRET || "";

function normalizeBlogImage(
  image: BlogArticleImage | undefined | null
): BlogArticleImageObject | null {
  if (!image) return null;
  if (typeof image === "string") {
    return { url: image, alt: null, alt_text: null };
  }
  return {
    id: image.id,
    url: image.url,
    alt: image.alt || image.alt_text || null,
    alt_text: image.alt_text || image.alt || null,
  };
}

function normalizeBlogArticle(
  article: any
): BlogArticleSummary {
  return {
    id: article.id || "",
    title: article.title || "Untitled",
    language: article.language || "en_us",
    slug: article.slug || "",
    content: article.content || "",
    published_at: article.published_at || new Date().toISOString(),
    display_order: article.display_order || 0,
    images: Array.isArray(article.images)
      ? article.images.map(normalizeBlogImage).filter(Boolean)
      : [],
    author: article.author
      ? {
          id: article.author.id || "",
          first_name: article.author.first_name || "",
          last_name: article.author.last_name || "",
          full_name: article.author.full_name || "",
          biography: article.author.biography || null,
          avatar: normalizeBlogImage(article.author.avatar),
        }
      : null,
  };
}

export async function getArticles(
  page: number = 1,
  limit: number = 9
): Promise<PaginatedArticles> {
  try {
    const url = new URL(`${BLOG_API_BASE_URL}/api/cms/public/articles`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());

    console.log("[Blog API] Fetching articles:", {
      url: url.toString(),
      page,
      limit,
      hasSecret: !!BLOG_SECRET,
    });

    const response = await fetch(url.toString(), {
      headers: {
        "x-blog-secret-key": BLOG_SECRET,
      },
      next: { revalidate: 60 },
    });

    console.log("[Blog API] Response status:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("[Blog API] Articles fetched successfully:", {
      totalArticles: data.data?.length || 0,
      page: data.meta?.page,
      totalPages: data.meta?.total_pages,
    });

    return {
      data: Array.isArray(data.data)
        ? data.data.map(normalizeBlogArticle)
        : [],
      meta: {
        page: data.meta?.page || page,
        limit: data.meta?.limit || limit,
        total: data.meta?.total || 0,
        total_pages: data.meta?.total_pages || 0,
      },
    };
  } catch (error) {
    console.error("[Blog API] Error fetching articles:", error);
    throw error;
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<BlogArticleSummary | null> {
  try {
    const url = new URL(`${BLOG_API_BASE_URL}/api/cms/public/articles`);
    url.searchParams.set("slug", slug);

    console.log("[Blog API] Fetching article by slug:", {
      url: url.toString(),
      slug,
      hasSecret: !!BLOG_SECRET,
    });

    const response = await fetch(url.toString(), {
      headers: {
        "x-blog-secret-key": BLOG_SECRET,
      },
      next: { revalidate: 60 },
    });

    console.log("[Blog API] Response status:", response.status, response.statusText);

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      console.log("[Blog API] Article not found:", slug);
      return null;
    }

    console.log("[Blog API] Article fetched successfully:", {
      slug,
      title: data.data[0]?.title,
    });

    return normalizeBlogArticle(data.data[0]);
  } catch (error) {
    console.error("[Blog API] Error fetching article by slug:", error);
    throw error;
  }
}
