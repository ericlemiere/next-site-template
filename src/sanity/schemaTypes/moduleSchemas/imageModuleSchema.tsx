import { richTextOptions } from "@/utils/helpers/richTextOptions";
import { ImageIcon } from "@sanity/icons/Image";
import { defineField } from "sanity";
import { SANITY_COLORS } from "@/utils/constants/colors";

export default defineField({
  name: "imageModule",
  title: "Image",
  type: "object",
  icon: ImageIcon,
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

    // Call To Action
    defineField({
      name: "cta",
      title: "Image Call To Action",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Link", value: "link" },
          { title: "Modal", value: "modal" },
        ],
        layout: "radio",
      },
      initialValue: "none",
      description:
        "Add a link to the image, or open a modal window (pop up) when the image is clicked",
      hidden: ({ parent }) => !parent?.image,
    }),

    // Link
    defineField({
      name: "imageLink",
      title: "Image Link",
      type: "link",
      hidden: ({ parent }) => parent?.cta !== "link" || !parent?.image,
    }),

    // Modal
    defineField({
      name: "modalTitle",
      title: "Modal Title",
      type: "string",
      hidden: ({ parent }) => parent?.cta !== "modal" || !parent?.image,
    }),
    defineField({
      name: "modalBody",
      title: "Modal Body",
      type: "array",
      of: richTextOptions({
        imagesOn: true,
        youtubeOn: true,
        stylesOn: true,
        buttonsOn: true,
        useSimpleImage: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
      hidden: ({ parent }) => parent?.cta !== "modal" || !parent?.image,
    }),
  ],
  preview: {
    select: {
      image: "image",
      altText: "alt",
      cta: "cta",
    },
    prepare(selection) {
      const { altText, image, cta } = selection;
      return {
        media: image || ImageIcon,
        subtitle: "Image" + (cta === "link" ? ` With Link` : ""),
        title: altText || "Image (no alt text)",
      };
    },
  },
});
