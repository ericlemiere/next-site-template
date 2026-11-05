import { ImageIcon } from "@sanity/icons/Image";
import { FaMapPin } from "react-icons/fa6";
import ColorSelector from "../../components/ColorSelector";
import { COLOR, defaultColorOptions } from "../../../utils/constants/colors";

const hotspotImageSchema = {
  name: "hotspotImage",
  type: "document",
  title: "Hotspot Image",
  icon: ImageIcon,
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      description: "For organization only. Will not display on site.",
    },

    {
      name: "image",
      type: "imageSimple",
      title: "Image",
    },

    {
      name: "backgroundColor",
      type: "string",
      title: "Hotspot Color",
      options: { list: defaultColorOptions },
      components: { input: ColorSelector },
      initialValue: COLOR.WHITE,
    },

    {
      name: `hotspots`,
      type: `array`,
      of: [
        {
          name: "spot",
          type: "object",
          fieldsets: [{ name: "position", options: { columns: 2 } }],
          fields: [
            { name: "details", type: "text", rows: 2 },
            {
              name: "x",
              type: "number",
              readOnly: true,
              fieldset: "position",
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
            {
              name: "y",
              type: "number",
              readOnly: true,
              fieldset: "position",
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
          preview: {
            select: {
              title: "details",
              x: "x",
              y: "y",
            },
            prepare({ title, x, y }) {
              return {
                title,
                subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
                media: FaMapPin,
              };
            },
          },
        },
      ],
      options: {
        // plugin adds support for this option
        imageHotspot: {
          // see `Image and description path` setup below
          imagePath: `image.image`,
          descriptionPath: `details`,
          // see `Custom tooltip` setup below
          tooltip: undefined,
        },
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      title: "image.alt",
      media: "image.image",
    },
    prepare: (value) => {
      const { media, title, name } = value;

      return {
        title: name || title || "(no alt text)",
        subtitle: "Hotspot Image",
        media: media || ImageIcon,
      };
    },
  },
};

export default hotspotImageSchema;
