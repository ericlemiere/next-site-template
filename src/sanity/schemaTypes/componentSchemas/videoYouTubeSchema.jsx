import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const youtubeLogo = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1em",
      height: "1em",
      transform: "scale(1.8)",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.57 20"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
    >
      <g>
        <path
          d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
          fill="#FF0000"
        />
        <path
          d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
          fill="white"
        />
      </g>
    </svg>
  </div>
);

const videoYouTubeSchema = {
  name: "videoYouTube",
  type: "object",
  title: "YouTube Video",
  icon: youtubeLogo,

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
      name: "youtubeUrl",
      type: "string",
      group: "content",
      description: "Please provide the youtube URL",
    },

    {
      name: "videoThumbnail",
      group: "content",
      type: "imageSimple",
      description: "Image should be 16:9 aspect ratio for best results",
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
        overlayColor: "transparent",
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

      let displayTitle = name || "YouTube Video";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "YouTube Video",
        media: youtubeLogo,
      };
    },
  },
};

export default videoYouTubeSchema;
