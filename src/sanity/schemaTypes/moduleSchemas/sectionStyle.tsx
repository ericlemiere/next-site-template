import { defineType } from "sanity";
import SectionStyleInput from "@/sanity/components/SectionStyleInput";

export const sectionStyle = defineType({
  name: "sectionStyle",
  title: "Section Style",
  type: "object",
  fields: [
    { name: "backgroundColor", type: "string", title: "Background Color" },
    { name: "overlayColor", type: "string", title: "Overlay Color" },
    { name: "titleTextColor", type: "string", title: "Title Text Color" },
    { name: "titleTextSize", type: "string", title: "Title Text Size" },
    { name: "titleHeadingTag", type: "string", title: "Title Heading Tag" },
    { name: "subtitleTextColor", type: "string", title: "Subtitle Text Color" },
    { name: "subtitleTextSize", type: "string", title: "Subtitle Text Size" },
    { name: "bodyTextColor", type: "string", title: "Body Text Color" },
    { name: "bodyTextSize", type: "string", title: "Body Text Size" },
    { name: "textAlignment", type: "string", title: "Text Alignment" },
    { name: "columnAlignment", type: "string", title: "Column Alignment" },
    { name: "paddingTop", type: "string", title: "Padding Top" },
    { name: "paddingBottom", type: "string", title: "Padding Bottom" },
  ],
  components: {
    input: SectionStyleInput,
  },
});
