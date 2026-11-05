// Enter in the smallest px size on mobile,
// and the preferred px size at 1440px window width.
// This will NOT work with negative values.
export const clampSize = (min: number = 16, size?: number) => {
  const preferredSize = size ? size / 1440 : min / 1440;
  const maxSize = 1526 * preferredSize;

  return `clamp(${min}px, ${preferredSize * 100}vw, ${maxSize}px)`;
};

export const textAlignHelper = (alignment: string) => {
  return alignment === "center"
    ? "text-center"
    : alignment === "right"
      ? "text-right"
      : "text-left";
};

export const justifyHelper = (alignment: string) => {
  return alignment === "center"
    ? "justify-center"
    : alignment === "right"
      ? "justify-end"
      : "";
};

export const alignItemsHelper = (alignment: string) => {
  return alignment === "center"
    ? "items-center"
    : alignment === "right"
      ? "items-end"
      : "items-start";
};
