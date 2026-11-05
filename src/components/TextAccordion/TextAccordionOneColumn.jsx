import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { AccordionItem } from "./AccordionItem";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

export const TextAccordionOneColumn = ({
  data,
  pageId,
  pageItemKey,
  listDataAttribute,
}) => {
  const { title, subtitle, accordionItems, sectionStyles = {} } = data;
  const { titleTextColor, bodyTextColor, textAlignment } = sectionStyles;

  const renderItems = (items) => {
    return items?.map((item, index) => {
      const { _key } = item;

      return (
        <div
          className="w-full"
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
    <div
      className={`text-accordion-one-column-container flex flex-col justify-center gap-y-clamp-30
        w-full lg:w-9/10  ${textAlignment === "center" && "m-auto"}`}
    >
      <TextBlock
        title={title}
        subtitle={subtitle}
        sectionStyles={sectionStyles}
      />
      <div className={`flex flex-col w-full`} {...listDataAttribute()}>
        <ScrollAnimation type="fade-up" stagger={0.1} threshold={0.05}>
          {renderItems(accordionItems)}
        </ScrollAnimation>
      </div>
    </div>
  );
};
