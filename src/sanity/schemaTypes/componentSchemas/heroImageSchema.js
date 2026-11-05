import { ImageIcon } from "@sanity/icons/Image";
import { schemaGroup } from "../../../utils/constants/schema";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "@/utils/constants/colors";

const heroImageSchema = {
  name: "heroImage",
  type: "object",
  title: "Hero Image",
  icon: ImageIcon,

  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "name",
      type: "string",
      group: "content",
      description:
        "This field is used for organization only and will not display on site. If left blank, the title will be used as the section name.",
    },
    {
      name: "title",
      type: "string",
      group: "content",
    },
    {
      name: "image",
      type: "imageSimple",
      group: "content",
    },
    {
      name: "button",
      type: "button",
      title: "Button",
      group: "content",
      hidden: ({ parent }) => parent?.selectedLayout !== 1,
    },

    // ========================================= STYLES
    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        overlayColor: "transparent",
        titleTextColor: COLORS.WHITE.VALUE,
        titleTextSize: "heading1",
        titleHeadingTag: "",
        textAlignment: "center",
        addRightAlignment: true,
        paddingTop: "none",
        paddingBottom: "none",
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
          { title: "Default Height", value: 1 },
          { title: "Condensed Height", value: 2 },
          { title: "Banner Height", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 1,
      validation: (Rule) => Rule.required(),
    },

    {
      name: "addParallaxEffect",
      type: "boolean",
      title: "Add Parallax Effect",
      group: "layout",
      description: "Enable a parallax scrolling effect for the hero image.",
      initialValue: true,
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      layout: "selectedLayout",
      media: "image.image",
      addParallaxEffect: "addParallaxEffect",
      hideSection: "hideSection",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const {
        name,
        title,
        layout,
        media,
        addParallaxEffect,
        hideSection,
        scheduledReleaseDate,
      } = value;
      const now = new Date();
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Hero Image";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      const baseSubtitle = "Hero Image";
      const sizeSubtitle =
        layout === 1
          ? "Default Height"
          : layout === 2
            ? "Condensed Height"
            : layout === 3
              ? "Banner Height"
              : null;

      const subtitle = [
        baseSubtitle,
        sizeSubtitle && `– ${sizeSubtitle}`,
        addParallaxEffect && "with parallax effect",
      ]
        .filter(Boolean)
        .join(" ");

      return { title: displayTitle, subtitle, media: media || ImageIcon };
    },
  },
};

export default heroImageSchema;
