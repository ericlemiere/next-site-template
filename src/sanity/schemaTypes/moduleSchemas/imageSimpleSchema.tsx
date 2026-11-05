import { ImageIcon } from "@sanity/icons/Image";
import { defineField } from "sanity";
import { SANITY_COLORS } from "@/utils/constants/colors";

export default defineField({
  name: "imageSimple",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  options: {
    collapsed: false,
    collapsible: false,
  },
  fields: [
    // Image
    defineField({
      name: "image",
      title: "Image File",
      type: "image",
      options: {
        hotspot: { previews: [] },
        metadata: ["lqip"],
      },
    }),
    // Alt Text
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "text",
      rows: 2,
      hidden: ({ parent }) => !parent?.image && !parent?.alt,
      description: (
        <div>
          <div
            style={{
              margin: "8px 0px",
              border: `1px solid ${SANITY_COLORS.WARNING}`,
              padding: "2px 4px",
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            Recommended
          </div>
          <details>
            <summary>What is Alt Text?</summary>
            <div>
              The Alt Text serves as a description that is displayed if the
              image fails to load. It is crucial for accessibility, as it
              provides context for visually impaired users using screen readers,
              and it also enhances SEO by helping search engines understand the
              content of the image.
            </div>
          </details>
        </div>
      ),
    }),
  ],
  preview: {
    select: {
      image: "image",
      altText: "alt",
    },
    prepare(selection) {
      const { altText, image } = selection;
      return {
        media: image || ImageIcon,
        subtitle: "Image",
        title: altText || "Image (no alt text)",
      };
    },
  },
});
