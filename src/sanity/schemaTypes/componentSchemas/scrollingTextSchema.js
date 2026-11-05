import { MdTextRotationNone } from "react-icons/md";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const scrollingTextSchema = {
  name: "scrollingText",
  title: "Scrolling Text",
  type: "object",
  icon: MdTextRotationNone,

  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "name",
      type: "string",
      title: "Section Name",
      description:
        "This field is used for organization only and will not display on site. If left blank, the title will be used as the section name.",
      group: "content",
    },

    {
      name: "textItems",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          title: "Text Item",
          name: "textItem",
          fields: [
            {
              name: "text",
              type: "string",
              title: "Text",
            },
            {
              name: "icon",
              type: "imageModule",
              title: "Icon",
            },
          ],
          preview: {
            select: {
              text: "text",
              icon: "icon",
            },
            prepare: ({ text, icon }) => ({
              title: text || icon?.alt || "(No text)",
              media: icon?.image || MdTextRotationNone,
            }),
          },
        },
      ],
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
        bodyTextColor: COLORS.BLACK.VALUE,
      },
    },

    // ========================================= LAYOUT
    GroupHeading("Layout", "layout"),

    {
      name: "direction",
      title: "Scroll Direction",
      type: "string",
      group: "layout",
      options: {
        list: [
          { title: "Forward", value: "forward" },
          { title: "Backward", value: "backward" },
        ],
        layout: "radio",
      },
      initialValue: "forward",
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, hideSection, expirationDate, scheduledReleaseDate } = value;

      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || "Scrolling Text Section";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: `Scrolling Text`,
        media: MdTextRotationNone,
      };
    },
  },
};

export default scrollingTextSchema;
