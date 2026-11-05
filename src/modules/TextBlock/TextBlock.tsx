import { Text } from "@/modules/Text";
import { RichText } from "@/modules/RichText";
import { SanityButton } from "@/modules/SanityButton";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import type { SectionStyle, TextSection } from "../../../sanity.types";
import type { ExpandedButton } from "../SanityButton/SanityButton";
import { textAlignHelper, justifyHelper } from "@/utils/helpers/style-helpers";

interface TextBlockProps {
  title?: string;
  subtitle?: TextSection["subtitle"];
  body?: TextSection["body"];
  button?: TextSection["button"];
  sectionStyles: SectionStyle;
  className?: string;
  fadeDirection?: "left" | "right" | "up" | "in";
}

// This is a reusable Text Block component that can be used across the site
// so the spacing and styles are consistent.
export const TextBlock = ({
  title,
  subtitle,
  body,
  button,
  sectionStyles,
  className,
  fadeDirection = "in",
}: TextBlockProps) => {
  const {
    titleTextColor = "black",
    titleTextSize = "heading2",
    titleHeadingTag,
    subtitleTextColor = "black",
    subtitleTextSize = "heading4",
    bodyTextColor = "black",
    bodyTextSize = "body1",
    textAlignment = "left",
  } = sectionStyles;

  const hasTitle = Boolean(title) ? 1 : 0;
  const hasSubtitle = Boolean(subtitle) ? 1 : 0;
  const hasBody = Boolean(body) ? 1 : 0;
  const hasButton = Boolean(button?.text) ? 1 : 0;
  const totalElements = hasTitle + hasSubtitle + hasBody + hasButton;

  if (totalElements === 0) return null;

  const animationDelayIncrement = totalElements > 0 ? 0.075 : 0;
  const titleDelay = 0;
  const subtitleDelay = titleDelay + hasTitle * animationDelayIncrement;
  const bodyDelay = subtitleDelay + hasSubtitle * animationDelayIncrement;
  const buttonDelay = bodyDelay + hasBody * animationDelayIncrement;

  const textAlignString = textAlignHelper(textAlignment);
  const justifyString = justifyHelper(textAlignment);

  return (
    <div
      className={`text-block w-full flex flex-col mx-auto gap-y-clamp-30 ${textAlignString} ${className ?? ""}`}
    >
      {title && (
        <ScrollAnimation type={`fade-${fadeDirection}`}>
          <Text
            color={titleTextColor}
            size={titleTextSize}
            tag={
              titleHeadingTag as keyof React.JSX.IntrinsicElements | undefined
            }
            className="w-full m-auto"
          >
            {title}
          </Text>
        </ScrollAnimation>
      )}
      {subtitle && (
        <ScrollAnimation type={`fade-${fadeDirection}`} delay={subtitleDelay}>
          <RichText
            data={subtitle}
            size={subtitleTextSize}
            color={subtitleTextColor}
            className="w-full m-auto"
            tag="p"
            id={undefined}
            imageSizes={null}
          />
        </ScrollAnimation>
      )}
      {body && (
        <ScrollAnimation
          type={`fade-${fadeDirection}`}
          delay={bodyDelay}
          threshold={0.1}
        >
          <RichText
            data={body}
            size={bodyTextSize}
            color={bodyTextColor}
            className="w-full m-auto"
            textAlignment={textAlignment}
            tag="p"
            id={undefined}
            imageSizes={null}
          />
        </ScrollAnimation>
      )}
      {button?.text && (
        <ScrollAnimation type={`fade-${fadeDirection}`} delay={buttonDelay}>
          <div className={`flex ${justifyString}`}>
            <SanityButton data={button as ExpandedButton} />
          </div>
        </ScrollAnimation>
      )}
    </div>
  );
};
