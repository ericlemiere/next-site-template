import { PiCirclesFour } from "react-icons/pi";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "@/utils/helpers/richTextOptions";

const logoGridSchema = {
  name: "logoGrid",
  type: "object",
  title: "Logo Grid",
  groups: schemaGroup,
  icon: PiCirclesFour,

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
      name: "gridLayout",
      type: "array",
      of: [
        {
          type: "imageModule",
          title: "Image",
        },
      ],
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
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    GroupHeading("Layout", "layout"),
    {
      name: "selectedLayout",
      title: "Selected Layout",
      type: "number",
      group: "layout",
      options: {
        list: [
          { title: "All logos have the same width", value: 1 },
          { title: "All logos have the same height", value: 2 },
        ],
        layout: "radio",
      },
      initialValue: 1,
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      hideSection: "hideSection",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, hideSection, scheduledReleaseDate } = value;
      const now = new Date();
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || "Logo Grid";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Logo Grid",
        media: PiCirclesFour,
      };
    },
  },
};

export default logoGridSchema;
