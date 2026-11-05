import { MdViewCarousel } from "react-icons/md";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { schemaGroup } from "../../../utils/constants/schema";

const imageCarouselSchema = {
  name: "imageCarousel",
  type: "object",
  title: "Image Carousel",
  icon: MdViewCarousel,

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
      name: "images",
      type: "array",
      group: "content",
      of: [{ type: "imageModule" }],
      validation: (Rule) =>
        Rule.min(3).error("At least three items are required."),
    },

    // STYLE
    GroupHeading("Style", "style"),

    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    GroupHeading("Layout", "layout"),

    {
      name: "componentWidth",
      title: "Component Width",
      type: "number",
      group: "layout",
      description: "This sets the width of the carousel component.",
      options: {
        list: [
          { title: "Default", value: 0 },
          { title: "Full Width", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 0,
    },

    {
      name: "aspectRatio",
      type: "string",
      group: "layout",
      description:
        "This determines the aspect ratio for all images in the carousel. The 'Original' option will use each image's original dimensions.",
      options: {
        list: [
          { title: "16x9", value: "aspect-[16/9]" },
          { title: "6x4", value: "aspect-[6/4]" },
          { title: "4x3", value: "aspect-[4/3]" },
          { title: "1x1", value: "aspect-[1/1]" },
          { title: "Original", value: "original" },
        ],
        layout: "radio",
      },
      initialValue: "aspect-[6/4]",
    },

    {
      name: "imageMargin",
      type: "number",
      group: "layout",
      description: "This adds spacing between images in the carousel.",
      options: {
        list: [
          { title: "No Space", value: 0 },
          { title: "Default Space", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 0,
    },

    {
      name: "autoPlayOptions",
      type: "number",
      group: "layout",
      title: "Auto Play",
      description: "Enable or disable automatic playback of the carousel.",
      options: {
        list: [
          { title: "Disabled", value: 0 },
          { title: "Auto Play", value: 1 },
          { title: "Auto Scroll", value: 2 },
        ],
        layout: "radio",
      },
      initialValue: 0,
    },

    {
      name: "showControls",
      title: "Show Controls",
      type: "boolean",
      group: "layout",
      description: "Toggle to show or hide carousel navigation controls.",
      initialValue: true,
      hidden: ({ parent }) => parent?.autoPlayOptions === 2,
    },

    {
      name: "direction",
      title: "Auto Scroll Direction",
      type: "string",
      group: "layout",
      description: "This controls the direction that the carousel scrolls.",
      options: {
        list: [
          { title: "Forward", value: "forward" },
          { title: "Backward", value: "backward" },
        ],
        layout: "radio",
      },
      initialValue: "forward",
      hidden: ({ parent }) => parent?.autoPlayOptions !== 2,
    },

    {
      name: "speed",
      type: "number",
      group: "layout",
      description: "This controls the speed that the carousel scrolls.",
      options: {
        list: [
          { title: "Slow", value: 6000 },
          { title: "Medium", value: 4000 },
          { title: "Fast", value: 2000 },
        ],
        layout: "radio",
      },
      initialValue: 4000,
      hidden: ({ parent }) => parent?.autoPlayOptions === 0,
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

      let displayTitle = name || "Image Carousel";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Image Carousel",
        media: MdViewCarousel,
      };
    },
  },
};

export default imageCarouselSchema;
