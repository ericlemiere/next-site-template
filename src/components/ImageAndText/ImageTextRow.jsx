"use client";
import { useMedia } from "react-use";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";

export const ImageTextRow = (data) => {
  const {
    loading,
    image,
    title,
    body,
    button,
    imageSide, // type: number  (1 = left, 2 = right)
    imageSizing, // type: number  (1 = natural, 2 = match text height)
    anchorTagLink,
    sectionStyles = {},
    _key,
  } = data;
  const { backgroundColor, topSpacing, bottomSpacing } = sectionStyles;
  const isMobile = useMedia("(max-width: 767px)", false);

  const imageFadeDirection = isMobile
    ? "right"
    : imageSide === 2
      ? "left"
      : "right";
  const textFadeDirection = isMobile
    ? "right"
    : imageSide === 1
      ? "left"
      : "right";
  const imageOnRight = imageSide === 2;
  const directionString = imageOnRight ? "md:flex-row-reverse" : "md:flex-row";
  const matchTextHeight = imageSizing === 2;

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      <div
        className={`image-column w-full m-auto flex flex-col ${matchTextHeight ? "items-stretch" : "items-center"} ${directionString} gap-clamp-30`}
      >
        <div
          className={`w-full ${matchTextHeight ? "md:w-1/2" : "h-full flex justify-center items-center md:w-1/2"}`}
        >
          <ScrollAnimation
            type={`fade-${imageFadeDirection}`}
            className={matchTextHeight ? "w-full h-full" : "w-full"}
          >
            {image && (
              <div
                className={`${matchTextHeight ? "h-full" : "flex justify-center items-center h-full"} rounded-image overflow-hidden`}
              >
                <Image
                  image={image}
                  loading={loading}
                  sizes="(max-width: 768px) 90vw, 43vw"
                  className={
                    matchTextHeight ? "w-full h-full object-cover" : ""
                  }
                />
              </div>
            )}
          </ScrollAnimation>
        </div>

        <div
          className={`text-column w-full md:w-1/2 flex flex-col justify-center`}
        >
          <TextBlock
            title={title}
            body={body}
            button={button}
            sectionStyles={sectionStyles}
            fadeDirection={textFadeDirection}
          />
        </div>
      </div>
    </DefaultWrapper>
  );
};
