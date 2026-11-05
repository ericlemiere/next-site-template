import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { backgroundToTailwind } from "@/utils/constants/colors";
import { sectionWidthString } from "@/utils/constants/spacing";

export const ImageSection = ({ data = {}, loading }) => {
  const {
    selectedLayout,
    images,
    anchorTagLink,
    imageWidth,
    aspectRatio,
    sectionStyles = {},
  } = data;
  const { backgroundColor, overlayColor, topSpacing, bottomSpacing } =
    sectionStyles;

  if (!images || images.length === 0) return null;
  const isFullBleedImage = selectedLayout === 1;
  const borderRadiusString = isFullBleedImage
    ? ""
    : "overflow-hidden rounded-image";
  const hasOverlay = overlayColor && overlayColor !== "transparent";
  const overlayColorString = hasOverlay
    ? backgroundToTailwind[overlayColor]
    : "";

  const imageWidthString =
    images.length === 1 && imageWidth
      ? sectionWidthString(imageWidth)
      : "w-full";

  const renderImages = () => {
    if (images.length === 1) {
      const image = images[0];
      const sizesString = isFullBleedImage
        ? "100vw"
        : imageWidth === 1
          ? "67.5vw" // 90vw * 75%
          : imageWidth === 2
            ? "45vw" // 90vw * 50%
            : "90vw";
      return (
        <Image
          image={image}
          loading={loading}
          sizes={sizesString}
          className={`${isFullBleedImage ? "" : "rounded-image"}`}
        />
      );
    } else {
      return images.map((image, index) => {
        const numberOfImages = images.length;
        const sizesString = isFullBleedImage
          ? (100 / numberOfImages).toFixed(2) + "vw"
          : (90 / numberOfImages).toFixed(2) + "vw";

        return (
          <Image
            key={index}
            image={image}
            loading={loading}
            sizes={sizesString}
            className={`${aspectRatio} ${isFullBleedImage ? "" : "rounded-image"}`}
          />
        );
      });
    }
  };

  return (
    <DefaultWrapper
      backgroundColor={backgroundColor}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      id={anchorTagLink}
      mobileWidth={isFullBleedImage ? "w-full" : null}
      desktopWidth={isFullBleedImage ? "lg:w-full" : null}
    >
      <div className={`relative w-full h-full`}>
        {hasOverlay && (
          <div
            className={`hero-overlay w-full h-full absolute top-0 left-0 z-1 ${overlayColorString} opacity-60 ${borderRadiusString}`}
          />
        )}
        <ScrollAnimation
          type="fade-in"
          stagger={0.2}
          threshold={0.1}
          className={`relative flex justify-center m-auto h-full ${imageWidthString} ${isFullBleedImage ? "" : "gap-4"}`}
        >
          {renderImages()}
        </ScrollAnimation>
      </div>
    </DefaultWrapper>
  );
};
