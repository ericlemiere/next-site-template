import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Text } from "@/modules/Text";
import { RichText } from "@/modules/RichText";
import { Image } from "@/modules/Image";
import { Card } from "@/components/CardGrid/Card";
import { CardBackgroundImage } from "../CardGrid/CardBackgroundImage";
import { CardExpandable } from "../CardGrid/CardExpandable";
import { AccordionItem } from "../TextAccordion/AccordionItem";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { cleanString } from "@/utils/helpers/string-helpers";
import { textAlignHelper } from "@/utils/helpers/style-helpers";
import { ScrollAnimation } from "@/modules/ScrollAnimation";

/**
 * Extracts and cleans specified style fields from sectionStyles object
 */
const extractSectionStyles = (sectionStyles, fields) => {
  return fields.reduce((acc, field) => {
    acc[field] = cleanString(sectionStyles?.[field]);
    return acc;
  }, {});
};

/**
 * Maps card type strings to their corresponding React components
 */
const CARD_COMPONENTS = {
  card: Card,
  backgroundImageCard: CardBackgroundImage,
  cardExpandable: CardExpandable,
};

// ===========================================================
// MAIN COMPONENT
// ===========================================================

export const FlexColumns = ({ data }) => {
  const {
    sectionStyles = {},
    anchorTagLink,
    column1,
    column2,
    column1Width = 50,
    verticalAlignment = 0,
    mobileLayout = 0,
    _key,
  } = data;
  const { topSpacing, bottomSpacing, backgroundColor } = sectionStyles;

  const column2Width = 100 - column1Width;
  const verticalAlignmentClass =
    verticalAlignment === 0 ? "items-start" : "items-center";
  const mobileLayoutClass =
    mobileLayout === 1 ? "flex-col-reverse" : "flex-col";

  // ===========================================================
  // RENDER FUNCTIONS FOR EACH CONTENT TYPE
  // ===========================================================

  /** RENDER CARD **/
  const renderCard = (item, index) => {
    const cardType = cleanString(item?.cardType);
    const CardComponent = CARD_COMPONENTS[cardType];

    if (!CardComponent) return null;

    const cardStyles = extractSectionStyles(item?.cardStyles, [
      "titleTextColor",
      "titleTextSize",
      "bodyTextColor",
      "bodyTextSize",
      "textAlignment",
    ]);

    return (
      <ScrollAnimation key={index}>
        <CardComponent {...item.card} styles={cardStyles} />
      </ScrollAnimation>
    );
  };

  /** RENDER RICH TEXT **/
  const renderRichText = (item, index) => {
    const textAlignment = cleanString(item?.sectionStyles?.textAlignment);
    const textAlignString = textAlignHelper(textAlignment);

    return (
      <ScrollAnimation key={index} threshold={0.1}>
        <RichText
          data={item?.body}
          textAlignment={textAlignment}
          className={`m-auto ${textAlignString} w-full}`}
        />
      </ScrollAnimation>
    );
  };

  /** RENDER IMAGE **/
  const renderImage = (item, index) => (
    <ScrollAnimation
      key={index}
      className="w-full overflow-hidden rounded-image"
    >
      <Image image={item.image} className="w-full h-auto" />
    </ScrollAnimation>
  );

  /** RENDER TEXT SECTION **/
  const renderTextSection = (item, index) => {
    const textSectionStyles = extractSectionStyles(item?.sectionStyles, [
      "titleTextColor",
      "subtitleTextColor",
      "bodyTextColor",
      "titleTextSize",
      "subtitleTextSize",
      "bodyTextSize",
      "textAlignment",
    ]);

    return (
      <ScrollAnimation key={index} threshold={0.1}>
        <TextBlock
          title={item?.title}
          subtitle={item?.subtitle}
          body={item?.body}
          button={item?.button}
          sectionStyles={textSectionStyles}
        />
      </ScrollAnimation>
    );
  };

  /** RENDER ACCORDION **/
  const renderAccordion = (item, index) => {
    const { titleTextColor, bodyTextColor } = extractSectionStyles(
      item?.sectionStyles,
      ["titleTextColor", "bodyTextColor"],
    );
    const accordionItems = item?.accordionItems || [];

    if (accordionItems.length === 0) return null;

    return (
      <ScrollAnimation key={index} stagger={0.2} threshold={0.1}>
        {accordionItems.map((accordionItem, idx) => (
          <AccordionItem
            key={idx}
            item={accordionItem}
            accordionTitleTextColor={titleTextColor}
            accordionParagraphTextColor={bodyTextColor}
            firstItem={idx === 0}
          />
        ))}
      </ScrollAnimation>
    );
  };

  /** RENDER LIST **/
  const renderList = (item, index) => {
    const { titleTextColor, bodyTextColor } = extractSectionStyles(
      item?.sectionStyles,
      ["titleTextColor", "bodyTextColor"],
    );
    const listItems = item?.listItems || [];

    if (listItems.length === 0) return null;

    return (
      <ScrollAnimation
        key={index}
        threshold={0.1}
        stagger={0.2}
        className="flex flex-col items-start gap-y-clamp-40 lg:gap-y-clamp-50"
      >
        {listItems.map((listItem, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start gap-y-clamp-10 lg:gap-y-clamp-16"
          >
            <Text size="heading3" color={titleTextColor}>
              {listItem?.title}
            </Text>
            <RichText data={listItem?.body} color={bodyTextColor} />
          </div>
        ))}
      </ScrollAnimation>
    );
  };

  // ===========================================================
  // CONTENT TYPE DISPATCHER
  // ===========================================================

  /**
   * Maps Sanity content types to their corresponding render functions
   * This pattern makes it easy to add new content types in the future
   */
  const RENDER_MAP = {
    cardObject: renderCard,
    flexRichTextSection: renderRichText,
    imageModule: renderImage,
    flexTextSection: renderTextSection,
    flexTextAccordion: renderAccordion,
    flexTextList: renderList,
  };

  /**
   * Renders all content items in a column
   * Automatically selects the correct render function based on item type
   * @param {Array} columnData - Array of content items from Sanity
   */
  const renderColumnContent = (columnData) => {
    return columnData?.map((item, index) => {
      const renderer = RENDER_MAP[item._type];
      return renderer ? renderer(item, index) : null;
    });
  };

  // ===========================================================
  // COMPONENT RENDER
  // ===========================================================

  return (
    <DefaultWrapper
      backgroundColor={backgroundColor}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      id={anchorTagLink}
      searchKey={_key}
    >
      <div
        className={`flex_columns_container w-full flex ${mobileLayoutClass} md:flex-row gap-x-clamp-30 xl:gap-x-clamp-50 gap-y-clamp-40 lg:gap-y-clamp-80 ${verticalAlignmentClass}`}
      >
        <div
          className="flex_column_1 w-full flex flex-col gap-clamp-60 lg:gap-y-clamp-60 min-w-0 shrink grow-0"
          style={{
            flexBasis: column1Width + "%",
          }}
        >
          {renderColumnContent(column1)}
        </div>

        <div
          className="flex_column_2 w-full flex flex-col gap-clamp-60 lg:gap-y-clamp-60 min-w-0 shrink grow-0"
          style={{
            flexBasis: column2Width + "%",
          }}
        >
          {renderColumnContent(column2)}
        </div>
      </div>
    </DefaultWrapper>
  );
};
