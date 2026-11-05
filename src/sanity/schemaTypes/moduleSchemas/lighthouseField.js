import { defineType } from "sanity";
import { LighthouseButton } from "../../components/LighthouseButton";

export default defineType({
  name: "lighthouseButton",
  type: "object",
  title: "SEO Analysis",
  fields: [
    {
      name: "placeholder",
      type: "string",
    },
  ],
  components: {
    input: LighthouseButton,
  },
});
