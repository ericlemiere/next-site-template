import { TextAccordionOneColumn } from "./TextAccordionOneColumn";
import { TextAccordionTwoColumn } from "./TextAccordionTwoColumn";
import { TextAccordionTwoColumnAlt } from "./TextAccordionTwoColumnAlt";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { createDataAttribute } from "@sanity/visual-editing";
import { config } from "@/utils/constants/configObject";

export const TextAccordion = ({ data, pageId, pageItemKey }) => {
  const { anchorTagLink, sectionStyles = {}, _key } = data;
  const { backgroundColor, topSpacing, bottomSpacing } = sectionStyles;

  // This is for drag and drop functionality in the visual editor
  const listDataAttribute = () => {
    if (!pageId) return {};
    return {
      "data-sanity": createDataAttribute({
        ...config,
        id: pageId,
        type: "page",
        path: `pageLayout[_key=="${pageItemKey}"].accordionItems`,
      }).toString(),
    };
  };

  const renderSection = () => {
    switch (data.selectedLayout) {
      case 1:
        return (
          <TextAccordionOneColumn
            data={data}
            pageId={pageId}
            pageItemKey={pageItemKey}
            listDataAttribute={listDataAttribute}
          />
        );
      case 2:
        return (
          <TextAccordionTwoColumn
            data={data}
            pageId={pageId}
            pageItemKey={pageItemKey}
            listDataAttribute={listDataAttribute}
          />
        );
      case 3:
        return (
          <TextAccordionTwoColumnAlt
            data={data}
            pageId={pageId}
            pageItemKey={pageItemKey}
            listDataAttribute={listDataAttribute}
          />
        );
      default:
        return;
    }
  };
  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      {renderSection()}
    </DefaultWrapper>
  );
};
