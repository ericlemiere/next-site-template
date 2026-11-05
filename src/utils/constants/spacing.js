// TODO: adjust default widths as needed
// default to 90% width
export const defaultMobileWidth = "w-9/10";
// default to 80% width
export const defaultDesktopWidth = "lg:w-4/5";
// 1526px * desktop width
export const defaultMaxWidth = "max-w-[1220.8px]";

export const defaultWidthString = `${defaultMobileWidth} ${defaultDesktopWidth} ${defaultMaxWidth}`;

// For Sanity schemas textSection and richTextSection
export const sectionWidthOptions = [
  { title: "100%", value: 0 },
  { title: "75%", value: 1 },
  { title: "50%", value: 2 },
];

// For components TextSection and RichTextSection
export const sectionWidthString = (columnWidth) => {
  return columnWidth === 1
    ? "lg:w-3/4"
    : columnWidth === 2
      ? "md:w-3/4 lg:w-1/2"
      : "w-full";
};
