import type {
  BlogArticleImage,
  BlogArticleImageObject,
} from "@/types/blog.type";

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/>\s+/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

export function getBlogExcerpt(content: string, maxLength: number = 160): string {
  const plainText = stripMarkdown(content);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

export function getBlogReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const plainText = stripMarkdown(content);
  const wordCount = plainText.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function getPrimaryBlogImage(
  images?: BlogArticleImage[]
): BlogArticleImageObject | null {
  if (!images || images.length === 0) return null;

  const firstImage = images[0];
  if (typeof firstImage === "string") {
    return { url: firstImage, alt: null, alt_text: null };
  }

  return firstImage;
}

export function resolveBlogImages(
  images?: BlogArticleImage[]
): BlogArticleImageObject[] {
  if (!images) return [];

  return images
    .map((img) => {
      if (typeof img === "string") {
        return { url: img, alt: null, alt_text: null };
      }
      return img;
    })
    .filter((img): img is BlogArticleImageObject => img !== null);
}
