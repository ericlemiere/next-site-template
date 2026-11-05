import { HiSpeakerWave } from "react-icons/hi2";
import {
  GroupHeading,
  advancedGroupOptions,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const audioPlayerSchema = {
  name: "audioPlayer",
  type: "object",
  title: "Audio Player",
  icon: HiSpeakerWave,

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
      name: "title",
      type: "string",
      group: "content",
      title: "Audio Title",
    },

    {
      name: "audioFile",
      type: "file",
      title: "Audio File",
      group: "content",
      options: {
        accept: "audio/*",
      },
    },

    {
      name: "allowDownload",
      type: "boolean",
      title: "Allow Download",
      description: "If enabled, users can download the audio file.",
      group: "content",
      initialValue: false,
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
        paddingTop: "small",
        paddingBottom: "small",
      },
    },

    // ========================================= ADVANCED
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
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

      let displayTitle = name || title || "Audio Player";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Audio Player",
        media: HiSpeakerWave,
      };
    },
  },
};

export default audioPlayerSchema;
