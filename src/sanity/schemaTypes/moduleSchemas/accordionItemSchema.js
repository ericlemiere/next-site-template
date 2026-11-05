import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { MdExpand } from "react-icons/md";
const accordionItemSchema = {
  name: "accordionItem",
  type: "object",
  title: "Accordion Item",
  icon: MdExpand,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "body",
      type: "array",
      title: "Body",
      of: richTextOptions({
        imagesOn: true,
        youtubeOn: true,
        buttonsOn: true,
        socialIconsOn: true,
      }),
    },
  ],
};

export default accordionItemSchema;
