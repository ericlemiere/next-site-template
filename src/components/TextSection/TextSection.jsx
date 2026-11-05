import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { sectionWidthString } from "@/utils/constants/spacing";

export const TextSection = ({ data = {} }) => {
  const {
    columns,
    title,
    subtitle,
    body,
    button,
    column2Title,
    column2Subtitle,
    column2Body,
    column2Button,
    column3Title,
    column3Subtitle,
    column3Body,
    column3Button,
    anchorTagLink,
    columnWidth = "100%",
    sectionStyles = {},
    _key,
  } = data;
  const { backgroundColor, topSpacing, bottomSpacing, columnAlignment } =
    sectionStyles;

  const columnAlignmentString =
    columnAlignment === "center"
      ? "m-auto"
      : columnAlignment === "right"
        ? "m-0 ml-auto"
        : "";

  // ========================================================
  // RENDER COLUMN
  // ========================================================

  const renderColumn = (title, subtitle, body, button) => {
    return (
      <TextBlock
        title={title}
        subtitle={subtitle}
        body={body}
        button={button}
        sectionStyles={sectionStyles}
      />
    );
  };

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
      <div
        className={`text-columns-container flex flex-col ${columnAlignmentString} ${columns === 1 && sectionWidthString(columnWidth)}`}
      >
        <div
          className={`flex flex-col md:flex-row justify-center gap-x-clamp-30 gap-y-clamp-60 w-full`}
        >
          {renderColumn(title, subtitle, body, button)}

          {/*  COLUMN 2 */}
          {columns >= 2 &&
            renderColumn(
              column2Title,
              column2Subtitle,
              column2Body,
              column2Button
            )}

          {/*  COLUMN 3 */}
          {columns === 3 &&
            renderColumn(
              column3Title,
              column3Subtitle,
              column3Body,
              column3Button
            )}
        </div>
      </div>
    </DefaultWrapper>
  );
};
