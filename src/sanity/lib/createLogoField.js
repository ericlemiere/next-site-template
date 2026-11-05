import { defineField } from "@sanity/types";

const ALLOWED_EXTENSIONS = ["svg", "png"];

/**
 * Reusable logo image field (SVG preferred, PNG allowed).
 * Leave empty on a document to fall back to the default logo in the codebase
 * (src/modules/Svg/svgs/logo.jsx).
 *
 * @param {{ group?: string }} [options]
 */
export const createLogoField = ({ group } = {}) =>
  defineField({
    name: "logo",
    title: "Logo",
    type: "image",
    group,
    description:
      "SVG preferred (sharpest at any size), PNG also accepted. Upload a tightly cropped logo with no extra padding around it. Any aspect ratio works: the logo is scaled to fit and aligned left. Leave empty to use the default logo.",
    options: {
      accept: "image/svg+xml,image/png",
    },
    fields: [
      {
        name: "alt",
        type: "string",
        title: "Alt Text",
        description: "Usually the company name.",
      },
    ],
    validation: (Rule) =>
      Rule.custom((value) => {
        const ref = value?.asset?._ref;
        if (!ref) return true;

        // Asset refs look like: image-<hash>-<width>x<height>-<ext>
        const extension = ref.split("-").pop();
        return ALLOWED_EXTENSIONS.includes(extension)
          ? true
          : "Logo must be an SVG or PNG file.";
      }),
  });
