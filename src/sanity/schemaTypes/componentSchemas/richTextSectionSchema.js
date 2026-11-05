import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { sectionWidthOptions } from "../../../utils/constants/spacing";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { BiText } from "react-icons/bi";

const richTextSectionSchema = {
  name: "richTextSection",
  type: "object",
  title: "Text - Rich Text",
  icon: BiText,

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
        "This field is used for organization only and will not display on site.",
    },
    {
      name: "body",
      type: "array",
      of: richTextOptions({
        imagesOn: true,
        youtubeOn: true,
        stylesOn: true,
        textColorOn: true,
        buttonsOn: true,
        socialIconsOn: true,
      }),
      group: "content",
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
      name: "sectionWidth",
      type: "number",
      title: "Section Width",
      description: "Set the width of the text area",
      group: "layout",
      options: {
        list: sectionWidthOptions,
        layout: "radio",
      },
      initialValue: 0,
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

      let displayTitle = name || "Text - Rich Text Section";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Text - Rich Text Section",
        media: BiText,
      };
    },
  },
};

export default richTextSectionSchema;
