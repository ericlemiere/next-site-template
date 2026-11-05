export default {
  name: "globalMetadata",
  type: "object",
  title: "Meta Content",
  fields: [
    {
      name: "metaTitle",
      type: "string",
      title: "Global Meta Title",
      description: (
        <div>
          This will be appended to each page's navigation name.
          <div> Ex: About Us | Global Meta Title</div>
        </div>
      ),
    },
    {
      name: "metaDescription",
      type: "string",
      title: "Global Meta Description",
      description: `This is a fallback description for each page if no description is provided for that page. 
      Ideally between 70 and 160 characters.`,
    },
    {
      name: "metaImage",
      type: "image",
      title: "Meta Image",
      description:
        "This image will be used for the entire site if no other image is provided for an individual page Meta tab.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Global Meta Settings",
      };
    },
  },
};
