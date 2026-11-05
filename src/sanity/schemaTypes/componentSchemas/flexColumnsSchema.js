import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { SliderInput } from "../../components/SliderInput";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { TbFreezeColumn } from "react-icons/tb";
import { MdExpand } from "react-icons/md";
import { BiText } from "react-icons/bi";
import { BsCardHeading } from "react-icons/bs";
import { TfiText } from "react-icons/tfi";

const flexColumnContent = [
  {
    name: "cardObject",
    type: "object",
    title: "Card",
    icon: BsCardHeading,
    fields: [
      {
        name: "cardType",
        type: "string",
        title: "Card Type",
        options: {
          list: [
            {
              title: "Card",
              value: "card",
            },
            {
              title: "Card with Background Image",
              value: "backgroundImageCard",
            },
            {
              title: "Expandable Card",
              value: "cardExpandable",
            },
          ],
          layout: "radio",
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: "card",
        type: "card",
        title: "Card Content",
      },
      {
        name: "cardStyles",
        title: "Card Styles",
        type: "sectionStyle",
        options: {
          titleTextColor: COLORS.PRIMARY.VALUE,
          titleTextSize: "heading3",
          subtitleTextColor: COLORS.BLACK.VALUE,
          subtitleTextSize: "heading4",
          bodyTextColor: COLORS.BLACK.VALUE,
          bodyTextSize: "body1",
          textAlignment: "left",
        },
      },
    ],
    preview: {
      select: {
        title: "card.title.0.children.0.text",
        media: "card.image.image",
      },
      prepare: (value) => {
        const { title, media } = value;
        return {
          title: title || "Card",
          media: media || BsCardHeading,
          subtitle: "Card",
        };
      },
    },
  },

  { type: "imageModule", title: "Image" },

  {
    type: "object",
    title: "Rich Text Section",
    name: "flexRichTextSection",
    icon: BiText,
    fields: [
      {
        name: "body",
        type: "array",
        of: richTextOptions({
          imagesOn: true,
          youtubeOn: true,
          stylesOn: true,
          listsOn: true,
          textColorOn: true,
          buttonsOn: true,
          socialIconsOn: true,
        }),
      },
      {
        name: "sectionStyles",
        title: "Section Styles",
        type: "sectionStyle",
        options: {
          textAlignment: "left",
          addRightAlignment: true,
        },
      },
    ],
  },

  {
    name: "flexTextSection",
    type: "object",
    title: "Text Section",
    icon: TfiText,
    fields: [
      { name: "title", type: "string" },
      {
        name: "subtitle",
        type: "array",
        title: "Subtitle",
        of: richTextOptions({ oneLine: true }),
      },
      {
        name: "body",
        type: "array",
        of: richTextOptions({ socialIconsOn: true }),
      },
      {
        name: "button",
        type: "button",
        title: "Button",
      },
      {
        name: "sectionStyles",
        title: "Section Styles",
        type: "sectionStyle",
        options: {
          titleTextColor: COLORS.PRIMARY.VALUE,
          titleTextSize: "heading1",
          titleHeadingTag: "",
          subtitleTextColor: COLORS.BLACK.VALUE,
          subtitleTextSize: "heading3",
          bodyTextColor: COLORS.BLACK.VALUE,
          bodyTextSize: "body1",
          textAlignment: "left",
          addRightAlignment: true,
        },
      },
    ],
  },

  {
    name: "flexTextAccordion",
    type: "object",
    title: "Text Accordion",
    icon: MdExpand,
    fields: [
      {
        name: "sectionName",
        type: "string",
        title: "Section Name",
        description:
          "This field is used for organization only and will not display on site.",
      },
      {
        name: "accordionItems",
        type: "array",
        of: [{ type: "accordionItem" }],
      },
      {
        name: "sectionStyles",
        title: "Section Styles",
        type: "sectionStyle",
        options: {
          titleTextColor: COLORS.PRIMARY.VALUE,
          bodyTextColor: COLORS.BLACK.VALUE,
        },
      },
    ],
    preview: {
      select: {
        items: "accordionItems",
        title: "sectionName",
      },
      prepare: (value) => {
        const { items, title } = value;
        return {
          title: title || "Text Accordion",
          subtitle:
            items?.length > 0
              ? `${items.length} Item${items.length !== 1 ? "s" : ""}`
              : "No Items",
          media: MdExpand,
        };
      },
    },
  },
];

const flexColumnsSchema = {
  name: "flexColumns",
  type: "object",
  title: "Flex Columns",
  icon: TbFreezeColumn,

  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "name",
      type: "string",
      group: "content",
      title: "Section Name",
      description:
        "This field is used for organization only and will not display on site. If left blank, the title will be used as the section name.",
    },

    {
      name: "column1",
      type: "array",
      title: "Column 1 Content",
      group: "content",
      of: flexColumnContent,
    },

    {
      name: "column2",
      type: "array",
      title: "Column 2 Content",
      group: "content",
      of: flexColumnContent,
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
    GroupHeading("Layout", "layout"),

    {
      name: "column1Width",
      title: "Column 1 Width",
      description: "Adjust the width ratio between columns",
      type: "number",
      group: "layout",
      initialValue: 50,
      components: {
        input: SliderInput,
      },
    },

    {
      name: "verticalAlignment",
      type: "number",
      title: "Vertical Alignment",
      group: "layout",
      options: {
        list: [
          { title: "Top", value: 0 },
          { title: "Center", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 0,
    },

    {
      name: "mobileLayout",
      type: "number",
      title: "Mobile Layout",
      group: "layout",
      options: {
        list: [
          { title: "Column 1 on Top", value: 0 },
          { title: "Column 2 on Top", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 0,
      description: "Choose which column appears first on mobile devices.",
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, title, hideSection, expirationDate, scheduledReleaseDate } =
        value;
      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Flex Columns";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Flex Columns",
        media: TbFreezeColumn,
      };
    },
  },
};

export default flexColumnsSchema;
