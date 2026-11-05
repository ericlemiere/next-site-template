import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { AccordionItem } from "./AccordionItem";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

export const TextAccordionTwoColumn = ({
  data,
  pageId,
  pageItemKey,
  listDataAttribute,
}) => {
  const { title, subtitle, accordionItems = [], sectionStyles = {} } = data;
  const { titleTextColor, bodyTextColor, textAlignment } = sectionStyles;
  const renderItems = (items) => {
    return items?.map((item, index) => {
      const { _key } = item;

      return (
        <div
          className="w-full"
          key={_key || index}
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
          />
        </div>
      );
    });
  };

  return (
    <div
      className={`text-accordion-two-column-container w-full flex flex-col items-center gap-y-clamp-30 ${textAlignment === "center" && "text-center"}`}
    >
      <TextBlock
        title={title}
        subtitle={subtitle}
        sectionStyles={sectionStyles}
      />

      <ScrollAnimation
        stagger={0.15}
        className="flex flex-col lg:grid lg:grid-cols-2 w-full gap-x-clamp-30"
        {...listDataAttribute()}
      >
        {renderItems(accordionItems)}
      </ScrollAnimation>
    </div>
  );
};
