import { TfiAnnouncement } from "react-icons/tfi";

const headerBannerSchema = {
  name: "headerBanner",
  type: "document",
  title: "Header Banner",
  icon: TfiAnnouncement,
  fields: [
    {
      name: "name",
      type: "string",
      title: "Section Name",
      description:
        "This field is used for organization only and will not display on site.",
    },
    {
      name: "links",
      type: "array",
      title: "Link(s)",
      of: [{ type: "link" }],
    },
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare: (value) => {
      const { name } = value;
      return {
        title: name || "Announcement Banner",
        subtitle: "Announcement Banner",
        media: TfiAnnouncement,
      };
    },
  },
};

export default headerBannerSchema;
