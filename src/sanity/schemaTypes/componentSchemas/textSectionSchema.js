import { RiText } from "react-icons/ri";
import { sectionWidthOptions } from "../../../utils/constants/spacing";
import { schemaGroup } from "../../../utils/constants/schema";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { COLORS } from "../../../utils/constants/colors";

const textSectionSchema = {
  name: "textSection",
  type: "object",
  title: "Text - Column(s)",
  icon: RiText,
  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Column 1", "content"),
    {
      name: "name",
      type: "string",
      title: "Section Name",
      description:
        "This field is used for organization only and will not display on site. If left blank, the title will be used as the section name.",
      group: "content",
    },
    { name: "title", type: "string", group: "content" },
    {
      name: "subtitle",
      type: "array",
      title: "Subtitle",
      group: "content",
      of: richTextOptions({ oneLine: true }),
    },
    {
      name: "body",
      type: "array",
      group: "content",
      of: richTextOptions({ socialIconsOn: true }),
    },
    {
      name: "button",
      type: "button",
      title: "Button",
      group: "content",
    },

    // ========================================= COLUMN 2
    {
      ...GroupHeading("Column 2", "content"),
      hidden: ({ parent }) => parent?.columns !== 2 && parent?.columns !== 3,
    },
    {
      name: "column2Title",
      type: "string",
      title: "Title",
      group: "content",
      hidden: ({ parent }) => parent?.columns !== 2 && parent?.columns !== 3,
    },
    {
      name: "column2Subtitle",
      type: "array",
      title: "Subtitle",
      group: "content",
      of: richTextOptions({ oneLine: true }),
      hidden: ({ parent }) => parent?.columns !== 2 && parent?.columns !== 3,
    },
    {
      name: "column2Body",
      type: "array",
      title: "Body",
      group: "content",
      of: richTextOptions({}),
      hidden: ({ parent }) => parent?.columns !== 2 && parent?.columns !== 3,
    },
    {
      name: "column2Button",
      type: "button",
      title: "Button",
      group: "content",
      hidden: ({ parent }) => parent?.columns !== 2 && parent?.columns !== 3,
    },

    // ========================================= COLUMN 3
    {
      ...GroupHeading("Column 3", "content"),
      hidden: ({ parent }) => parent?.columns !== 3,
    },
    {
      name: "column3Title",
      type: "string",
      title: "Title",
      group: "content",
      hidden: ({ parent }) => parent?.columns !== 3,
    },
    {
      name: "column3Subtitle",
      type: "array",
      title: "Subtitle",
      group: "content",
      of: richTextOptions({ oneLine: true }),
      hidden: ({ parent }) => parent?.columns !== 3,
    },
    {
      name: "column3Body",
      type: "array",
      title: "Body",
      group: "content",
      of: richTextOptions({}),
      hidden: ({ parent }) => parent?.columns !== 3,
    },
    {
      name: "column3Button",
      type: "button",
      title: "Button",
      group: "content",
      hidden: ({ parent }) => parent?.columns !== 3,
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
        titleTextSize: "heading1",
        titleHeadingTag: "",
        subtitleTextColor: COLORS.BLACK.VALUE,
        subtitleTextSize: "heading3",
        bodyTextColor: COLORS.BLACK.VALUE,
        bodyTextSize: "body1",
        textAlignment: "left",
        addRightAlignment: true,
        columnAlignment: "center",
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    GroupHeading("Layout", "layout"),
    {
      name: "columns",
      type: "number",
      title: "Layout",
      group: "layout",
      options: {
        list: [
          { title: "1 Column", value: 1 },
          { title: "2 Column", value: 2 },
          { title: "3 Column", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 1,
    },

    {
      name: "columnWidth",
      type: "number",
      title: "Column Width",
      description: "Set the width of the column when using 1 column layout",
      group: "layout",
      options: {
        list: sectionWidthOptions,
        layout: "radio",
      },
      initialValue: 0,
      hidden: ({ parent }) => parent?.columns !== 1,
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      columns: "columns",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const {
        name,
        title,
        columns,
        hideSection,
        expirationDate,
        scheduledReleaseDate,
      } = value;
      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Text Section";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: `Text Section - ${columns} Column`,
        media: RiText,
      };
    },
  },
};

export default textSectionSchema;
