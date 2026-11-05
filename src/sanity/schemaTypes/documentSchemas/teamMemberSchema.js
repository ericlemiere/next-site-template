import { UserIcon } from "@sanity/icons/User";
import { richTextOptions } from "../../../utils/helpers/richTextOptions";
import { createSlugField } from "../../../sanity/lib/createSlugField";

const teamMemberSchema = {
  name: "teamMember",
  type: "document",
  title: "Team Member",
  icon: UserIcon,
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      description: "Image will render at 3:4 aspect ratio",
      options: {
        hotspot: { previews: [] },
        metadata: ["lqip"],
      },
    },
    {
      name: "personName",
      type: "string",
      title: "Person's Name",
    },
    {
      name: "position",
      type: "string",
      title: "Title/Position",
    },

    {
      name: "slug",
      type: "slug",
      ...createSlugField({ source: "personName", prefix: "our-team" }),
    },

    {
      name: "bio",
      type: "array",
      title: "Bio",
      of: richTextOptions({
        imagesOn: true,
        youtubeOn: true,
        stylesOn: true,
        socialIconsOn: true,
      }),
    },

    {
      name: "emailAddress",
      type: "string",
      title: "Email Address",
    },

    {
      name: "phoneNumber",
      type: "string",
      title: "Phone Number",
      description: "Must follow this format: (###) ###-####",
      validation: (Rule) =>
        Rule.custom((phoneNumber) => {
          if (!phoneNumber) {
            return true;
          }

          const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

          if (!phoneNumberRegex.test(phoneNumber)) {
            return "Phone number must follow the format: (###) ###-####";
          } else {
            return true;
          }
        }),
    },

    {
      title: "Social Media",
      name: "socialIcons",
      type: "array",
      of: [{ type: "socialMediaIcons" }],
    },
  ],

  preview: {
    select: {
      title: "personName",
      subtitle: "position",
      media: `image`,
    },
    prepare: (value) => {
      const { title, subtitle, media } = value;
      return {
        title,
        subtitle,
        media: media || UserIcon,
      };
    },
  },
};

export default teamMemberSchema;
