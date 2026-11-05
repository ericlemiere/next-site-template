import { RiTextBlock, RiText } from "react-icons/ri";
import { FaAt, FaPhone, FaChevronDown, FaSquareCheck } from "react-icons/fa6";

const contactFormFieldSchema = {
  name: "contactFormField",
  type: "object",
  title: "Contact Field",
  fields: [
    {
      name: "fieldType",
      type: "string",
      title: "Field Type",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Phone", value: "phone" },
          { title: "Textarea", value: "textarea" },
          { title: "Dropdown", value: "dropdown" },
          { title: "Checkbox", value: "checkbox" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "label",
      type: "string",
      title: "Field Label",
      description: "The label that will be displayed for this field.",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "isRequired",
      type: "boolean",
      title: "Is Required",
      hidden: ({ parent }) => parent?.fieldType === "checkbox",
    },

    {
      name: "options",
      type: "array",
      title: "Selection Options",
      of: [{ type: "string" }],
      description: "Add options for the dropdown field",
      hidden: ({ parent }) =>
        parent?.fieldType !== "dropdown" && parent?.fieldType !== "checkbox",
    },
  ],
  preview: {
    select: {
      label: "label",
      fieldType: "fieldType",
      isRequired: "isRequired",
    },
    prepare: (value) => {
      const { label, fieldType, isRequired } = value;

      let icon;
      switch (fieldType) {
        case "text":
          icon = RiText;
          break;
        case "email":
          icon = FaAt;
          break;
        case "phone":
          icon = FaPhone;
          break;
        case "textarea":
          icon = RiTextBlock;
          break;
        case "dropdown":
          icon = FaChevronDown;
          break;
        case "checkbox":
          icon = FaSquareCheck;
          break;
        default:
          icon = RiText;
      }

      return {
        title: label,
        subtitle: `${fieldType ? fieldType.charAt(0).toUpperCase() + fieldType.slice(1) : ""}${
          isRequired ? " (Required)" : ""
        }`,
        media: icon,
      };
    },
  },
};

export default contactFormFieldSchema;
