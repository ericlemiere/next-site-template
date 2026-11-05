import { FaUserPen } from "react-icons/fa6";

const blogAuthorSchema = {
  name: "blogAuthor",
  type: "document",
  title: "Author",
  icon: FaUserPen,
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "imageSimple",
      title: "Image",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image.image",
    },
    prepare: (value) => {
      const { title, media } = value;
      return { title, subtitle: "Author", media: media || FaUserPen };
    },
  },
};

export default blogAuthorSchema;
