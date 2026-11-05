import { LinkIcon } from "@sanity/icons/Link";
import { LinkIdInput } from "../../components/LinkID";
import { FaPencilAlt } from "react-icons/fa";
import { TbChartDots3 } from "react-icons/tb";

const linkSchema = {
  name: "link",
  type: "object",
  title: "Link",
  icon: LinkIcon,
  options: {
    collapsible: false,
    collapsed: false,
  },
  groups: [
    {
      name: "content",
      title: "Content",
      icon: FaPencilAlt,
      default: true,
    },
    {
      name: "tracking",
      title: "Tracking ID",
      icon: TbChartDots3,
    },
  ],

  fields: [
    // ========================================= CONTENT

    { name: "linkText", type: "string", group: "content" },

    {
      name: "linkType",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Internal Link", value: "internalLink" },
          {
            title: "Internal Anchor Link",
            value: "internalLinkWithAnchor",
          },
          { title: "External Link", value: "externalLink" },
          { title: "Download", value: "download" },
          { title: "Email Address", value: "email" },
          { title: "Phone Number", value: "phoneNumber" },
        ],
        layout: "radio",
      },
    },

    {
      name: "internalLink",
      type: "reference",
      group: "content",
      to: [{ type: "page" }, { type: "homePage" }, { type: "blogPost" }],
      hidden: ({ parent }) => parent?.linkType !== "internalLink",
      description: "Select a page from the dropdown, or add a new one.",
    },

    {
      name: "anchorLink",
      type: "reference",
      title: "Anchor Link",
      group: "content",
      to: [{ type: "anchorTagLink" }],
      hidden: ({ parent }) => parent?.linkType !== "internalLinkWithAnchor",
      description: "Select an anchor from the dropdown, or add a new one.",
    },

    {
      name: "externalLink",
      type: "url",
      group: "content",
      hidden: ({ parent }) => parent?.linkType !== "externalLink",
      description:
        "Link must begin with http:// or https://. Ex. https://ericlemiere.com",
    },

    {
      name: "target",
      type: "string",
      title: "Link Target",
      group: "content",
      options: {
        list: [
          { title: "New Tab", value: "_blank" },
          { title: "Same Tab", value: "_self" },
        ],
        layout: "radio",
      },
      initialValue: "_blank",
      hidden: ({ parent }) => parent?.linkType !== "externalLink",
      description:
        "Choose whether the link should open in a new tab or the same tab.",
    },

    {
      name: "downloadLink",
      type: "file",
      group: "content",
      hidden: ({ parent }) => parent?.linkType !== "download",
    },

    {
      name: "emailAddress",
      type: "string",
      group: "content",
      hidden: ({ parent }) => parent?.linkType !== "email",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { parent } = context;
          if (parent?.linkType === "email") {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!regex.test(value)) {
              return "Please enter a valid email address";
            }
          }
          return true;
        }),
    },

    {
      name: "phoneNumber",
      type: "string",
      group: "content",
      hidden: ({ parent }) => parent?.linkType !== "phoneNumber",
    },

    {
      name: "buttonId",
      type: "string",
      title: "Tracking ID",
      group: "tracking",
      components: { field: LinkIdInput },
      validation: (Rule) =>
        Rule.max(120).warning(`A title shouldn't be more than 120 characters.`),
    },
  ],
  preview: {
    select: { linkText: "linkText", linkType: "linkType" },
    prepare: (value) => {
      const { linkText, linkType } = value;
      let subtitle = "Internal Link";
      if (linkType === "externalLink") subtitle = "External Link";
      if (linkType === "download") subtitle = "Download";
      if (linkType === "email") subtitle = "Email Address";
      if (linkType === "internalLinkWithAnchor")
        subtitle = "Internal Anchor Link";

      return {
        title: linkText || "Link (No Text)",
        subtitle: subtitle,
        media: LinkIcon,
      };
    },
  },
};

export default linkSchema;
