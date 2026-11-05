import { RxViewGrid } from "react-icons/rx";

import {
  advancedGroupOptions,
  GroupHeading,
} from "../../../utils/helpers/sanity-helpers";
import { COLORS } from "../../../utils/constants/colors";
import { schemaGroup } from "../../../utils/constants/schema";

const cardGridSchema = {
  name: "cardGrid",
  type: "object",
  title: "Card Grid",
  icon: RxViewGrid,
  groups: schemaGroup,

  fields: [
    //
    // ========================================= CONTENT
    //
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
      name: "cardType",
      type: "string",
      title: "Card Type",
      options: {
        list: [
          {
            title: "Card",
            value: "card",
          },
          {
            title: "Card with Background Image",
            value: "backgroundImageCard",
          },
          {
            title: "Expandable Card",
            value: "cardExpandable",
          },
        ],
        layout: "radio",
      },
      group: "content",
      validation: (Rule) => Rule.required(),
      description: (
        <div>
          Each card type has a specific image aspect ratio to ensure proper
          display:
          <details>
            <summary style={{ marginTop: "12px" }}>Image Aspect Ratios</summary>
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "14px",
                lineHeight: 1.4,
              }}
            >
              <div>
                <h5
                  style={{ margin: "0 0 2px 0", fontSize: 14, fontWeight: 500 }}
                >
                  Card
                </h5>
                <p style={{ margin: 0, opacity: 0.7 }}>3:2 aspect ratio</p>
              </div>

              <div>
                <h5
                  style={{ margin: "0 0 2px 0", fontSize: 14, fontWeight: 500 }}
                >
                  Card with Background Image
                </h5>
                <p style={{ margin: 0, opacity: 0.7 }}>
                  No set aspect ratio (image fills card)
                </p>
              </div>

              <div>
                <h5
                  style={{ margin: "0 0 2px 0", fontSize: 14, fontWeight: 500 }}
                >
                  Expandable Card
                </h5>
                <p style={{ margin: 0, opacity: 0.7 }}>1:1 aspect ratio</p>
              </div>
            </div>
          </details>
        </div>
      ),
    },

    {
      name: "gridLayout",
      type: "array",
      group: "content",
      of: [{ type: "card" }],
    },
    {
      name: "button",
      type: "button",
      title: "Button",
      group: "content",
      description:
        "Optional. If provided, will display at bottom of the entire grid.",
    },

    //
    // ========================================= STYLES
    //
    GroupHeading("Styles", "style"),

    {
      name: "sectionStyles",
      title: "Section Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        backgroundColor: COLORS.WHITE.VALUE,
        titleTextColor: COLORS.PRIMARY.VALUE,
        titleTextSize: "heading2",
        titleHeadingTag: "",
        textAlignment: "left",
        paddingTop: "default",
        paddingBottom: "default",
      },
    },

    {
      name: "cardStyles",
      title: "Card Styles",
      type: "sectionStyle",
      group: "style",
      options: {
        titleTextColor: COLORS.PRIMARY.VALUE,
        titleTextSize: "heading3",
        subtitleTextColor: COLORS.BLACK.VALUE,
        subtitleTextSize: "heading4",
        bodyTextColor: COLORS.BLACK.VALUE,
        bodyTextSize: "body1",
        textAlignment: "left",
      },
    },

    //
    // ========================================= LAYOUT
    //
    GroupHeading("Layout", "layout"),
    {
      name: "gridColumns",
      type: "number",
      group: "layout",
      title: "Grid Columns",
      options: {
        list: [
          { title: "2 columns", value: 2 },
          { title: "3 columns", value: 3 },
          { title: "4 columns", value: 4 },
        ],
        layout: "radio",
      },
      description:
        "This only applies to larger screens. On mobile, it will be 1 column.",
      initialValue: 2,
    },

    //
    // ========================================= ADVANCED
    //
    ...advancedGroupOptions(),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      columns: "gridColumns",
      hideSection: "hideSection",
      scheduledReleaseDate: "scheduledReleaseDate",
    },
    prepare: (value) => {
      const { name, title, columns, hideSection, scheduledReleaseDate } = value;
      const now = new Date();
      const isScheduled =
        scheduledReleaseDate && new Date(scheduledReleaseDate) > now;

      let displayTitle = name || title || "Card Grid";
      if (isScheduled) {
        displayTitle = `*** SCHEDULED ${displayTitle} ***`;
      } else if (hideSection) {
        displayTitle = `*** HIDDEN ${displayTitle} ***`;
      }

      return {
        title: displayTitle,
        subtitle: `Card Grid - ${columns} columns`,
        media: RxViewGrid,
      };
    },
  },
};

export default cardGridSchema;
