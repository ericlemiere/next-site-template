const footerSchema = {
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      initialValue: "Footer",
      readOnly: true,
      hidden: true,
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
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    },
    {
      name: "addressMapLink",
      type: "string",
      title: "Address Map Link",
    },
    {
      name: "socialIcons",
      type: "array",
      of: [{ type: "socialMediaIcons" }],
    },
    {
      name: "pageLayout",
      type: "array",
      title: "Link Layout",
      of: [
        {
          title: "Page",
          type: "reference",
          to: [{ type: "page" }],
          description: "Select a page from the dropdown, or add a new one.",
        },
        { type: "link" },
      ],
    },
  ],
};

export default footerSchema;
