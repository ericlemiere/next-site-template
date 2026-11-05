import React from "react";
import { textColorToTailwind } from "@/utils/constants/colors";

// TODO: match these to app/styles/typography.css
const TEXT_SIZE_CLASSES: Record<string, string> = {
  heading1: "text-heading1",
  heading2: "text-heading2",
  heading3: "text-heading3",
  heading4: "text-heading4",
  heading5: "text-heading5",
  body1: "text-body1",
  body2: "text-body2",
  body3: "text-body3",
  tag: "text-tag",
  button: "text-button",
  footer1: "text-footer1",
  footer2: "text-footer2",
  formLabel: "text-formLabel",
};

export const tagSetter = (textSize: string) => {
  if (textSize.includes("body")) {
    return "p";
  } else if (textSize.includes("heading")) {
    const match = textSize.match(/heading(\d)/);
    if (match) {
      return `h${match[1]}`;
    }
  }
  return "span";
};

export interface TextProps {
  children: React.ReactNode;
  tag?: keyof React.JSX.IntrinsicElements;
  size?: keyof typeof TEXT_SIZE_CLASSES; // Type-safe size prop
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  tag,
  size = "body1",
  color,
  className = "",
  style,
  id,
}) => {
  const htmlTag = tag
    ? tag
    : (tagSetter(size) as keyof React.JSX.IntrinsicElements);

  const Component = htmlTag as React.ElementType;

  const colorClass = color ? textColorToTailwind[color] : "text-black";
  const sizeClass = TEXT_SIZE_CLASSES[size] || TEXT_SIZE_CLASSES.body1;
  const combinedClasses = `${sizeClass} ${colorClass} ${className}`.trim();

  return (
    <Component className={combinedClasses} style={style} id={id}>
      {children}
    </Component>
  );
};
