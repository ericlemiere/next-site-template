import { GroupHeading } from "../../../utils/helpers/sanity-helpers";
import { defineField } from "sanity";
import { pageLayoutField } from "../pageLayoutField";
import { DocumentIcon } from "@sanity/icons/Document";
import { HomeIcon } from "@sanity/icons/Home";
import { SchemaIcon } from "@sanity/icons/Schema";

export default {
  name: "homePage",
  type: "document",
  title: "Home Page",
  icon: HomeIcon,
  groups: [
    {
      name: "content",
      title: "Page Content",
      default: true,
      icon: DocumentIcon,
    },
    {
      name: "meta",
      title: "Meta Settings",
      icon: SchemaIcon,
    },
  ],
  fields: [
    GroupHeading("Content", "content"),

    defineField({
      name: "pageName",
      type: "string",
      title: "Page Name",
      group: "content",
      initialValue: "Home Page",
      hidden: true, // TODO: hide this field after new project is created
    }),
    defineField({
      name: "navigationName",
      type: "string",
      title: "Navigation Name",
      description: "This is what will show up in the header/footer.",
      group: "content",
      initialValue: "Home",
    }),

    pageLayoutField({ isPostPage: false }),

    //
    // SEO
    //
    GroupHeading("Meta Settings", "meta"),

    defineField({
      name: "metaTitle",
      type: "placeholderString",
      title: "Meta Title",
      group: "meta",
      description:
        "Write an accurate and concise title that describes the page. Ideally between 14 and 50 characters. If empty, the Navigation Name will be used.",
      options: { field: "navigationName" },
      validation: (Rule) =>
        Rule.max(50).warning(
          "Longer titles may be truncated by search engines"
        ),
    }),
    defineField({
      name: "metaDescription",
      type: "string",
      title: "Meta Description",
      group: "meta",
      description: "Ideally between 50 and 150 characters.",
      validation: (Rule) =>
        Rule.max(150).warning(
          "Longer descriptions may be truncated by search engines"
        ),
    }),
    defineField({
      name: "metaImage",
      type: "image",
      group: "meta",
    }),

    defineField({
      name: "lighthouseCheck",
      type: "lighthouseButton",
      group: "meta",
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: "Home Page",
        subtitle: "/",
        media: HomeIcon,
      };
    },
  },
};
