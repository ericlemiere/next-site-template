"use client";
import { useFormValue } from "sanity";
import { useState, useEffect } from "react";

export function OgImagePreview() {
  // Get current document values
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const ogTitle = useFormValue(["ogTitle"]) as string | undefined;
  const ogBackgroundImage = useFormValue([
    "ogBackgroundImage",
    "asset",
    "_ref",
  ]) as string | undefined;
  const author = useFormValue(["author", "_ref"]) as string | undefined;
  const datePublished = useFormValue(["datePublished"]) as string | undefined;

  // Use state to force re-renders
  const [refreshKey, setRefreshKey] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Watch for changes to any relevant fields
  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [ogTitle, ogBackgroundImage, author, datePublished]);

  if (!slug) {
    return (
      <div style={{ padding: "20px", color: "#666" }}>
        Save the document to generate an OG image preview.
      </div>
    );
  }

  // Strip "/blog/" prefix from slug since the API route already has /blog/ in the path
  const slugWithoutPrefix = slug.startsWith("/blog/")
    ? slug.substring(6)
    : slug;

  // Construct the OG image URL with preview param for live updates
  // Force localhost for development (window.location will be on localhost:3333 for Sanity Studio)
  const baseUrl =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const ogImageUrl = `${baseUrl}/api/og/blog/${slugWithoutPrefix}?preview=true&t=${Date.now()}_${refreshKey}`;

  return (
    <div>
      <div
        style={{
          marginBottom: "12px",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        OG Image Preview
      </div>
      <div
        style={{
          marginBottom: "12px",
          fontSize: "13px",
        }}
      >
        This is how your blog post will appear when shared on social media
        (1200x630).
      </div>

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          position: "relative",
          minHeight: imageLoaded ? "auto" : "315px",
        }}
      >
        {!imageLoaded && !imageError && (
          <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
            Loading preview...
          </div>
        )}
        {imageError && (
          <div
            style={{ padding: "20px", textAlign: "center", color: "#d32f2f" }}
          >
            Failed to load image. Check console for details.
          </div>
        )}
        <img
          key={refreshKey}
          src={ogImageUrl}
          alt="OG Image Preview"
          style={{
            width: "100%",
            height: "auto",
            display: imageLoaded ? "block" : "none",
          }}
          onLoad={(e) => {
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={(e) => {
            console.error("OG Image failed to load:", ogImageUrl);
            setImageError(true);
            setImageLoaded(false);
          }}
        />
      </div>
      <div
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: "#999",
        }}
      >
        URL: {ogImageUrl.split("?")[0]}
      </div>
    </div>
  );
}
