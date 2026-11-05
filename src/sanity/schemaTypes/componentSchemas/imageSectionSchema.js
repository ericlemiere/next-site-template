import { ImageIcon } from "@sanity/icons/Image";
import { ImagesIcon } from "@sanity/icons/Images";
import {
  GroupHeading,
  advancedGroupOptions,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { sectionWidthOptions } from "../../../utils/constants/spacing";

const imageSectionSchema = {
  name: "imageSection",
  type: "object",
  title: "Image",
  icon: ImageIcon,

  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "name",
      type: "string",
      group: "content",
      title: "Section Name",
      description: "For organization only. Will not display on site.",
    },

    {
      name: "images",
      type: "array",
      title: "Image(s)",
      of: [{ type: "imageModule" }],
      description:
        "Add one or more images. If more than one image is added, they will display in a row and will require an aspect ratio to be selected.",
      group: "content",
    },

    {
      name: "aspectRatio",
      type: "string",
      title: "Image Aspect Ratio",
      group: "content",
      options: {
        list: [
          { title: "16x9", value: "aspect-[16/9]" },
          { title: "6x4", value: "aspect-[6/4]" },
          { title: "4x3", value: "aspect-[4/3]" },
          { title: "1x1", value: "aspect-[1/1]" },
        ],
        layout: "radio",
      },
      initialValue: "aspect-[6/4]",
      description: "Required when displaying multiple images.",
      hidden: ({ parent }) => !parent?.images || parent?.images?.length < 2,
    },

    // ========================================= STYLES
    GroupHeading("Styles", "style"),

    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        overlayColor: "transparent",
        backgroundColor: COLORS.WHITE.VALUE,
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
      title: "Selected Layout",
      options: {
        list: [
          { title: "Inset", value: 2 },
          { title: "Full Bleed", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 2,
      validation: (Rule) => Rule.required(),
    },

    {
      name: "imageWidth",
      type: "number",
      title: "Image Width",
      group: "layout",
      options: {
        list: sectionWidthOptions,
        layout: "radio",
      },
      initialValue: 0,
      hidden: ({ parent }) =>
        parent?.images?.length > 1 || parent?.selectedLayout !== 2,
      description:
        "Only applicable when displaying only one image and the Inset layout is selected.",
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      media: "image.image",
      images: "images",
      subtitle: "selectedLayout",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const {
        name,
        subtitle,
        images,
        hideSection,
        expirationDate,
        scheduledReleaseDate,
      } = value;
      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || "Image Section";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      const imageLength = images?.length || 0;
      const imageText = imageLength
        ? imageLength > 1
          ? `${imageLength} Images`
          : "Image"
        : "";
      let subtitleText = `${imageText} - Inset`;
      if (subtitle === 1) {
        subtitleText = `${imageText} - Full Bleed`;
      }

      return {
        title: displayTitle,
        subtitle: subtitleText,
        media: images?.length > 1 ? ImagesIcon : images?.[0].image || ImageIcon,
      };
    },
  },
};

export default imageSectionSchema;
