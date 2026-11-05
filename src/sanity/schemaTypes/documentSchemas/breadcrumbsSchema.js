import { PiBreadFill } from "react-icons/pi";
import {
  COLORS,
  defaultBackgroundColorOptions,
  defaultTextColorOptions,
} from "../../../utils/constants/colors";
import ColorSelector from "../../components/ColorSelector";

const breadcrumbs = {
  name: "breadcrumbs",
  title: "Breadcrumbs",
  type: "document",
  icon: PiBreadFill,
  fields: [
    {
      name: "addBreadcrumbs",
      type: "boolean",
      title: "Add Breadcrumbs",
      initialValue: false,
      description:
        "Toggle to add breadcrumbs to the site. When enabled, breadcrumbs will be displayed on the site to help users navigate.",
    },
    {
      name: "backgroundColor",
      type: "string",
      options: { list: defaultBackgroundColorOptions },
      components: { input: ColorSelector },
      initialValue: COLORS.WHITE.VALUE,
      hidden: ({ document }) => !document?.addBreadcrumbs,
    },

    {
      name: "textColor",
      type: "string",
      options: { list: defaultTextColorOptions },
      components: { input: ColorSelector },
      initialValue: COLORS.BLACK.VALUE,
      hidden: ({ document }) => !document?.addBreadcrumbs,
    },
  ],
  preview: {
    select: {
      title: "addBreadcrumbs",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title ? "Breadcrumbs Enabled" : "Breadcrumbs Disabled",
        media: PiBreadFill,
      };
    },
  },
};

export default breadcrumbs;
