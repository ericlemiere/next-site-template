import { CustomMessageDisplay } from "../../components/CustomMessageDisplay";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "@/utils/helpers/richTextOptions";

import { ImageIcon } from "@sanity/icons/Image";

const imageAndTextSchema = {
  name: "imageAndTextSection",
  type: "object",
  title: "Image & Text",
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
      description:
        "This field is used for organization only and will not display on site. If left blank, the title will be used as the section name.",
    },

    {
      name: "title",
      type: "string",
      group: "content",
    },

    {
      name: "body",
      type: "array",
      of: richTextOptions({ socialIconsOn: true }),
      group: "content",
    },

    {
      name: "button",
      type: "button",
      title: "Button",
      group: "content",
    },

    {
      name: "image",
      type: "imageModule",
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
        titleTextColor: COLORS.PRIMARY.VALUE,
        titleTextSize: "heading1",
        titleHeadingTag: "",
        bodyTextColor: COLORS.BLACK.VALUE,
        bodyTextSize: "body1",
        textAlignment: "left",
        addRightAlignment: true,
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= LAYOUT
    GroupHeading("Layout", "layout"),
    {
      name: "selectedLayout",
      group: "layout",
      title: "Selected Layout",
      type: "number",
      options: {
        list: [
          {
            title: "Row (image can be left or right of text)",
            value: 2,
          },
          { title: "Full Bleed Image", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 2,
    },

    {
      name: "imageSide",
      type: "number",
      title: "Image Side",
      options: {
        list: [
          { title: "Left", value: 1 },
          { title: "Right", value: 2 },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: 1,
      group: "layout",
      hidden: ({ parent }) => parent?.selectedLayout !== 2,
    },

    {
      name: "imageSizing",
      type: "number",
      title: "Image Sizing",
      options: {
        list: [
          { title: "Natural", value: 1 },
          { title: "Stretch", value: 2 },
        ],
        layout: "radio",
        direction: "vertical",
      },
      initialValue: 1,
      group: "layout",
      hidden: ({ parent }) => parent?.selectedLayout !== 2,
      description: (
        <div>
          Control how the image scales relative to the text content.
          <br />
          <br />
          <p>
            <span style={{ fontWeight: "bold" }}>Natural:</span> Keeps the
            image's original or cropped aspect ratio.
          </p>
          <br />
          <p>
            <span style={{ fontWeight: "bold" }}>Stretch:</span> Adjusts the
            image height to match the text block height for a balanced
            appearance. This may crop the image differently than its original
            aspect ratio. On mobile, the image displays at its natural
            dimensions.
          </p>
        </div>
      ),
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      media: "image.image",
      subtitle: "selectedLayout",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const {
        name,
        title,
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

      let displayTitle = name || title || "Image & Text";
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
          (subtitle === 1 && "Image & Text - Full Bleed Image") ||
          (subtitle === 2 && "Image & Text - Row") ||
          "Layout not set",
        media: media || ImageIcon,
      };
    },
  },
};

export default imageAndTextSchema;
