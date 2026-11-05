import { BsCardHeading } from "react-icons/bs";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";

const cardSchema = {
  name: "card",
  type: "object",
  title: "Image & Text Card",
  icon: BsCardHeading,
  fields: [
    {
      name: "image",
      type: "imageSimple",
    },
    {
      name: "title",
      title: "Card Title",
      type: "array",
      of: richTextOptions({
        oneLine: true,
        listsOn: false,
        linksOn: false,
        decoratorsOn: false,
        headingTagOn: true,
      }),
    },
    {
      name: "subtitle",
      title: "Card Subtitle",
      type: "array",
      of: richTextOptions({ oneLine: true, listsOn: false, linksOn: false }),
    },
    {
      name: "body",
      title: "Card Body",
      type: "array",
      of: richTextOptions({ socialIconsOn: true }),
    },
    {
      name: "button",
      type: "button",
      title: "Button ",
    },
  ],
  preview: {
    select: {
      title: "title.0.children.0.text",
      media: "image.image",
    },
    prepare: (value) => {
      const { title, media } = value;
      return {
        title: title || "Card",
        media: media || BsCardHeading,
        subtitle: "Card",
      };
    },
  },
};

export default cardSchema;
