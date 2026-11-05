import { SanityButton } from "@/modules/SanityButton";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Image } from "@/modules/Image";
import { RichText } from "@/modules/RichText";
import { Text } from "@/modules/Text";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { defaultWidthString } from "@/utils/constants/spacing";
import { textAlignHelper, justifyHelper } from "@/utils/helpers/style-helpers";

export const ImageTextFullBleed = (data) => {
  const {
    title,
    button,
    image,
    body,
    anchorTagLink,
    loading,
    sectionStyles = {},
    _key,
  } = data;
  const {
    titleTextColor,
    titleTextSize,
    bodyTextColor,
    bodyTextSize,
    textAlignment,
    titleHeadingTag,
    topSpacing,
    bottomSpacing,
  } = sectionStyles;

  const textAlignString = textAlignHelper(textAlignment);
  const justifyString = justifyHelper(textAlignment);

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      mobileWidth={"w-full"}
      desktopWidth={"lg:w-full"}
      id={anchorTagLink}
      searchKey={_key}
    >
      <div className="relative flex items-center justify-center overflow-hidden w-full m-auto min-h-[70dvh] md:min-h-0 md:h-auto">
        <div className="overlay_div absolute w-full h-full z-1 pointer-events-none overflow-hidden bg-black/50" />
        {image && (
          <ScrollAnimation type="fade-in" duration={1}>
            <div className="absolute top-0 left-0 w-full h-full md:relative md:h-auto md:min-h-0">
              <Image
                image={image}
                loading={loading}
                sizes="100vw"
                className="w-full h-full object-cover object-center block md:h-auto md:object-contain md:max-h-none"
              />
            </div>
          </ScrollAnimation>
        )}
        <div
          className={`container_text absolute z-2 flex ${defaultWidthString} ${justifyString} ${textAlignString}`}
        >
          <div
            className={`text_block flex flex-col w-full md:w-1/2 gap-clamp-20 lg:gap-clamp-40 ${textAlignString}`}
          >
            {title && (
              <ScrollAnimation type="fade-in">
                <Text
                  color={titleTextColor}
                  size={titleTextSize}
                  tag={titleHeadingTag}
                  className="w-full m-auto"
                >
                  {title}
                </Text>
              </ScrollAnimation>
            )}

            {body && (
              <ScrollAnimation type="fade-in" delay={0.1}>
                <RichText
                  data={body}
                  size={bodyTextSize}
                  color={bodyTextColor}
                  className="w-full m-auto"
                  tag="p"
                />
              </ScrollAnimation>
            )}

            {button?.text && (
              <ScrollAnimation type="fade-in" delay={0.2}>
                <div
                  className={`w-full flex ${justifyString} ${textAlignString}`}
                >
                  <SanityButton data={button} />
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};
