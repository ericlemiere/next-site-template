/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

"use client";

import dynamic from "next/dynamic";

// Lazy load the entire Studio with no SSR
// to avoid including it in the main build bundle
const LazyStudio = dynamic(() => import("./studio"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "18px",
        fontFamily: "system-ui, sans-serif",
        color: "#666",
      }}
    >
      Loading Sanity Studio...
    </div>
  ),
});

export default function StudioPage() {
  return <LazyStudio />;
}
