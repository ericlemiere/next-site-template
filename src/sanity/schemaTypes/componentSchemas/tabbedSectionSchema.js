import { TfiLayoutTabWindow } from "react-icons/tfi";
import { PiTabsDuotone } from "react-icons/pi";

import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const tabbedSectionSchema = {
  name: "tabbedSection",
  title: "Tabbed Section",
  type: "object",
  icon: TfiLayoutTabWindow,

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
      name: "tabSections",
      type: "array",
      group: "content",
      validation: (Rule) =>
        Rule.max(4).error("A max of 4 tab sections are allowed."),
      of: [
        {
          type: "object",
          title: "Tab Section",
          description:
            "Add up to 4 tab sections. Each tab will have its own title and content.",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Tab Title",
              validation: (Rule) => Rule.required(),
              description: "This is the title that appears on the tab.",
            },
            {
              name: "image",
              type: "imageModule",
              title: "Image",
              description: "Optional image to display in the tab section.",
            },
            {
              name: "subtitle",
              title: "Subtitle",
              type: "array",
              of: richTextOptions({
                oneLine: true,
                linksOn: false,
                listsOn: false,
              }),
              description: "This will show as a title above the body content.",
            },
            {
              name: "body",
              type: "array",
              of: richTextOptions({
                imagesOn: true,
                youtubeOn: true,
                buttonsOn: true,
                socialIconsOn: true,
              }),
            },
          ],
          preview: {
            select: {
              title: "title",
              image: "image.image",
            },
            prepare: (value) => {
              const { title, image } = value;
              return {
                title: title || "(needs title)",
                media: image || PiTabsDuotone,
              };
            },
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
        titleTextColor: COLORS.PRIMARY.VALUE,
        subtitleTextColor: COLORS.BLACK.VALUE,
        bodyTextColor: COLORS.BLACK.VALUE,
        textAlignment: "left",
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    //  GroupHeading("Layout", "layout"),

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

      let displayTitle = name || "Tabbed Section";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: `Tabbed Section`,
        media: TfiLayoutTabWindow,
      };
    },
  },
};

export default tabbedSectionSchema;
