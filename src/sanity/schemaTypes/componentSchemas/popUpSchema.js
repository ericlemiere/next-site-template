import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const popUpSchema = {
  name: "popUp",
  type: "object",
  title: "Pop Up",
  icon: BsFillArrowUpSquareFill,

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
      name: "delayTime",
      type: "number",
      title: "Delay Time (in seconds)",
      description:
        "The pop up will appear once the user has scrolled to this part of the page. Set to 0 for immediate display, or add a short delay.",
      group: "content",
      options: {
        list: [
          { title: "0 seconds", value: 0 },
          { title: "1 seconds", value: 1000 },
          { title: "2 seconds", value: 2000 },
        ],
        layout: "radio",
      },
      initialValue: 0,
    },

    {
      name: "body",
      type: "array",
      of: richTextOptions({
        stylesOn: true,
        imagesOn: true,
        useSimpleImage: true,
        youtubeOn: true,
        textColorOn: true,
        buttonsOn: true,
        socialIconsOn: true,
      }),
      group: "content",
      description: "The background color of the pop up is white.",
    },

    // ========================================= STYLES
    GroupHeading("Styles", "style"),

    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        textAlignment: "left",
      },
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

      let displayTitle = name || "Pop Up";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Pop Up",
        media: BsFillArrowUpSquareFill,
      };
    },
  },
};

export default popUpSchema;
