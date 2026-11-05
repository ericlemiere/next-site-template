import { ReactNode } from "react";
import { backgroundToTailwind } from "@/utils/constants/colors";
import {
  defaultMobileWidth,
  defaultDesktopWidth,
  defaultMaxWidth,
} from "@/utils/constants/spacing";
import { cleanString } from "@/utils/helpers/string-helpers";

type SpacingOption = "default" | "small" | "large" | "none";

interface AnchorTagId {
  anchorTag?: string;
}

interface DefaultWrapperProps {
  backgroundColor?: string;
  children: ReactNode;
  topSpacing?: SpacingOption;
  bottomSpacing?: SpacingOption;
  mobileWidth?: string | null; // tailwind width class (e.g., 'w-9/10')
  desktopWidth?: string | null; // tailwind width class with lg: prefix (e.g., 'lg:w-4/5')
  maxWidth?: string | null; // tailwind max-width class (e.g., 'max-w-[2048px]')
  id?: AnchorTagId;
  className?: string;
  searchKey?: string;
  as?: "section" | "header" | "div" | "article";
}

export const DefaultWrapper = ({
  backgroundColor,
  children,
  topSpacing,
  bottomSpacing,
  mobileWidth = null,
  desktopWidth = null,
  maxWidth = null,
  className,
  id,
  searchKey,
  as: Element = "section",
}: DefaultWrapperProps) => {
  const anchorTag = id?.anchorTag?.split("#")[1] || "";
  const cleanAnchorTag = cleanString(anchorTag);
  let backgroundColorString = "bg-transparent";

  // TODO: update if there is a gradient color option
  if (backgroundColor?.startsWith("linear-gradient")) {
    backgroundColorString = "bg-linear-to-r from-primary-dark to-black";
  } else {
    backgroundColorString = backgroundColor
      ? backgroundToTailwind[backgroundColor]
      : "bg-transparent";
  }

  const mobileWidthString = mobileWidth || defaultMobileWidth;
  const desktopWidthString = desktopWidth || defaultDesktopWidth;
  const maxWidthString =
    desktopWidth === "lg:w-full" ? "max-w-full" : maxWidth || defaultMaxWidth;

  const widthString = `${mobileWidthString} ${desktopWidthString} ${maxWidthString}`;

  let paddingTopString = "";
  switch (topSpacing) {
    case "none":
      paddingTopString = "";
      break;
    case "small":
      paddingTopString = "pt-wrapper-sm";
      break;
    case "large":
      paddingTopString = "pt-wrapper-lg";
      break;
    default:
      paddingTopString = "pt-wrapper-default";
  }

  let paddingBottomString = "";
  switch (bottomSpacing) {
    case "none":
      paddingBottomString = "";
      break;
    case "small":
      paddingBottomString = "pb-wrapper-sm";
      break;
    case "large":
      paddingBottomString = "pb-wrapper-lg";
      break;
    default:
      paddingBottomString = "pb-wrapper-default";
  }

  // TODO: adjust to actual size of header
  const anchorClassString = "absolute -top-[143px] xl:top-[-8.854vw]";

  return (
    <Element
      className={`default_wrapper w-full relative z-1
        ${backgroundColorString} ${paddingTopString} ${paddingBottomString}`}
    >
      <div
        className={`default_container mx-auto relative ${widthString} ${className}`}
      >
        {searchKey && <div id={searchKey} className={anchorClassString} />}
        {anchorTag && <div id={cleanAnchorTag} className={anchorClassString} />}
        {children}
      </div>
    </Element>
  );
};
