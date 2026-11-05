import { FaLightbulb } from "react-icons/fa";
import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { schemaGroup } from "../../../utils/constants/schema";

const blogPostGridSchema = {
  name: "blogPostGrid",
  type: "object",
  title: "Post Grid",
  icon: FaLightbulb,
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
      name: "autoPopulate",
      type: "boolean",
      group: "content",
      description:
        "If selected, the grid will automatically populate with all posts in chronological order. If not, you will need to manually select the posts you want to display.",
      initialValue: false,
    },
    {
      name: "autoPopulateTag",
      type: "boolean",
      title: "Auto Populate Based On Tag",
      group: "content",
      description:
        "If selected, the grid will automatically populate with only posts that have the selected tag.",
      initialValue: false,
      hidden: ({ parent }) => !parent?.autoPopulate,
    },
    {
      name: "autoPopulateTagValue",
      type: "reference",
      title: "Tag",
      to: [{ type: "blogTags" }],
      group: "content",
      description:
        "Posts populate based on this tag. Select a tag from the dropdown.",
      hidden: ({ parent }) => !parent?.autoPopulateTag || !parent?.autoPopulate,
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          if (parent.autoPopulateTag && !value) {
            return "Tag is required when Auto Populate Based On Tag is selected.";
          }
          return true;
        }),
    },
    {
      name: "showFeaturedPost",
      type: "boolean",
      title: "Show Featured Post",
      group: "content",
      description:
        "If selected, the first post below will display at the top of the grid in a featured section.",
      initialValue: false,
    },
    {
      name: "limitGrid",
      type: "boolean",
      group: "content",
      description: `If selected, the grid will only display 3 posts. If Show Featured Post is selected, 
        the grid will display 3 posts below the featured post, totaling 4 posts.
        Limiting the grid will also remove filtering ability.`,
      initialValue: false,
      hidden: ({ parent }) => !parent?.autoPopulate,
    },
    {
      name: "showFilter",
      type: "boolean",
      group: "content",
      description: `If selected, a filter will display above the grid allowing users to filter posts by category. 
        If Auto Populate and Limit Grid are selected, the filter will not display.`,
      initialValue: true,
      hidden: ({ parent }) =>
        (parent?.limitGrid && parent?.autoPopulate) ||
        (parent?.autoPopulate && parent?.autoPopulateTag),
    },
    {
      name: "grid",
      type: "array",
      group: "content",
      of: [
        {
          type: "reference",
          to: [{ type: "blogPost" }],
          title: "Add Post",
          description: "Select a post from the dropdown, or add a new one.",
        },
      ],
      hidden: ({ parent }) => parent?.autoPopulate,
    },
    {
      name: "button",
      type: "button",
      title: "Button",
      group: "content",
      description: "Optional",
    },

    // ========================================= STYLES
    GroupHeading("Styles", "style"),

    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        titleTextSize: "heading1",
        titleHeadingTag: "",
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
      auto: "autoPopulate",
      hideSection: "hideSection",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, title, auto, hideSection, scheduledReleaseDate } = value;
      const now = new Date();
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Post Grid";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: auto
          ? "Post Grid - Auto Populate"
          : "Post Grid - Manual Selection",
        media: FaLightbulb,
      };
    },
  },
};

export default blogPostGridSchema;
