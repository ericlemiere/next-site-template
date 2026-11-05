"use client";

import { useState } from "react";
import { VisualEditing } from "next-sanity/visual-editing";
import { AnimationToggle } from "@/components/AnimationToggle";
import { DisableDraftMode } from "@/components/DisableDraftMode";

/**
 * Wrapper component that renders VisualEditing and AnimationToggle when
 * on the preview domain (Vercel) and inside an iframe (Sanity Studio presentation tool).
 * Production domain (designvanwa.com) will not enable visual editing.
 *
 * Note: This component is loaded via dynamic import with ssr: false in VisualEditingClient,
 * so it already only renders on the client.
 */
export function VisualEditingWrapper() {
  // Use lazy initialization to avoid setState-in-effect warning
  const [isInIframe] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.self !== window.top;
  });

  const [isPreviewDomain] = useState(() => {
    if (typeof window === "undefined") return false;
    const hostname = window.location.hostname;
    return (
      hostname.includes("vercel.app") ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  });

  // Only show visual editing on preview domain when in iframe
  if (!isInIframe || !isPreviewDomain) {
    return <DisableDraftMode />;
  }

  // Content edits stream in through <SanityLive /> in the layout, so let
  // <VisualEditing /> keep its default refresh (manual refreshes only) instead
  // of re-rendering the whole route on every mutation
  return (
    <>
      <VisualEditing />
      <AnimationToggle />
    </>
  );
}
