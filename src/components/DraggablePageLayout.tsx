// components/DraggablePageLayout.tsx
"use client";

import {
  useOptimistic,
  usePresentationQuery,
} from "@sanity/visual-editing/react";
import type { QueryParams } from "next-sanity";
import { pageLayoutSwitch } from "@/utils/constants/pageLayoutSwitch";
import type { SanityDocument } from "@sanity/client";
import { Page } from "../../sanity.types";

export function DraggablePageLayout({
  page,
  pageLayout: serverPageLayout,
  query,
  params,
}: {
  page: SanityDocument;
  pageLayout: Page["pageLayout"];
  // The query and params the page was fetched with, so the Presentation tool
  // can re-run it against the Studio's in-memory draft
  query: string;
  params?: QueryParams;
}) {
  // Inside the Presentation tool, Studio form edits are applied here straight
  // from the Studio, without waiting for the server to re-render the page.
  // Outside of it, data is null and the server data is used
  const presentation = usePresentationQuery({ query, params });
  const initialPageLayout: Page["pageLayout"] =
    presentation.data?.pageLayout ?? serverPageLayout;

  // Handles edits made in the preview itself, like drag and drop reordering
  const pageLayout = useOptimistic(
    initialPageLayout,
    (currentLayout, action) => {
      // Only update if this is the document being edited
      if (action.id === page._id && action.document.pageLayout) {
        // Map the new order, but use the existing FULL data for each item
        return Array.isArray(action.document.pageLayout)
          ? action.document.pageLayout.map(
              (section: NonNullable<Page["pageLayout"]>[number]) => {
                // Find the full section data from current state
                const fullSection = currentLayout?.find(
                  (s) => s._key === section._key,
                );

                return fullSection
                  ? applyNestedOrder(fullSection, section)
                  : section;
              },
            )
          : currentLayout;
      }
      return currentLayout;
    },
  );

  return <>{pageLayoutSwitch(pageLayout, page)}</>;
}

type Keyed = { _key?: string };

const isKeyedArray = (value: unknown): value is Keyed[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((item) => typeof item?._key === "string");

// Drag and drop inside a section (cards, logos, team members, ...) sends the
// raw draft section, whose arrays hold unresolved references and no projected
// data. Reorder/remove the already-projected items to match it so the change
// shows immediately; newly added items appear once the re-fetched data arrives
function applyNestedOrder<T extends object>(
  fullSection: T,
  rawSection: object,
): T {
  let result = fullSection;
  for (const [field, rawValue] of Object.entries(rawSection)) {
    const fullValue = (fullSection as Record<string, unknown>)[field];
    if (!isKeyedArray(rawValue) || !isKeyedArray(fullValue)) continue;

    const byKey = new Map(fullValue.map((item) => [item._key, item]));
    const reordered = rawValue
      .map((item) => byKey.get(item._key))
      .filter((item): item is Keyed => item !== undefined);

    const unchanged =
      reordered.length === fullValue.length &&
      reordered.every((item, i) => item === fullValue[i]);
    if (!unchanged) result = { ...result, [field]: reordered };
  }
  return result;
}
