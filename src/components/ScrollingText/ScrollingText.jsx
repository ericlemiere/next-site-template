"use client";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Text } from "@/modules/Text/Text";
import { Image } from "@/modules/Image/Image";

export const ScrollingText = ({ data }) => {
  const {
    anchorTagLink,
    sectionStyles = {},
    _key,
    direction,
    textItems,
  } = data;
  const { backgroundColor, bodyTextColor } = sectionStyles;

  const OPTIONS = { loop: true };
  const [emblaRef] = useEmblaCarousel(OPTIONS, [
    AutoScroll({
      playOnInit: true,
      stopOnMouseEnter: false,
      direction: direction || "forward",
    }),
  ]);

  const renderTextItems = () => {
    if (!textItems || !Array.isArray(textItems)) {
      return null;
    }

    // Duplicate items for seamless infinite scrolling
    const duplicatedItems =
      textItems?.length === 1
        ? Array(10).fill(textItems).flat()
        : textItems?.length === 2
          ? Array(8).fill(textItems).flat()
          : textItems?.length === 3
            ? Array(6).fill(textItems).flat()
            : textItems?.length === 4
              ? Array(4).fill(textItems).flat()
              : textItems?.length === 5
                ? Array(3).fill(textItems).flat()
                : textItems;

    return duplicatedItems?.map((item, index) => {
      const { icon, text } = item;
      return (
        <div
          key={index}
          className="embla__slide flex items-center gap-4 lg:gap-[1.5vw] px-8 lg:px-[2vw] shrink-0"
        >
          {icon && (
            <div className="h-clamp-48 xl:h-[3vw] flex items-center shrink-0">
              <Image
                image={icon}
                sizes="(min-width: 1280px) 6vw, (min-width: 768px) 100px, 80px"
              />
            </div>
          )}
          {text && (
            <Text
              color={bodyTextColor}
              size="heading3"
              className="whitespace-nowrap font-bold xl:text-[2.5vw]"
            >
              {text}
            </Text>
          )}
        </div>
      );
    });
  };

  return (
    <DefaultWrapper
      backgroundColor={backgroundColor}
      topSpacing="none"
      bottomSpacing="none"
      id={anchorTagLink}
      searchKey={_key}
      mobileWidth={"w-full"}
      desktopWidth={"lg:w-full"}
    >
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex py-6">{renderTextItems()}</div>
      </div>
    </DefaultWrapper>
  );
};
