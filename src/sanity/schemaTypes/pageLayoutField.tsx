import { defineField } from "sanity";

export const pageLayoutField = ({ isPostPage = false }) => {
  const pageArray = [
    { type: "audioPlayer" },
    { type: "cardGrid" },
    { type: "codeEmbed" },
    { type: "eventCalendar" },
    { type: "flexColumns" },
    ...(isPostPage ? [] : [{ type: "heroImage" }]),
    { type: "imageAndTextSection" },
    { type: "imageCarousel" },
    { type: "imageHotspot" },
    { type: "imageSection" },
    { type: "logoGrid" },
    { type: "popUp" },
    { type: "blogPostGrid" },
    { type: "scrollingText" },
    { type: "tabbedSection" },
    ...(isPostPage ? [] : [{ type: "teamGrid" }]),
    { type: "textAccordion" },
    { type: "textSection" },
    { type: "richTextSection" },
    ...(isPostPage ? [] : [{ type: "contactForm" }]),
    ...(isPostPage ? [] : [{ type: "newsletterForm" }]),
    { type: "videoMux" },
    { type: "videoVimeo" },
    { type: "videoYouTube" },
  ];

  return defineField({
    name: "pageLayout",
    type: "array",
    title: "Page Layout",
    group: "content",
    of: pageArray,
    options: {
      insertMenu: {
        filter: false,
        groups: [
          {
            name: "images",
            title: "Images",
            of: [
              "cardGrid",
              "flexColumns",
              "heroImage",
              "imageAndTextSection",
              "imageCarousel",
              "imageHotspot",
              "imageSection",
              "logoGrid",
              "popUp",
              "richTextSection",
              "teamGrid",
              "tabbedSection",
            ],
          },
          {
            name: "text",
            title: "Text",
            of: [
              "flexColumns",
              "imageAndTextSection",
              "popUp",
              "richTextSection",
              "textAccordion",
              "textSection",
              "scrollingText",
              "tabbedSection",
            ],
          },
          {
            name: "grids",
            title: "Grids",
            of: [
              "blogPostGrid",
              "cardGrid",
              "eventCalendar",
              "logoGrid",
              "teamGrid",
            ],
          },
          {
            name: "audioVideo",
            title: "Audio & Video",
            of: [
              "audioPlayer",
              "videoMux",
              "videoYouTube",
              "videoVimeo",
              "codeEmbed",
            ],
          },
          {
            name: "forms",
            title: "Forms",
            of: ["contactForm", "newsletterForm"],
          },

          {
            name: "plugins",
            title: "Plugins",
            of: ["contactForm", "videoMux", "newsletterForm"],
          },
        ],
        views: [
          {
            name: "grid",
            previewImageUrl: (schemaTypeName) => {
              //TODO: Add schema type names here for preview images that exist in /public/static/
              const typesWithImages: string[] = [
                "videoMux",
                "videoYouTube",
                "videoVimeo",
                "contactForm",
                "newsletterForm",
              ];

              return typesWithImages.includes(schemaTypeName)
                ? `/static/${schemaTypeName}.png`
                : undefined;
            },
          },
          { name: "list" },
        ],
      },
    },
  });
};
