import { richTextOptions } from "@/utils/helpers/richTextOptions";
import { CustomMessageDisplay } from "@/sanity/components/CustomMessageDisplay";

const pageNotFoundSchema = {
  name: "pageNotFound",
  type: "document",
  title: "Page Not Found",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: richTextOptions({
        imagesOn: true,
        stylesOn: true,
        listsOn: true,
        textColorOn: true,
        linksOn: true,
      }),
    },
    {
      name: "pleaseNote",
      title: " ",
      type: "string",
      placeholder:
        'A "Back To Home Page" button will be added below the Body automatically.',
      components: { input: CustomMessageDisplay },
    },
  ],
};

export default pageNotFoundSchema;
