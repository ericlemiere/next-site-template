import { BsFillCalendarEventFill } from "react-icons/bs";
import { TagsIcon } from "@sanity/icons/Tags";
import { SchemaIcon } from "@sanity/icons/Schema";
import { pageLayoutField } from "../pageLayoutField";

import { createSlugField } from "../../../sanity/lib/createSlugField";
import { DocumentIcon } from "@sanity/icons/Document";

import { GroupHeading } from "@/utils/helpers/sanity-helpers";

const eventSchema = {
  name: "event",
  type: "document",
  title: "Event",
  icon: BsFillCalendarEventFill,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: DocumentIcon,
    },
    {
      name: "filters",
      title: "Filter Tags",
      icon: TagsIcon,
    },
    {
      name: "details",
      title: "Details",
      icon: BsFillCalendarEventFill,
    },
    {
      name: "meta",
      title: "Meta Settings",
      icon: SchemaIcon,
    },
  ],
  fields: [
    // ========================================= CONTENT
    GroupHeading("Page Content", "content"),
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
      group: "content",
    },

    {
      name: "slug",
      type: "slug",
      ...createSlugField({ source: "title", prefix: "events" }),
      group: "content",
    },

    pageLayoutField({ isPostPage: true }),

    {
      name: "heroImage",
      type: "imageSimple",
      title: "Hero Image",
      description:
        "This is the hero image for the event page. Aspect ratio: 16:9",
      group: "content",
    },

    // // ========================================= FILTERS
    // GroupHeading('Filters', 'filters'),

    // {
    //   name: 'tags',
    //   type: 'array',
    //   title: 'Primary Tags',
    //   of: [
    //     {
    //       title: 'Add a tag from the dropdown or create a new one',
    //       type: 'reference',
    //       to: [{ type: 'eventTag' }],
    //     },
    //   ],
    //   description:
    //     'Tags are used for filtering on the site. The first tag in the list will be the primary tag.',
    //   //validation: (Rule) => Rule.required(),
    //   group: 'filters',
    // },

    // ========================================= DETAILS
    GroupHeading("Event Details", "details"),

    {
      name: "eventDateTime",
      type: "datetime",
      title: "Event Date & Time",
      group: "details",
      options: {
        timeStep: 5,
        timeFormat: "hh:mm",
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "allDay",
      type: "boolean",
      title: "All Day Event",
      description: "Is this an all day event?",
      group: "details",
      initialValue: false,
    },

    {
      name: "duration",
      type: "number",
      title: "Duration (in hours)",
      group: "details",
      validation: (Rule) => Rule.integer().min(0),
      hidden: ({ parent }) => parent?.allDay === true,
    },

    {
      name: "location",
      type: "string",
      title: "Location",
      group: "details",
    },

    {
      name: "locationUrl",
      type: "url",
      title: "Location URL",
      description:
        "Optional. Add a link to the event location, such as a Google Maps link.",
      group: "details",
    },

    {
      name: "eventDescription",
      type: "text",
      title: "Event Description",
      group: "details",
      rows: 4,
      description:
        "Add a brief description of the event that will populate the pop-up in the calendar, the meta description, and the Add To Calendar feature.",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage.image",
      eventDateTime: "eventDateTime",
    },
    prepare: (value) => {
      const { title, media, eventDateTime } = value;
      const now = new Date();
      let pastEvent = eventDateTime && new Date(eventDateTime) < now;
      let subtitle = eventDateTime
        ? new Date(eventDateTime).toLocaleDateString("en-US", {
            month: "long", // "January", "February", etc.
            day: "numeric", // 1, 2, 3, etc.
            year: "numeric", // 2023, 2024, etc.
          })
        : "No date set";
      if (pastEvent) {
        subtitle = `[PAST EVENT] ${subtitle}`;
      }

      return {
        title: title || "No title",
        media: media || BsFillCalendarEventFill,
        subtitle: subtitle,
      };
    },
  },
};

export default eventSchema;
