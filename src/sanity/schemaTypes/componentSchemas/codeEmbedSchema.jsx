import { COLORS } from "@/utils/constants/colors";
import { FaCode } from "react-icons/fa6";

import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { schemaGroup } from "../../../utils/constants/schema";

export default {
  name: "codeEmbed",
  type: "object",
  title: "Code Embed",
  icon: FaCode,
  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "name",
      type: "string",
      group: "content",
      description:
        "For organizational purposes only. Will not display on site.",
    },

    {
      name: "embedType",
      type: "string",
      title: "Embed Type",
      group: "content",
      options: {
        list: [
          { title: "iFrame", value: "iframe" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "iframeSize",
      type: "object",
      group: "content",
      title: "Iframe Size",
      description: `The width and height can be found within the iframe embed code and will be used to set the aspect ratio of the iframe.`,
      fields: [
        {
          name: "width",
          type: "number",
          title: "Width",
        },
        {
          name: "height",
          type: "number",
          title: "Height",
        },
      ],
      options: {
        columns: 2,
        collapsible: true,
        collapsed: false,
      },
      hidden: ({ parent }) => parent?.embedType !== "iframe",
    },

    {
      name: "code",
      type: "code",
      title: "Code Embed",
      options: {
        language: "html",
        languageAlternatives: [{ title: "HTML", value: "html" }],
      },
      group: "content",
      description:
        "If pasting an iframe, fill in the width and height fields below. Iframes will not render without those fields filled in.",
    },

    // ========================================= STYLES
    GroupHeading("Styles", "style"),

    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        backgroundColor: COLORS.WHITE.VALUE,
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    // GroupHeading('Layout', 'layout'),

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      title: "title",
      name: "name",
      hideSection: "hideSection",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, title, hideSection, scheduledReleaseDate } = value;
      const now = new Date();
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Code Embed";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Code Embed",
        media: FaCode,
      };
    },
  },
};
