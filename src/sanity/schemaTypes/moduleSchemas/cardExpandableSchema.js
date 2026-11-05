import { RxCardStackPlus } from "react-icons/rx";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";

const cardExpandableSchema = {
  name: "cardExpandable",
  type: "object",
  title: "Image & Text Card - Expandable",
  icon: RxCardStackPlus,
  fields: [
    {
      name: "image",
      type: "imageSimple",
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "subtitle",
      type: "string",
      title: "Subtitle",
    },
    {
      name: "body",
      type: "array",
      title: "Body",
      description:
        "This is the text that is hidden until the card is expanded.",
      of: richTextOptions({}),
    },
  ],

  preview: {
    select: {
      title: "title",
      media: `image.image`,
    },
    prepare: (value) => {
      const { title, media } = value;
      return {
        title,
        subtitle: "Expandable Card",
        media: media || RxCardStackPlus,
      };
    },
  },
};

export default cardExpandableSchema;
