import { COLOR } from "../constants/colors";

export const defaultButton = {
  buttonStyle: "Solid",
  anchorLink: null,
  downloadLink: null,
  target: "_self",
  linkType: "internalLink",
  text: "Home Page",
  externalLink: null,
  _type: "button",
  name: "Home Button",
  // TODO: Update background color to brand color
  buttonColor: COLOR.PRIMARY,
  internalLink: { slug: { current: "/" } },
};

export const image = {
  image: {
    _type: "sandboxImage",
  },
  _type: "sandboxImage",
};

export const logoItem = {
  image: image,
  _type: "logoItem",
};

export const blogPost = (tagName: string) => {
  return {
    heroImage: image,
    slug: {
      _type: "slug",
      current: "/",
    },
    author: {
      _type: "blogAuthor",
      name: "Author Name",
    },
    authorImage: null,
    tags: [
      {
        tagName: tagName,
      },
    ],
    datePublished: null,
    title: "Post Title",
    thumbnailImage: image,
  };
};

export const customBlock = (text: string) => {
  return {
    style: "normal",
    _key: "2b3bee7c4125",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: text,
        _key: "95c078f6f7c50",
      },
    ],
    _type: "block",
  };
};

export const block = (seed: number) => {
  let text = "";
  switch (seed) {
    case 1:
      text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      break;
    case 2:
      text =
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      break;
    case 3:
      text =
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
      break;
    case 4:
      text =
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      break;
    default:
      text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      break;
  }
  return {
    style: "normal",
    _key: "2b3bee7c4125",
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text: text,
        _key: "95c078f6f7c50",
      },
    ],
    _type: "block",
  };
};

export const contactFields = [
  { fieldType: "text", label: "Name", options: null },

  { fieldType: "email", label: "Email", options: null },

  { fieldType: "phone", label: "Phone", options: null },

  {
    fieldType: "dropdown",
    label: "Dropdown Selection",
    options: ["Yes Please", "No Thank You.", "Maybe Later"],
  },

  {
    fieldType: "checkbox",
    label: "Checkbox Selection",
    options: ["Option 1", "Option 2", "Option 3"],
  },

  {
    fieldType: "textarea",
    isRequired: false,
    label: "Text Area",
    options: null,
  },
];
