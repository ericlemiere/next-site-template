import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { AccordionItem } from "./AccordionItem";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

export const TextAccordionTwoColumnAlt = ({
  data,
  pageId,
  pageItemKey,
  listDataAttribute,
}) => {
  const { button, title, subtitle, accordionItems, sectionStyles = {} } = data;
  const { titleTextColor, bodyTextColor } = sectionStyles;

  const renderItems = (items) => {
    return items?.map((item, index) => {
      const { _key } = item;

      return (
        <div
          key={_key}
          {...(pageId && {
            "data-sanity": createDataAttribute({
              ...config,
              id: pageId,
              type: "page",
              path: `pageLayout[_key=="${pageItemKey}"].accordionItems[_key=="${_key}"]`,
            }).toString(),
          })}
        >
          <AccordionItem
            item={item}
            accordionTitleTextColor={titleTextColor}
            accordionParagraphTextColor={bodyTextColor}
            firstItem={index === 0}
          />
        </div>
      );
    });
  };

  return (
    <div className="text-accordion-two-column-alt-container flex flex-col m-auto row-gap-[30px]">
      <div className="w-full flex flex-col lg:flex-row gap-x-clamp-30">
        <div className={`flex flex-col mb-7.5 lg:mb-0 gap-y-clamp-30`}>
          <TextBlock
            title={title}
            subtitle={subtitle}
            sectionStyles={sectionStyles}
            button={button}
          />
        </div>
        <div {...listDataAttribute()}>
          <ScrollAnimation type="fade-up" stagger={0.1} threshold={0.05}>
            {renderItems(accordionItems)}
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};
