import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";

import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

export const LogoGrid = ({ data, pageId, pageItemKey }) => {
  const {
    gridLayout = [],
    selectedLayout,
    anchorTagLink,
    sectionStyles = {},
  } = data;
  const { backgroundColor, topSpacing, bottomSpacing } = sectionStyles;
  const logoSizeClass =
    selectedLayout === 1
      ? "w-48 sm:w-54 lg:w-clamp-200 max-w-84"
      : "h-30 sm:h-36 lg:h-clamp-180 max-h-48";

  const renderGrid = gridLayout?.map((item, i) => {
    const { _key } = item;
    return (
      <div
        className="logo_item w-fit flex items-center justify-center"
        key={_key || i}
        {...(pageId && {
          "data-sanity": createDataAttribute({
            ...config,
            id: pageId,
            type: "page",
            path: `pageLayout[_key=="${pageItemKey}"].gridLayout[_key=="${item._key}"]`,
          }).toString(),
        })}
      >
        <div
          className={`logo_image_container flex items-center justify-center p-8 ${logoSizeClass}`}
        >
          <Image
            image={item?.image}
            sizes={
              selectedLayout === 1
                ? "(min-width: 1024px) 200px, (min-width: 640px) 216px, 192px"
                : "300px"
            }
          />
        </div>
      </div>
    );
  });

  return (
    <DefaultWrapper
      backgroundColor={backgroundColor}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      id={anchorTagLink}
    >
      <ScrollAnimation
        type="fade-in"
        stagger={0.1}
        threshold={0.03}
        className="w-full flex flex-wrap justify-center items-center"
        {...(pageId && {
          "data-sanity": createDataAttribute({
            ...config,
            id: pageId,
            type: "page",
            path: `pageLayout[_key=="${pageItemKey}"].gridLayout`,
          }).toString(),
        })}
      >
        {renderGrid}
      </ScrollAnimation>
    </DefaultWrapper>
  );
};
