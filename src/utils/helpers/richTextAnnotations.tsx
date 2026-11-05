// =============================================================================
// Rich Text Annotations
// =============================================================================

import { JSX, ReactNode } from "react";
import type { Rule, BlockAnnotationProps } from "sanity";

import { FiLink } from "react-icons/fi";
import { IconType } from "react-icons";
import { LuHeading1 } from "react-icons/lu";

interface RichTextAnnotationField {
  name: string;
  type: string;
  title: string;
  description?: ReactNode;
  options?: {
    list?: { title: string; value: string }[];
    layout?: "radio" | string;
  };
  to?: { type: string }[];
  hidden?: (args: { parent: Record<string, unknown> }) => boolean;
  validation?: (Rule: Rule) => Rule | Rule[];
  initialValue?: boolean;
}

interface RichTextAnnotation {
  name: string;
  type: "object";
  title: string;
  icon: IconType;
  components: {
    annotation: (props: BlockAnnotationProps) => JSX.Element;
  };
  fields: RichTextAnnotationField[];
}

export const richTextLinks: RichTextAnnotation[] = [
  {
    name: "linkObject",
    type: "object",
    title: "Link",
    icon: FiLink,
    components: {
      annotation: (props: BlockAnnotationProps) => (
        <span>
          <FiLink
            style={{
              marginLeft: "0.05em",
              marginRight: "0.1em",
              width: "0.75em",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
          {props.renderDefault(props)}
        </span>
      ),
    },
    fields: [
      {
        name: "linkType",
        type: "string",
        title: "Link Type",
        options: {
          list: [
            { title: "🔗 Link", value: "externalLink" },
            { title: "📄 Internal Page Link", value: "internalLink" },
            { title: "⚓ Anchor Link", value: "anchorLink" },
            { title: "⬇️ Download Link", value: "downloadLink" },
          ],
          layout: "radio",
        },
      },
      {
        name: "href",
        type: "string",
        title: "URL",
        description: (
          <div>
            URL must start with:
            <ul
              style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <li>http://</li>
              <li>https://</li>
              <li>mailto:</li>
              <li>tel:</li>
            </ul>
          </div>
        ),
        hidden: ({ parent }) => parent?.linkType !== "externalLink",
        validation: (Rule) =>
          Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
      },
      {
        name: "page",
        title: "Page",
        type: "reference",
        to: [{ type: "page" }, { type: "homePage" }, { type: "blogPost" }],
        hidden: ({ parent }) => parent?.linkType !== "internalLink",
        description: "Select a page from the dropdown, or add a new one.",
      },
      {
        name: "anchor",
        title: "Anchor",
        type: "reference",
        to: [{ type: "anchorTagLink" }],
        hidden: ({ parent }) => parent?.linkType !== "anchorLink",
        description: "Select an anchor from the dropdown, or add a new one.",
      },
      {
        name: "file",
        title: "File",
        type: "file",
        hidden: ({ parent }) => parent?.linkType !== "downloadLink",
      },
      {
        title: "Open in new tab",
        name: "blank",
        type: "boolean",
        initialValue: true,
        hidden: ({ parent }) => parent?.linkType !== "externalLink",
      },
    ],
  },
];

export const richTextHeadingTag: RichTextAnnotation[] = [
  {
    name: "headingTag",
    type: "object",
    title: "Heading Tag",
    icon: LuHeading1,
    components: {
      annotation: (props: BlockAnnotationProps) => {
        const tag =
          (props.value as { titleHeadingTag?: string })?.titleHeadingTag || "";

        return (
          <span>
            {tag && (
              <span
                contentEditable={false}
                style={{
                  marginLeft: "0.05em",
                  marginRight: "0.1em",
                  fontSize: "0.85em",
                  fontWeight: "600",
                  color: "#666",
                  fontFamily: "monospace",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                &lt;{tag}&gt;
              </span>
            )}
            {props.renderDefault(props)}
          </span>
        );
      },
    },
    fields: [
      {
        name: "titleHeadingTag",
        type: "string",
        title: "Heading Tag",
        description:
          "Select the heading tag for this text. If not set, a <p> is used.",
        options: {
          list: [
            { title: "h1", value: "h1" },
            { title: "h2", value: "h2" },
            { title: "h3", value: "h3" },
            { title: "h4", value: "h4" },
            { title: "h5", value: "h5" },
            { title: "h6", value: "h6" },
          ],
        },
      },
    ],
  },
];
