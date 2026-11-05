import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "@/utils/helpers/richTextOptions";

const vimeoLogo = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1em",
      height: "1em",
      transform: 'scale(1.8)',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 48 48"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <path
        fill="#29B6F6"
        d="M45,14.3c-0.2,4.1-3,9.6-8.6,16.6c-5.7,7.4-10.5,11-14.5,11c-2.4,0-4.5-2.2-6.2-6.7c-1.1-4.1-2.3-8.2-3.4-12.3c-1.3-4.5-2.6-6.7-4-6.7C8,16.2,6.9,16.7,5,18l-2-2.3c2.1-1.8,4-3.1,6-4.9c2.8-2.4,4.8-3.6,6.2-3.7c3.3-0.3,5.3,1.9,6,6.6c0.8,5.1,1.5,7.8,1.8,9c0.9,4.2,2,6.4,3.1,6.4c0.9,0,2.2-1.4,4-4.1c1.8-2.8,2.7-4.8,2.8-6.3c0.3-2.4-0.7-3.6-2.8-3.6c-1,0-2.1,0.5-3.2,0.9c2.1-6.7,6.1-10.2,11.9-10C43.2,6.1,45.2,8.9,45,14.3z"
      ></path>
    </svg>
  </div>
);

const videoVimeoSchema = {
  name: "videoVimeo",
  type: "object",
  title: "Vimeo Video",
  icon: vimeoLogo,

  groups: schemaGroup,

  fields: [
    // ========================================= CONTENT
    GroupHeading("Content", "content"),
    {
      name: "sectionName",
      group: "content",
      type: "string",
      description:
        "For organizational purposes only. Will not appear on the site.",
    },

    {
      name: "vimeoId",
      type: "string",
      group: "content",
      description:
        "Please provide the vimeo share url or the 9-digit video ID. Ex: 852846883",
    },

    {
      name: "selectedLayout",
      group: "content",
      title: "Video Display",
      type: "number",
      options: {
        list: [
          { title: "Background Video", value: 1 },
          { title: "Standard Video", value: 2 },
        ],
        layout: "radio",
      },
      initialValue: 1,
      validation: (Rule) => Rule.required(),
      description: `Background videos play automatically with no sound.
      Standard videos will play after a user hits the play button.`,
    },

    {
      name: "restrictHeight",
      type: "number",
      group: "content",
      title: "Restrict Height",
      options: {
        list: [
          { title: "No", value: 0 },
          { title: "Yes", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 1,
      description:
        "Video will display at standard 16:9 aspect ratio unless height is restricted.",
      hidden: ({ parent }) => parent?.selectedLayout !== 1,
    },

    {
      name: "videoThumbnail",
      group: "content",
      type: "imageSimple",
      description: "Image should be 16:9 aspect ratio for best results",
      hidden: ({ parent }) => parent?.selectedLayout === 1,
    },

    {
      name: "title",
      title: "Overlay Title",
      group: "content",
      type: "string",
      description: "Optional",
      hidden: ({ parent }) => parent?.selectedLayout !== 1,
    },
    {
      name: "subtitle",
      title: "Overlay Subtitle",
      group: "content",
      type: "array",
      of: richTextOptions({}),
      description: "Optional",
      hidden: ({ parent }) => parent?.selectedLayout !== 1,
    },
    {
      name: "button",
      type: "button",
      title: "Overlay Button",
      group: "content",
      hidden: ({ parent }) => parent?.selectedLayout !== 1,
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
        overlayColor: COLORS.WHITE.VALUE,
        titleTextColor: COLORS.PRIMARY_DARK.VALUE,
        titleTextSize: "heading1",
        titleHeadingTag: "",
        subtitleTextColor: COLORS.PRIMARY_DARK.VALUE,
        subtitleTextSize: "body1",
        textAlignment: "left",
        addRightAlignment: true,
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "sectionName",
      title: "title",
      media: "videoThumbnail",
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
        hideSection,
        expirationDate,
        scheduledReleaseDate,
      } = value;
      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Vimeo Video";
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
            ? "Vimeo Background Video"
            : subtitle === 2
              ? "Vimeo Video"
              : undefined,
        media: vimeoLogo,
      };
    },
  },
};

export default videoVimeoSchema;
