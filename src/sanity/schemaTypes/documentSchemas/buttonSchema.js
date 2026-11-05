import { buttonColorOptions } from "../../../utils/helpers/sanity-helpers";
import { defaultButtonColorOptions } from "../../../utils/constants/colors";
import { FaPencilAlt } from "react-icons/fa";
import { GoBeaker } from "react-icons/go";
import { ButtonIdInput } from "../../sanity/components/ButtonID";
import { PiCursorClick } from "react-icons/pi";

const buttonSchema = {
  name: "button",
  type: "document",
  title: "Button",
  icon: PiCursorClick,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: FaPencilAlt,
      default: true,
    },
    {
      name: "advanced",
      title: "Advanced",
      icon: GoBeaker,
    },
  ],

  fields: [
    // ========================================= CONTENT
    {
      name: "name",
      type: "string",
      group: "content",
      title: "Button Name",
      description: "For organization only. Will not display on site.",
    },
    { name: "text", type: "string", group: "content", title: "Button Text" },
    ...buttonColorOptions(),
    {
      name: "buttonStyle",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Solid", value: "Solid" },
          { title: "Outline", value: "Outline" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    },
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
        ],
        layout: "radio",
      },
    },
    {
      name: "internalLink",
      type: "reference",
      group: "content",
      to: [{ type: "page" }, { type: "homePage" }, { type: "blogPost" }],
      hidden: ({ document }) => document?.linkType !== "internalLink",
    },
    {
      name: "anchorLink",
      type: "reference",
      group: "content",
      title: "Anchor Link",
      to: [{ type: "anchorTagLink" }],
      hidden: ({ document }) => document?.linkType !== "internalLinkWithAnchor",
    },
    {
      name: "externalLink",
      type: "url",
      group: "content",
      hidden: ({ document }) => document?.linkType !== "externalLink",
      description:
        "Link must begin with http:// or https://. Example: https://www.ericlemiere.com",
    },
    {
      name: "target",
      type: "string",
      group: "content",
      title: "Link Target",
      options: {
        list: [
          { title: "New Tab", value: "_blank" },
          { title: "Same Tab", value: "_self" },
        ],
        layout: "radio",
      },
      initialValue: "_blank",
      hidden: ({ document }) => document?.linkType !== "externalLink",
      description:
        "Choose whether the link should open in a new tab or the same tab.",
    },
    {
      name: "downloadLink",
      type: "file",
      group: "content",
      hidden: ({ document }) => document?.linkType !== "download",
    },
    {
      name: "emailAddress",
      type: "string",
      group: "content",
      hidden: ({ document }) => document?.linkType !== "email",
      description: "Ex: info@ericlemiere.com",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const { document } = context;
          if (document?.linkType === "email") {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!regex.test(value)) {
              return "Please enter a valid email address";
            }
          }
          return true;
        }),
    },
    {
      name: "buttonId",
      type: "string",
      group: "advanced",
      title: "Tracking ID",
      components: { field: ButtonIdInput },
      validation: (Rule) =>
        Rule.max(120).warning(`A title shouldn't be more than 120 characters.`),
    },
  ],
  preview: {
    select: {
      title: "name",
      text: "text",
      style: "buttonStyle",
      color: "buttonColor",
    },
    prepare: (value) => {
      const { title, text, style, color } = value;
      let buttonColor = color; // Default to the original color
      for (const option of defaultButtonColorOptions) {
        if (color === option.value) {
          buttonColor = option.title;
          break;
        }
      }

      return {
        title: title || text || "(missing text)",
        subtitle: `Style: ${style} - ${buttonColor}`,
        media: PiCursorClick,
      };
    },
  },
};

export default buttonSchema;
