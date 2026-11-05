import { FaAnchor } from "react-icons/fa";
import { AnchorTagLinkFormat } from "../../components/AnchorTagLinkFormat";

const anchorTagLinkSchema = {
  name: "anchorTagLink",
  type: "document",
  title: "Anchor Tag Link",
  icon: FaAnchor,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "This is for organization only.",
    },
    {
      name: "anchorTag",
      title: "Anchor Tag",
      type: "string",
      description: `The anchor tag can be used in a link or a button to link directly to a section of a page.`,
      validation: (Rule) =>
        Rule.custom((value) => {
          const regex = /^(\/[a-zA-Z0-9-_]+)?#[a-zA-Z0-9-_]+$/;

          if (!regex.test(value)) {
            return "The internal anchor link should match the format: /about#awards, or #awards if linking to a section on the home page.";
          }

          return true;
        }),
    },
    {
      name: "format",
      title: "How To Format",
      type: "string",
      components: { input: AnchorTagLinkFormat },
    },
  ],
  preview: {
    select: {
      name: "name",
      title: "anchorTag",
    },
    prepare: (value) => {
      const { name, title } = value;
      return { title: name || title, media: FaAnchor };
    },
  },
};

export default anchorTagLinkSchema;
