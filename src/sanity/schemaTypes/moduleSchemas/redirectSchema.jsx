import { FaDirections } from "react-icons/fa";

export default {
  name: "redirect",
  title: "Redirect",
  type: "object",
  icon: FaDirections,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description:
        "Optional. Add a name here to help you identify the redirect.",
    },
    {
      name: "source",
      title: "From",
      type: "string",
      description: "The path you want to redirect from, e.g. /old-url",
      validation: (Rule) =>
        Rule.required().custom((source) => {
          // Updated regex to check if the input is in the format of a URL path and does not end with a slash
          const isValidPath = /^\/[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*$/.test(
            source
          );
          return (
            isValidPath ||
            'The source must be a valid URL path and cannot end with a slash, e.g., "/old-url"'
          );
        }),
    },
    {
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "externalLink",
      title: "External Link",
      type: "url",
      description:
        "Enter the full URL for the external link, e.g. https://example.com",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isExternal = context?.parent?.linkType === "external";
          if (!isExternal) return true; // Not required unless external
          if (!value) return "External link is required for external redirects";
          if (value.startsWith("http://") || value.startsWith("https://")) {
            return true;
          }
          return "URL must start with http:// or https://";
        }),
    },
    {
      name: "destination",
      title: "To",
      type: "reference",
      to: [
        { type: "page" },
        { type: "homePage" },
        { type: "blogPost" },
        { type: "anchorTagLink" },
      ],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      description: (
        <div>
          <div>Select the page you want to redirect to.</div>
          <div>If left blank, the source will redirect to the homepage.</div>
        </div>
      ),
    },
    {
      name: "permanent",
      title: "Permanent",
      type: "boolean",
      initialValue: () => true,
    },
  ],
  preview: {
    select: {
      title: "name",
      source: "source",
      destination: "destination.slug.current",
      linkType: "linkType",
      externalLink: "externalLink",
      anchor: "destination.anchorTag",
    },
    prepare(selection) {
      const { title, source, destination, anchor, externalLink, linkType } =
        selection;
      const dest =
        linkType === "external" ? externalLink : destination || anchor || "/";

      return {
        title: title
          ? title
          : source && dest
            ? `${source} → ${dest}`
            : `${source} → /`,
        subtitle: title ? `${source} → ${dest}` : undefined,
        media: FaDirections,
      };
    },
  },
};
