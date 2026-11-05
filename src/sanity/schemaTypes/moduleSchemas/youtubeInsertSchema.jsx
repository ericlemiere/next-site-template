import { FaYoutube } from "react-icons/fa6";
export default {
  name: "youtubeInsert",
  type: "object",
  title: "YouTube Video Insert",
  icon: FaYoutube,

  fields: [
    // ========================================= CONTENT
    {
      name: "name",
      type: "string",
      title: "Section Name",
      description: "Will not be displayed. For organization only.",
    },
    {
      name: "youtubeEmbed",
      type: "text",
      title: "YouTube Embed Code",
      description: (
        <div>
          Paste the embed code from YouTube here.
          <p>
            This can be found by going to the YouTube page and clicking:
            <br />
            Share &rarr; Embed &rarr; Copy
          </p>
        </div>
      ),
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare: (value) => {
      const { title } = value;
      return {
        title: title || "YouTube Video",
        subtitle: "YouTube Embed",
        media: FaYoutube,
      };
    },
  },
};
