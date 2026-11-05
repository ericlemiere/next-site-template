import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "@/utils/helpers/richTextOptions";

const MuxLogo = () => (
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 208.25 65"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
      }}
      xmlSpace="preserve"
    >
      <g fill="#fa50b5">
        <path d="M129.44,0c-4.52,0-8.18,3.64-8.18,8.12V32.5c0,8.96-7.35,16.25-16.38,16.25c-9.03,0-16.38-7.29-16.38-16.25V8.12   c0-4.49-3.66-8.12-8.18-8.12s-8.18,3.64-8.18,8.12V32.5c0,17.92,14.69,32.5,32.74,32.5c18.05,0,32.74-14.58,32.74-32.5V8.12   C137.63,3.64,133.96,0,129.44,0L129.44,0z M129.44,13.71c-3.11,0-5.63-2.5-5.63-5.59c0-3.09,2.52-5.59,5.63-5.59   c3.11,0,5.63,2.5,5.63,5.59C135.07,11.21,132.55,13.71,129.44,13.71z"></path>
        <path d="M163.93,32.5l-18.77,18.63c-3.2,3.17-3.2,8.32,0,11.49c3.2,3.17,8.38,3.17,11.57,0l18.77-18.63l18.77,18.63   c3.2,3.17,8.38,3.17,11.57,0c3.2-3.17,3.2-8.32,0-11.49L187.08,32.5l18.77-18.63c3.2-3.17,3.2-8.32,0-11.49s-8.38-3.17-11.57,0   l-18.77,18.63L156.73,2.38c-3.2-3.17-8.38-3.17-11.57,0c-3.2,3.17-3.2,8.32,0,11.49L163.93,32.5z M200.07,62.47   c-3.11,0-5.63-2.5-5.63-5.59c0-3.09,2.52-5.59,5.63-5.59c3.11,0,5.63,2.5,5.63,5.59C205.7,59.96,203.18,62.47,200.07,62.47z"></path>
        <path d="M60.44,0.62c-3.06-1.26-6.58-0.56-8.92,1.76L32.74,21.01L13.97,2.38c-2.34-2.32-5.86-3.02-8.92-1.76   C1.99,1.88,0,4.84,0,8.12v48.75C0,61.36,3.66,65,8.18,65c4.52,0,8.18-3.64,8.18-8.12V27.73l10.59,10.51c3.2,3.17,8.38,3.17,11.57,0   l10.59-10.51v29.14c0,4.49,3.66,8.12,8.18,8.12c4.52,0,8.18-3.64,8.18-8.12V8.12C65.49,4.84,63.5,1.88,60.44,0.62L60.44,0.62z    M57.3,62.47c-3.11,0-5.63-2.5-5.63-5.59c0-3.09,2.52-5.59,5.63-5.59c3.11,0,5.63,2.5,5.63,5.59   C62.94,59.96,60.41,62.47,57.3,62.47z"></path>
      </g>
    </svg>
  </div>
);

export default {
  name: "videoMux",
  type: "object",
  title: "Mux Video Plugin",
  icon: MuxLogo,

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
      title: "Video file",
      name: "video",
      type: "mux.video",
      group: "content",
      options: {
        // Enable static MP4 renditions
        mp4_support: "capped-1080p",
      },
    },

    {
      name: "muxOptions",
      type: "object",
      title: "Mux Player Options",
      group: "content",
      description: "Optional settings for the Mux Player",
      options: {
        collapsible: false,
        columns: 2,
      },
      fields: [
        {
          name: "autoplay",
          type: "boolean",
          title: "Autoplay",
          initialValue: false,
          options: {
            layout: "checkbox",
          },
        },
        {
          name: "loop",
          type: "boolean",
          title: "Loop Video",
          initialValue: false,
          options: {
            layout: "checkbox",
          },
        },
        {
          name: "downloadable",
          type: "boolean",
          title: "Allow Downloads",
          initialValue: false,
          options: {
            layout: "checkbox",
          },
        },
        {
          name: "hideControls",
          type: "boolean",
          title: "Hide Player Controls",
          initialValue: false,
          options: {
            layout: "checkbox",
          },
        },
      ],
    },

    {
      name: "title",
      title: "Overlay Title",
      group: "content",
      type: "string",
      description:
        "Optional. Text will appear on top of the video as an overlay only if autoplay is selected. Best for short text.",
    },
    {
      name: "subtitle",
      title: "Overlay Subtitle",
      group: "content",
      type: "array",
      of: richTextOptions({}),
      description:
        "Optional. Text will appear on top of the video as an overlay only if autoplay is selected. Best for short text.",
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
        titleTextColor: COLORS.PRIMARY.VALUE,
        titleTextSize: "heading1",
        titleHeadingTag: "",
        subtitleTextColor: COLORS.BLACK.VALUE,
        subtitleTextSize: "body1",
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
      title: "Video Display",
      type: "number",
      options: {
        list: [
          { title: "Default Width Video", value: 0 },
          { title: "Full Width Video", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    },

    {
      name: "restrictHeight",
      type: "number",
      group: "layout",
      title: "Restrict Height",
      options: {
        list: [
          { title: "No", value: 0 },
          { title: "Yes", value: 1 },
        ],
        layout: "radio",
      },
      initialValue: 0,
      description:
        "Video will display at standard 16:9 aspect ratio unless height is restricted.",
      hidden: ({ parent }) => parent?.selectedLayout !== 1,
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "sectionName",
      title: "title",
      media: "videoThumbnail",
      hideSection: "hideSection",
      expirationDate: "expirationDate",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, title, hideSection, expirationDate, scheduledReleaseDate } =
        value;
      const now = new Date();
      const isExpired = expirationDate && new Date(expirationDate) < now;
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Mux Video";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Mux Video",
        media: MuxLogo,
      };
    },
  },
};
