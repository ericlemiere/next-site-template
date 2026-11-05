import { Button } from "@sanity/ui";
import { DesktopIcon } from "@sanity/icons/Desktop";
import { definePlugin, getPublishedId } from "sanity";
import { useIntentLink } from "sanity/router";
import { useDocumentPane } from "sanity/structure";
import { usePresentationParams } from "sanity/presentation";

// Document types that get a one-click "Page Preview" button in the document header.
export const PAGE_PREVIEW_TYPES = [
  "blogPost",
  "page",
  "homePage",
  "teamMember",
  "event",
  "post",
];

// Types with no slug field that always preview a fixed path.
const FIXED_PATHS: Record<string, string> = {
  homePage: "/",
};

// Must match the `name` of the presentationTool in sanity.config.ts (defaults to "presentation").
const PRESENTATION_TOOL_NAME = "presentation";

function toHref(slug: string) {
  return slug.startsWith("/") ? slug : `/${slug}`;
}

/**
 * "Page Preview" button rendered in the top-right of the document pane header
 * (next to the "⋯" menu). Opens the Presentation tool directly to this page.
 */
function PagePreviewButton() {
  const { documentId, documentType, value } = useDocumentPane();
  // Non-null when this document is already open inside the Presentation tool.
  const presentationParams = usePresentationParams(false);

  const slug = (value as { slug?: { current?: string } })?.slug?.current;
  const href = FIXED_PATHS[documentType] ?? (slug ? toHref(slug) : undefined);

  const link = useIntentLink({
    intent: "edit",
    params: {
      id: getPublishedId(documentId),
      type: documentType,
      mode: "presentation",
      presentation: PRESENTATION_TOOL_NAME,
      ...(href ? { preview: href } : {}),
    },
  });

  // Already viewing this doc in Site Preview, no need for the button.
  if (presentationParams) return null;

  const buttonProps = {
    icon: DesktopIcon,
    text: "Page Preview",
    tone: "primary",
    mode: "ghost",
    fontSize: 1,
    padding: 2,
  } as const;

  // No slug yet: show a disabled button so editors know why it can't open.
  if (!href) {
    return (
      <Button
        {...buttonProps}
        disabled
        title="Add a slug to preview this page"
      />
    );
  }

  return (
    <Button
      {...buttonProps}
      as="a"
      href={link.href}
      onClick={link.onClick}
      title={`Open ${href} in Site Preview`}
    />
  );
}

/**
 * Adds the Page Preview button to the document header. Uses Sanity's
 * `unstable_languageFilter` slot, which renders components in the pane header
 * (it's what @sanity/document-internationalization uses for its language menu).
 */
export const pagePreviewButton = definePlugin({
  name: "page-preview-button",
  document: {
    unstable_languageFilter: (prev, { schemaType }) =>
      PAGE_PREVIEW_TYPES.includes(schemaType)
        ? [...prev, PagePreviewButton]
        : prev,
  },
});
