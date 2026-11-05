import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";
import { richTextOptions } from "@/utils/helpers/richTextOptions";
import { BsFillCalendarEventFill } from "react-icons/bs";

const eventCalendarSchema = {
  name: "eventCalendar",
  type: "object",
  title: "Event Calendar",
  icon: BsFillCalendarEventFill,

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
      of: richTextOptions({}),
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
        titleTextColor: COLORS.PRIMARY.VALUE,
        titleTextSize: "heading1",
        titleHeadingTag: "",
        bodyTextColor: COLORS.BLACK.VALUE,
        bodyTextSize: "body1",
        textAlignment: "left",
        paddingTop: "default",
        paddingBottom: "default",
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

      let displayTitle = name || title || "Event Calendar";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      } else if (isExpired) {
        displayTitle = `*** EXPIRED ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: "Event Calendar",
        media: BsFillCalendarEventFill,
      };
    },
  },
};

export default eventCalendarSchema;
