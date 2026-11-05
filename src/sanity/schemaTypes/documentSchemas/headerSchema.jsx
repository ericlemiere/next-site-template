import { schemaGroup } from "../../../utils/constants/schema";
import { DocumentIcon } from "@sanity/icons/Document";
import { createLogoField } from "../../lib/createLogoField";

export default {
  name: "header",
  type: "document",
  title: "Header",
  groups: schemaGroup,
  fields: [
    // ========================================= CONTENT
    {
      name: "name",
      type: "string",
      title: "Name",
      initialValue: "Header",
      readOnly: true,
      hidden: true,
    },
    {
      name: "headerBanner",
      title: "Header Banner",
      type: "reference",
      to: { type: "headerBanner" },
      group: "content",
    },
    createLogoField({ group: "content" }),
    {
      name: "pageLayout",
      type: "array",
      title: "Navigation Layout",
      group: "content",
      of: [
        {
          icon: DocumentIcon,
          title: "Page",
          type: "reference",
          to: [{ type: "page" }],
          description: "Select a page from the dropdown, or add a new one.",
        },
        { type: "headerDropdown" },
        { type: "link" },
      ],
    },
    {
      name: "button",
      type: "button",
      title: "Button",
      group: "content",
      description: "Optional. Appears on the right side of the header.",
    },

    // ========================================= LAYOUT
    {
      name: "headerType",
      type: "number",
      group: "layout",
      description: (
        <div>
          <div>
            Select the type of header you would like to use. See descriptions
            below for more information.
          </div>
          <div>
            <div
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                marginTop: 12,
              }}
            >
              <h4
                style={{
                  paddingTop: 12,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Disappearing Header
              </h4>
              <p style={{ margin: "14px 0 14px 14px" }}>
                This header style disappears as the user scrolls down the page,
                and reappears as soon as the user scrolls up.
              </p>
            </div>

            <div
              style={{
                border: "none",
                borderTop: "1px dotted",
                borderWidth: 1,
                paddingTop: 12,
                paddingBottom: 12,
              }}
            >
              <h4
                style={{
                  paddingTop: 12,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Sticky Header
              </h4>
              <p style={{ margin: "14px 0 14px 14px" }}>
                This header style will always be stuck to the top of the page.
              </p>
            </div>

            <div
              style={{
                border: "none",
                borderTop: "1px dotted",
                borderWidth: 1,
                paddingTop: 12,
                paddingBottom: 12,
              }}
            >
              <h4
                style={{
                  paddingTop: 12,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Sticky Dynamic Header
              </h4>
              <p style={{ margin: "14px 0 14px 14px" }}>
                This header style will always be stuck to the top of the page,
                but the height will shrink when a user starts to scroll.
              </p>
            </div>
          </div>
        </div>
      ),
      options: {
        list: [
          { title: "Disappearing Header", value: 1 },
          { title: "Sticky Header", value: 2 },
          { title: "Sticky Dynamic Header", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 1,
    },
  ],
};
