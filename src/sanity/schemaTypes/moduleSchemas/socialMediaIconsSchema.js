import { IoLogoYoutube, IoLogoVimeo } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { GrLinkedin, GrInstagram } from "react-icons/gr";
import { FaFacebookSquare, FaPinterest, FaTiktok } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";

// Map icon string values to icon components
const iconMap = {
  Bluesky: FaBluesky,
  Facebook: FaFacebookSquare,
  Instagram: GrInstagram,
  LinkedIn: GrLinkedin,
  Pinterest: FaPinterest,
  TikTok: FaTiktok,
  Vimeo: IoLogoVimeo,
  X: RiTwitterXFill,
  YouTube: IoLogoYoutube,
};

const socialMediaIconsSchema = {
  name: "socialMediaIcons",
  title: "Social Media Icons",
  type: "object",
  fields: [
    {
      name: "iconType",
      type: "string",
      title: "Icon",
      options: {
        list: [
          { title: "Bluesky", value: "Bluesky" },
          { title: "Facebook", value: "Facebook" },
          { title: "Instagram", value: "Instagram" },
          { title: "LinkedIn", value: "LinkedIn" },
          { title: "Pinterest", value: "Pinterest" },
          { title: "TikTok", value: "TikTok" },
          { title: "Vimeo", value: "Vimeo" },
          { title: "X", value: "X" },
          { title: "YouTube", value: "YouTube" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      type: "url",
      title: "Link URL",
      description: "Link must start with https:// or http://",
    },
  ],
  preview: {
    select: {
      title: "link",
      iconType: "iconType",
    },
    prepare: (value) => {
      const { title, iconType } = value;
      return {
        title,
        subtitle: `${iconType} Icon`,
        media: iconMap[iconType],
      };
    },
  },
};

export default socialMediaIconsSchema;
