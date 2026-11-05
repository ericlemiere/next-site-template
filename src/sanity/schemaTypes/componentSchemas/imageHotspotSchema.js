import { RxImage } from "react-icons/rx";

import {
  GroupHeading,
  advancedGroupOptions,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const imageHotspotSchema = {
  name: "imageHotspot",
  type: "object",
  title: "Image Hotspot",
  icon: RxImage,

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
      name: "hotspotImage",
      type: "reference",
      to: [{ type: "hotspotImage" }],
      title: "Hotspot Image",
      description:
        "Select/Create a Hotspot Image to overlay hotspots on the image.",
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

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      media: "hotspotImage.image.image",
      subtitle: "selectedLayout",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const {
        name,
        subtitle,
        media,
        hideSection,
        expirationDate,
        scheduledReleaseDate,
      } = value;
      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || "Image Hotspot";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle:
          subtitle === 1
            ? "Image Hotspot - Full Bleed"
            : subtitle === 2
              ? "Image Hotspot - Inset"
              : undefined,
        media: media || RxImage,
      };
    },
  },
};

export default imageHotspotSchema;
