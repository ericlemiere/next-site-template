import { TfiLayoutAccordionMerged } from "react-icons/tfi";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const textAccordionSchema = {
  name: "textAccordion",
  title: "Text Accordion",
  type: "object",
  icon: TfiLayoutAccordionMerged,

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
      name: "title",
      type: "string",
      group: "content",
    },
    {
      name: "subtitle",
      type: "array",
      of: richTextOptions({ listsOn: false }),
      group: "content",
    },
    {
      name: "accordionItems",
      type: "array",
      group: "content",
      of: [
        {
          type: "accordionItem",
        },
      ],
    },
    {
      name: "button",
      type: "button",
      title: "Button",
      group: "content",
      hidden: ({ parent }) => parent?.selectedLayout !== 3,
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
        textAlignment: "left",
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    GroupHeading("Layout", "layout"),
    {
      name: "selectedLayout",
      type: "number",
      group: "layout",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "One Column", value: 1 },
          { title: "Two Column", value: 2 },
          { title: "Two Column - Alt", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 1,
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
    {
      name: "faq",
      type: "boolean",
      title: "FAQ Section",
      description: "Toggle this on if this section is an FAQ section.",
      initialValue: false,
      group: "advanced",
    },
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      selectedLayout: "selectedLayout",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const {
        name,
        title,
        selectedLayout,
        hideSection,
        expirationDate,
        scheduledReleaseDate,
      } = value;
      let layoutLabel =
        selectedLayout === 1
          ? "One Column"
          : selectedLayout === 2
            ? "Two Column"
            : selectedLayout === 3
              ? "Two Column - Alt"
              : "Unknown Layout";

      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Text Accordion";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: `Text Accordion: ${layoutLabel}`,
        media: TfiLayoutAccordionMerged,
      };
    },
  },
};

export default textAccordionSchema;
