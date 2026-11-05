import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { RichText } from "@/modules/RichText";
import { sectionWidthString } from "@/utils/constants/spacing";
import { textAlignHelper } from "@/utils/helpers/style-helpers";

export const RichTextSection = ({ data = {} }) => {
  const { body, anchorTagLink, sectionStyles = {}, sectionWidth, _key } = data;
  const {
    backgroundColor,
    textAlignment,
    columnAlignment,
    topSpacing,
    bottomSpacing,
  } = sectionStyles || {};
  if (!body) return null;
  const textAlignString = textAlignHelper(textAlignment);

  const columnAlignmentString =
    columnAlignment === "center"
      ? "m-auto"
      : columnAlignment === "right"
        ? "m-0 ml-auto"
        : "";

  // ========================================================
  // RENDER COMPONENT
  // ========================================================
  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      <ScrollAnimation threshold={0.1} type="fade-in">
        <div
          className={`${columnAlignmentString} ${textAlignString} ${sectionWidthString(sectionWidth)}`}
        >
          <RichText data={body} textAlignment={textAlignment} />
        </div>
      </ScrollAnimation>
    </DefaultWrapper>
  );
};
