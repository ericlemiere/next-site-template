import { defineType } from "sanity";
import { FcGoogle } from "react-icons/fc";

export default defineType({
  name: "googleAnalytics",
  type: "document",
  title: "Analytics & Tracking",
  icon: FcGoogle,
  fields: [
    {
      name: "title",
      type: "string",
      hidden: true,
      initialValue: "Analytics & Tracking",
    },
    {
      name: "gaId",
      title: "Google Analytics ID",
      type: "string",
      description: "Format: G-XXXXXXXXXX",
    },
    {
      name: "gtmId",
      title: "Google Tag Manager ID",
      type: "string",
      description: "Format: GTM-XXXXXXX",
    },
  ],
});
