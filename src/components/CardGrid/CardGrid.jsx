"use client";
import { useMedia } from "react-use";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { SanityButton } from "@/modules/SanityButton";
import { TextBlock } from "@/modules/TextBlock/TextBlock";

import { CardBackgroundImage } from "./CardBackgroundImage";
import { CardExpandable } from "./CardExpandable";
import { Card } from "./Card";

import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

import { justifyHelper } from "@/utils/helpers/style-helpers";

export const CardGrid = ({ data, pageId, pageItemKey }) => {
  const {
    title,
    cardType = "card",
    button,
    gridColumns,
    gridLayout = [],
    anchorTagLink,
    sectionStyles,
    cardStyles,
    _key,
  } = data;
  const { backgroundColor, textAlignment, topSpacing, bottomSpacing } =
    sectionStyles || {};
  const delayMultiplier = 0.075;
  const isMobile = useMedia("(max-width: 600px)", false);

  let gridString = "";
  switch (gridColumns) {
    case 2:
      gridString = "md:grid-cols-2";
      break;
    case 3:
      gridString = "md:grid-cols-3";
      break;
    case 4:
      gridString = "md:grid-cols-2 lg:grid-cols-4";
      break;
    default:
      gridString = "md:grid-cols-2";
  }
  const justifyString = justifyHelper(textAlignment);

  const renderGrid = gridLayout?.map((item, index) => {
    const key = item._key || index;
    const delay = isMobile ? 0 : (index % gridColumns) * delayMultiplier;

    let CardComponent;
    switch (cardType) {
      case "backgroundImageCard":
        CardComponent = <CardBackgroundImage {...item} styles={cardStyles} />;
        break;
      case "cardExpandable":
        CardComponent = <CardExpandable {...item} styles={cardStyles} />;
        break;
      default:
        CardComponent = <Card {...item} styles={cardStyles} />;
    }

    return (
      <div
        className="w-full h-full m-auto flex justify-center"
        key={key}
        {...(pageId && {
          "data-sanity": createDataAttribute({
            ...config,
            id: pageId,
            type: "page",
            path: `pageLayout[_key=="${pageItemKey}"].gridLayout[_key=="${item._key}"]`,
          }).toString(),
        })}
      >
        <ScrollAnimation type="fade-up" delay={delay} className="w-full">
          {CardComponent}
        </ScrollAnimation>
      </div>
    );
  });

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      <TextBlock
        title={title}
        sectionStyles={sectionStyles}
        className="mb-clamp-50"
      />
      <div
        className={`w-full flex flex-col gap-x-clamp-20 gap-y-clamp-40
          md:grid ${gridString}`}
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
      </div>
      {button?.text && (
        <div className={`w-full flex mt-clamp-50 ${justifyString}`}>
          <ScrollAnimation>
            <SanityButton data={button} />
          </ScrollAnimation>
        </div>
      )}
    </DefaultWrapper>
  );
};
