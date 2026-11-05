import { DoubleChevronDownIcon } from "@sanity/icons/DoubleChevronDown";

const headerDropdownSchema = {
  name: "headerDropdown",
  type: "object",
  title: "Dropdown Menu",
  icon: DoubleChevronDownIcon,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
      description:
        "This will be the text that gets clicked on to open the dropdown menu.",
    },
    {
      name: "links",
      type: "array",
      title: "Links",
      of: [
        {
          title: "Page",
          type: "reference",
          to: [{ type: "page" }],
          description: "Select a page from the dropdown, or add a new one.",
        },
        { type: "link" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: (value) => {
      const { title } = value;
      return {
        title: title || "NO TITLE",
        subtitle: "Dropdown Menu",
        media: DoubleChevronDownIcon,
      };
    },
  },
};

export default headerDropdownSchema;
