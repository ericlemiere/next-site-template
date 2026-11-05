// =============================================================================
// Rich Text Options
// =============================================================================

import type { SchemaTypeDefinition } from "sanity";
import { SocialMediaIcons } from "../../../sanity.types";
import ColorSelector from "../../sanity/components/ColorSelector";
import { richTextLinks, richTextHeadingTag } from "./richTextAnnotations";
import { defaultRichTextOptions } from "./richTextDefaultTextOptions";
import {
  defaultColorOptions,
  buttonColorInitialValue,
} from "../constants/colors";

import { PiCursorClick } from "react-icons/pi";
import { IoShareSocial } from "react-icons/io5";

interface RichTextOptionsConfig {
  listsOn?: boolean;
  linksOn?: boolean;
  stylesOn?: boolean;
  headingTagOn?: boolean;
  imagesOn?: boolean;
  useSimpleImage?: boolean;
  youtubeOn?: boolean;
  textColorOn?: boolean;
  buttonsOn?: boolean;
  oneLine?: boolean;
  decoratorsOn?: boolean;
  socialIconsOn?: boolean;
}

export const richTextOptions = ({
  listsOn = true,
  linksOn = true,
  stylesOn = false,
  headingTagOn = false,
  imagesOn = false,
  useSimpleImage = false,
  youtubeOn = false,
  textColorOn = false,
  buttonsOn = false,
  oneLine = false,
  decoratorsOn = true,
  socialIconsOn = false,
}: RichTextOptionsConfig): SchemaTypeDefinition[] => {
  const lists = listsOn
    ? [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ]
    : [];

  const annotations = [
    ...(linksOn ? richTextLinks : []),
    ...(stylesOn || headingTagOn ? richTextHeadingTag : []),
    ...(textColorOn ? [{ type: "textColor" }] : []),
  ];

  const styles = stylesOn ? defaultRichTextOptions : [];

  const imageInsert = imagesOn
    ? useSimpleImage
      ? {
          name: "insertImage",
          title: "Image",
          type: "imageSimple",
        }
      : {
          name: "insertImage",
          title: "Image",
          type: "imageModule",
        }
    : null;

  const youtubeInsert = youtubeOn
    ? {
        name: "youtube",
        title: "YouTube",
        type: "youtubeInsert",
      }
    : null;

  const buttonInsert = buttonsOn
    ? {
        name: "insertButton",
        title: "Button",
        type: "button",
        options: {
          useStandardComponent: true,
        },
        icon: PiCursorClick,
      }
    : null;

  const socialIconInsert = socialIconsOn
    ? {
        name: "socialIconsBlock",
        title: "Social Icons",
        type: "object",
        icon: IoShareSocial,
        fields: [
          {
            name: "icons",
            title: "Social Media Icons",
            type: "array",
            of: [{ type: "socialMediaIcons" }],
          },
          {
            name: "iconsColor",
            title: "Icons Color",
            type: "string",
            options: { list: defaultColorOptions },
            components: { input: ColorSelector },
            initialValue: buttonColorInitialValue,
          },
        ],
        preview: {
          select: {
            icons: "icons",
          },
          prepare(selection: { icons: SocialMediaIcons[] }) {
            const { icons } = selection;
            return {
              title: "Social Icons",
              subtitle: icons ? `Icons: ${icons.length}` : "No icons",
            };
          },
        },
      }
    : null;

  return [
    imageInsert,
    youtubeInsert,
    buttonInsert,
    socialIconInsert,
    {
      type: "block",
      lists: lists,
      marks: {
        annotations: annotations,
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ].filter(() => decoratorsOn),
      },
      styles: styles,
      options: { oneLine: oneLine },
    },
  ].filter(Boolean) as SchemaTypeDefinition[]; // Filter out null values
};
