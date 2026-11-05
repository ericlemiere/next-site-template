import ColorSelector from "../../components/ColorSelector";
import {
  defaultButtonColorOptions,
  buttonColorInitialValue,
} from "../../../utils/constants/colors";
import { FaPencilAlt } from "react-icons/fa";
import { ButtonIdInput } from "../../components/ButtonID";
import { PiCursorClick } from "react-icons/pi";
import { TbChartDots3 } from "react-icons/tb";

import ButtonObjectInput from "../../components/ButtonObjectInput";

export default {
  name: "button",
  type: "object",
  title: "Button",
  icon: PiCursorClick,
  options: {
    collapsed: false,
    collapsible: false,
  },
  components: {
    input: ButtonObjectInput,
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

    {
      name: "text",
      type: "string",
      group: "content",
      title: "Button Text",
    },

    {
      name: "buttonColor",
      group: "content",
      type: "string",
      options: { list: defaultButtonColorOptions },
      components: { input: ColorSelector },
      initialValue: buttonColorInitialValue,
    },

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
      group: "content",
      title: "Anchor Link",
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
      description: "Ex: info@ericlemiere.com",
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
      group: "tracking",
      title: "Tracking ID",
      components: { field: ButtonIdInput },
      readOnly: true,
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
