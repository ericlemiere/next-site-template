import { DocumentIcon } from "@sanity/icons/Document";
import { SchemaIcon } from "@sanity/icons/Schema";
import { FaLightbulb } from "react-icons/fa";
import { createSlugField } from "@/sanity/lib/createSlugField";
import { pageLayoutField } from "../pageLayoutField";
import { defineField } from "sanity";
import { OgImagePreview } from "@/sanity/components/OgImagePreview";

const blogPostSchema = {
  name: "blogPost",
  type: "document",
  title: "Post",
  icon: FaLightbulb,
  groups: [
    {
      name: "content",
      title: "Page Content",
      icon: DocumentIcon,
      default: true,
    },
    {
      name: "meta",
      title: "Meta Settings",
      icon: SchemaIcon,
    },
  ],
  fields: [
    // ========================================= CONTENT
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
      ...createSlugField({ source: "title", prefix: "blog" }),
      group: "content",
    },

    pageLayoutField({ isPostPage: true }),

    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [
        {
          title: "Add Tag",
          type: "reference",
          to: [{ type: "blogTags" }],
          description: "Select a tag from the dropdown, or add a new one.",
        },
      ],
      description: "Tags are used for filtering on the site.",
      group: "content",
    },

    {
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "blogAuthor" }],
      group: "content",
    },

    {
      name: "datePublished",
      type: "date",
      title: "Date Published",
      group: "content",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "thumbnailImage",
      type: "imageSimple",
      title: "Thumbnail Image",
      description:
        "This should be a square image and will only be displayed in the grid section.",
      group: "content",
    },

    {
      name: "heroImage",
      type: "imageSimple",
      title: "Hero Image",
      description:
        "This is the hero image for the actual post page. Will render at a 16:9 aspect ratio.",
      group: "content",
    },

    defineField({
      name: "metaTitle",
      type: "placeholderString",
      title: "Meta Title",
      group: "meta",
      description:
        "Write an accurate and concise title that describes the page. Ideally between 14 and 50 characters. If empty, the post title will be used.",
      options: { field: "title" },
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
      name: "metaImageType",
      type: "number",
      title: "Meta Image Type",
      group: "meta",
      description: "Select the type of meta image to use for this post.",
      options: {
        list: [
          { title: "Default (Hero Image)", value: 0 },
          { title: "Custom Meta Image", value: 1 },
          { title: "Generate OG Image", value: 2 },
        ],
        layout: "radio",
      },
      initialValue: 0,
    }),

    defineField({
      name: "metaImage",
      type: "image",
      group: "meta",
      description: "Hero Image will be used if no Meta Image is provided.",
      title: "Custom Meta Image",
      hidden: ({ parent }) => parent?.metaImageType !== 1,
    }),

    defineField({
      name: "ogImagePreview",
      type: "string",
      title: "Open Graph Image",
      group: "meta",
      components: {
        input: OgImagePreview,
      },
      hidden: ({ parent }) => parent?.metaImageType !== 2,
    }),

    defineField({
      name: "ogTitle",
      type: "string",
      title: "OG Image Title",
      group: "meta",
      validation: (Rule) =>
        Rule.max(90).warning(
          "Titles longer than 90 characters may not fit well on the OG image"
        ),
      hidden: ({ parent }) => parent?.metaImageType !== 2,
    }),
    defineField({
      name: "ogBackgroundImage",
      type: "image",
      title: "OG Background Image",
      group: "meta",
      description:
        "Optional image that appears in the upper right corner of the OG image. 16:9 aspect ratio.",
      hidden: ({ parent }) => parent?.metaImageType !== 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "thumbnailImage.image",
      heroImage: "heroImage.image",
    },
    prepare: (value) => {
      const { title, author, media, heroImage } = value;
      return {
        title,
        subtitle: author ? `by ${author}` : "",
        media: media || heroImage || FaLightbulb,
      };
    },
  },
};

export default blogPostSchema;
