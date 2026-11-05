import type { ImageLoaderProps } from "next/image";

export default function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  // If the src is already a full URL from Sanity CDN
  if (src.includes("cdn.sanity.io")) {
    const url = new URL(src);
    // Add Sanity's image transformation parameters
    url.searchParams.set("w", width.toString());
    if (quality) {
      url.searchParams.set("q", quality.toString());
    }
    // Use Sanity's auto format parameter for optimal format (webp, etc)
    url.searchParams.set("auto", "format");
    return url.toString();
  }

  // Fallback for non-Sanity images
  return src;
}
