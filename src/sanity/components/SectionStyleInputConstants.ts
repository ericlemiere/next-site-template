import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import {
  TbLayoutAlignLeftFilled,
  TbLayoutAlignCenterFilled,
  TbLayoutAlignRightFilled,
} from "react-icons/tb";

import {
  defaultBackgroundColorOptions,
  defaultTextColorOptions,
  defaultOverlayOptions,
} from "@/utils/constants/colors";

// TODO: update text sizes
export const DEFAULT_TEXT_SIZES = [
  { title: "Heading 1 - 60pt", value: "heading1" },
  { title: "Heading 2 - 48pt", value: "heading2" },
  { title: "Heading 3 - 36pt", value: "heading3" },
  { title: "Heading 4 - 24pt", value: "heading4" },
  { title: "Heading 5 - 20pt", value: "heading5" },
  { title: "Body 1 - 16pt", value: "body1" },
  { title: "Body 2 - 16pt", value: "body2" },
];

export const DEFAULT_TITLE_SIZES = DEFAULT_TEXT_SIZES.slice(0, 5);
export const DEFAULT_SUBTITLE_SIZES = DEFAULT_TEXT_SIZES.slice(1, 7);
export const DEFAULT_BODY_SIZES = DEFAULT_TEXT_SIZES.slice(1, 7);

export const ALIGN_OPTIONS = [
  { key: "left", icon: FaAlignLeft, label: "Left Align" },
  { key: "center", icon: FaAlignCenter, label: "Center Align" },
  { key: "right", icon: FaAlignRight, label: "Right Align" },
];

export const COLUMN_ALIGN_OPTIONS = [
  { key: "left", icon: TbLayoutAlignLeftFilled, label: "Left Align" },
  { key: "center", icon: TbLayoutAlignCenterFilled, label: "Center Align" },
  { key: "right", icon: TbLayoutAlignRightFilled, label: "Right Align" },
];

export const FIELD_CONFIG = [
  {
    key: "backgroundColor",
    type: "swatch",
    label: "Background Color",
    options: defaultBackgroundColorOptions,
  },
  {
    key: "overlayColor",
    type: "swatch",
    label: "Overlay Color",
    options: [{ title: "None", value: "transparent" }].concat(
      defaultOverlayOptions,
    ),
  },
  {
    key: "titleTextColor",
    type: "swatch",
    label: "Title Text Color",
    options: defaultTextColorOptions,
  },
  {
    key: "subtitleTextColor",
    type: "swatch",
    label: "Subtitle Text Color",
    options: defaultTextColorOptions,
  },
  {
    key: "bodyTextColor",
    type: "swatch",
    label: "Body Text Color",
    options: defaultTextColorOptions,
  },
  {
    key: "titleTextSize",
    type: "select",
    label: "Title Text Size",
    options: DEFAULT_TITLE_SIZES,
  },
  {
    key: "titleHeadingTag",
    type: "select",
    label: "Title Heading Tag",
    options: [
      { title: "", value: "" },
      { title: "h1", value: "h1" },
      { title: "h2", value: "h2" },
      { title: "h3", value: "h3" },
      { title: "h4", value: "h4" },
      { title: "h5", value: "h5" },
      { title: "h6", value: "h6" },
      { title: "p", value: "p" },
    ],
    description:
      "For SEO purposes. HTML tag defaults to match the selected text size if nothing is specified here.",
  },
  {
    key: "subtitleTextSize",
    type: "select",
    label: "Subtitle Text Size",
    options: DEFAULT_SUBTITLE_SIZES,
  },
  {
    key: "bodyTextSize",
    type: "select",
    label: "Body Text Size",
    options: DEFAULT_BODY_SIZES,
  },
  {
    key: "textAlignment",
    type: "select",
    label: "Text Alignment",
    options: [
      { title: "Left", value: "left" },
      { title: "Center", value: "center" },
      { title: "Right", value: "right" },
    ],
  },
  {
    key: "columnAlignment",
    type: "select",
    label: "Column Alignment",
    options: [
      { title: "Left", value: "left" },
      { title: "Center", value: "center" },
      { title: "Right", value: "right" },
    ],
  },
  {
    key: "paddingTop",
    type: "select",
    label: "Padding Top",
    options: [
      { title: "None", value: "none" },
      { title: "Small", value: "small" },
      { title: "Default", value: "default" },
      { title: "Large", value: "large" },
    ],
    description: "The amount of space to apply to the top of the section.",
  },
  {
    key: "paddingBottom",
    type: "select",
    label: "Padding Bottom",
    options: [
      { title: "None", value: "none" },
      { title: "Small", value: "small" },
      { title: "Default", value: "default" },
      { title: "Large", value: "large" },
    ],
    description: "The amount of space to apply to the bottom of the section.",
  },
];

export const COLOR_KEYS = [
  "backgroundColor",
  "titleTextColor",
  "subtitleTextColor",
  "bodyTextColor",
  "overlayColor",
];

export const TEXT_KEYS = [
  "titleTextSize",
  "titleHeadingTag",
  "subtitleTextSize",
  "bodyTextSize",
  "textAlignment",
  "columnAlignment",
];

export const PADDING_KEYS = ["paddingTop", "paddingBottom"];
