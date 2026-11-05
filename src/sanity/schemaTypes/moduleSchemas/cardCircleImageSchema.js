import { TbPhotoCircle } from "react-icons/tb";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";

const cardCircleImageSchema = {
  name: "cardCircleImage",
  type: "object",
  title: "Circle Image Card",
  icon: TbPhotoCircle,
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
      name: "body",
      type: "array",
      title: "Body",
      of: richTextOptions({}),
    },
    {
      name: "button",
      type: "button",
      title: "Button",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image.image",
    },
    prepare: (value) => {
      const { title, media } = value;
      return {
        title: title || "Card",
        media: media || TbPhotoCircle,
        subtitle: "Circle Image Card",
      };
    },
  },
};

export default cardCircleImageSchema;
