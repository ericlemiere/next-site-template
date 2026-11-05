"use client";

import { ViewTransition, useSyncExternalStore } from "react";
import { useAnimation } from "@/appContexts";
import { ReactNode } from "react";

interface ConditionalViewTransitionProps {
  name: string;
  children: ReactNode;
}

function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function ConditionalViewTransition({
  name,
  children,
}: ConditionalViewTransitionProps) {
  const { animationsEnabled } = useAnimation();

  // Browsers reject view transitions in hidden tabs, which happens when
  // <SanityLive /> refreshes content in a background tab
  const isHidden = useSyncExternalStore(
    subscribeToVisibility,
    () => document.hidden,
    () => false,
  );

  // If animations are disabled, just render children without ViewTransition
  if (!animationsEnabled) {
    return <>{children}</>;
  }

  // Otherwise, wrap in ViewTransition. Skip update animations while hidden
  // rather than unwrapping, so the children aren't remounted
  return (
    <ViewTransition name={name} update={isHidden ? "none" : "auto"}>
      {children}
    </ViewTransition>
  );
}
