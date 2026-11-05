import { vercelStegaSplit } from "@vercel/stega";

export function cleanText(value: string) {
  if (!value) return "";

  const { cleaned, encoded } = vercelStegaSplit(value);

  return encoded ? (
    <>
      {cleaned}
      <span style={{ display: "none" }}>{encoded}</span>
    </>
  ) : (
    cleaned
  );
}

export function cleanString(value?: string) {
  if (!value) return "";

  const { cleaned } = vercelStegaSplit(value);

  return cleaned;
}

export function cleanSanityProps(value?: object): object {
  if (!value) return {};

  const cleanPropKeys = [
    "backgroundColor",
    "overlayColor",
    "topSpacing",
    "bottomSpacing",
    "titleTextColor",
    "titleTextSize",
    "subtitleTextSize",
    "subtitleTextColor",
    "textAlignment",
    "bodyTextColor",
    "bodyTextSize",
    "anchorTag",
    "direction",
    "aspectRatio",
    "aspectRatio",
    "videoHost",
    "vimeoId",
    "titleHeadingTag",
    "gridTitleTextColor",
    "gridTitleTextSize",
    "imageAlignment",
    "columnAlignment",
  ];

  const newValue = (uncleanObject: Record<string, unknown> = {}): object => {
    return Object.keys(uncleanObject).reduce(
      (acc: Record<string, unknown>, key: string) => {
        if (cleanPropKeys.includes(key)) {
          acc[key] = cleanString(uncleanObject[key] as string | undefined);
        } else if (
          (key === "sectionStyles" || key === "cardStyles") &&
          typeof uncleanObject[key] === "object" &&
          uncleanObject[key] !== null
        ) {
          // Recursively clean sectionStyles object
          acc[key] = newValue(uncleanObject[key] as Record<string, unknown>);
        } else {
          acc[key] = uncleanObject[key];
        }
        return acc;
      },
      {}
    );
  };

  return newValue(value as Record<string, unknown>);
}
