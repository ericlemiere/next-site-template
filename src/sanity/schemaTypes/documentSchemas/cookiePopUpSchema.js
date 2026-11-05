import { richTextOptions } from "../../../utils/helpers/richTextOptions";

const cookiePopUpSchema = {
  name: "cookiePopUp",
  type: "document",
  title: "Cookie Pop Up",
  fields: [
    {
      name: "body",
      title: "Pop Up Text",
      type: "array",
      of: richTextOptions({ listsOn: false }),
      description:
        "This is the cookie pop up that appears on the website. Leave blank if you do not want a cookie pop up.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Cookie Pop Up",
      };
    },
  },
};

export default cookiePopUpSchema;
