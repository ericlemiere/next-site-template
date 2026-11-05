import { PortableText } from "@portabletext/react";
import Link from "next/link";

import { Text } from "@/modules/Text";
import { Image } from "@/modules/Image";
import { SanityButton } from "@/modules/SanityButton";
import { SocialIcons } from "@/modules/SocialIcons";
import { AnchorLinkClient } from "../AnchorLinkClient";

import { tagSetter } from "../Text/Text";
import { cleanString } from "@/utils/helpers/string-helpers";
import { COLOR } from "@/utils/constants/colors";

export const RichText = ({
  data,
  size = "body1",
  color,
  tag,
  textAlignment = "left",
  id = "",
  className = "",
  imageSizes,
  disableScrollAnimation = false,
  backgroundColor = "transparent",
}) => {
  if (!data) return null;

  // Filter out any blocks with undefined or missing _type
  const sanitizedData = Array.isArray(data)
    ? data.filter((block) => {
        if (!block || !block._type || block._type === "undefined") {
          console.warn("[RichText] Block with undefined _type:", block);
          return false;
        }
        return true;
      })
    : data;

  const linkClass = `${backgroundColor === COLOR.PRIMARY ? "text-inherit" : "text-primary"} underline decoration-1 underline-offset-3 decoration-inherit transition-all duration-150 ease-in-out hover:underline-offset-5 hover:decoration-2`;

  // Helper to extract tag and color from markDefs
  const getMarkDefValues = (markDefs, color) => {
    const headingDef = markDefs?.find((def) => def?._type === "headingTag");
    const colorDef = markDefs?.find((def) => def?._type === "textColor");
    return {
      tag: headingDef?.titleHeadingTag || "p",
      inlineColor: colorDef?.value || cleanString(color),
    };
  };

  // Generic heading renderer
  const createHeadingRenderer = (headingSize) => {
    const HeadingComponent = (props) => {
      const { tag, inlineColor } = getMarkDefValues(
        props?.value?.markDefs,
        color,
      );
      return (
        <Text
          tag={tag}
          size={headingSize}
          color={inlineColor}
          id={id}
          className={className}
        >
          {props.children}
          <br />
        </Text>
      );
    };
    HeadingComponent.displayName = `RichTextHeading_${headingSize}`;
    return HeadingComponent;
  };

  const portableTextComponents = {
    types: {
      insertImage: (props) => (
        <div className="w-full relative">
          <div className="overflow-hidden rounded-lg w-full">
            <Image image={props.value} sizes={imageSizes} />
          </div>
        </div>
      ),
      youtube: (props) => (
        <div className="relative overflow-auto w-full h-full aspect-video">
          <div
            className="[&>iframe]:absolute [&>iframe]:top-0 [&>iframe]:left-0 [&>iframe]:right-0 [&>iframe]:bottom-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-none"
            dangerouslySetInnerHTML={{ __html: props.value.youtubeEmbed }}
          />
        </div>
      ),
      insertButton: (props) => {
        const justifyString =
          textAlignment === "center"
            ? "justify-center"
            : textAlignment === "right"
              ? "justify-end"
              : "justify-start";
        return (
          <div className={`w-full flex ${justifyString}`}>
            <SanityButton data={props?.value?.button} />
          </div>
        );
      },
      socialIconsBlock: (props) => (
        <SocialIcons
          data={props?.value?.icons}
          color={cleanString(props?.value?.iconsColor)}
          alignment={textAlignment}
          disableScrollAnimation={disableScrollAnimation}
        />
      ),
      undefined: () => null, // Gracefully handle undefined types
    },
    unknownType: () => null, // Catch-all for any unknown types
    block: {
      h1: createHeadingRenderer(size),
      h2: createHeadingRenderer("heading2"),
      h3: createHeadingRenderer("heading3"),
      h4: createHeadingRenderer("heading4"),
      h5: createHeadingRenderer("heading5"),
      h6: createHeadingRenderer("heading6"),
      blockquote: (props) => (
        <div className="w-[90%] my-5">
          <Text
            tag="blockquote"
            size="body1"
            color={cleanString(color)}
            id={id}
            className={className}
          >
            {props.children}
            <br />
          </Text>
        </div>
      ),
      normal: (props) => {
        const { tag: headingTagFromData, inlineColor } = getMarkDefValues(
          props?.value?.markDefs,
          color,
        );
        const htmlTag = headingTagFromData || tag || tagSetter(size);
        return (
          <Text
            tag={htmlTag}
            size={size}
            color={inlineColor}
            id={id}
            className={className}
          >
            {props.children}
            <br />
          </Text>
        );
      },
    },

    list: {
      bullet: (props) => (
        <Text
          tag="ul"
          size={size}
          color={cleanString(color)}
          className={`${textAlignment !== "left" ? "list-inside" : "list-outside ml-clamp-20"} [&>li]:pb-3 [&>li:last-child]:pb-0`}
        >
          {props.children}
        </Text>
      ),
      number: (props) => (
        <Text
          tag="ol"
          size={size}
          color={cleanString(color)}
          className={`${textAlignment !== "left" ? "list-inside" : "list-outside ml-clamp-20"} [&>li]:pb-3 [&>li:last-child]:pb-0`}
        >
          {props.children}
        </Text>
      ),
    },

    marks: {
      textColor: ({ children, value }) => {
        const color = value?.value;
        if (!color) return children;
        return (
          <span style={{ color: color }} className="inline">
            {children}
          </span>
        );
      },
      headingTag: ({ children }) => {
        return children;
      },
      linkObject: ({ children, value }) => {
        if (!value) return children;
        switch (value?.linkType) {
          case "internalLink":
            if (!value?.slug) return children;
            return (
              <Link href={value?.slug} passHref>
                <span className={linkClass}>{children}</span>
              </Link>
            );
          case "externalLink":
            if (!value?.href) return children;
            return (
              <a href={value?.href} target="_blank" rel="noreferrer noopener">
                <span className={linkClass}>{children}</span>
              </a>
            );
          case "anchorLink":
            if (!value?.anchorTag) return children;
            return (
              <AnchorLinkClient
                link={value.anchorTag}
                childClassName={linkClass}
              >
                {children}
              </AnchorLinkClient>
            );
          case "downloadLink":
            if (!value?.file?.asset?.url) return children;
            return (
              <a
                href={value?.file?.asset?.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={linkClass}>{children}</span>
              </a>
            );
          default:
            return <span className="text-inherit">{children}</span>;
        }
      },
    },
  };

  return (
    <PortableText value={sanitizedData} components={portableTextComponents} />
  );
};
