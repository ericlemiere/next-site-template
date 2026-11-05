"use client";

import dynamic from "next/dynamic";

const VisualEditingWrapper = dynamic(
  () =>
    import("@/components/VisualEditingWrapper").then(
      (mod) => mod.VisualEditingWrapper,
    ),
  { ssr: false },
);

export function VisualEditingClient() {
  return <VisualEditingWrapper />;
}
