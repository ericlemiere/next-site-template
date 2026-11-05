"use client";
import { SVGS } from "./js/constants";
import {
  svgPathFillToTailwind,
  svgPathStrokeToTailwind,
} from "@/utils/constants/colors";

// get data object connected to the "name" prop of the component
// object: {RATIO (percentage of h:w), SVG (svg react component)}
const getSvg = (name) => {
  const key = name.replace(/-/g, "_").toUpperCase();
  return SVGS[key];
};

export const Svg = ({
  pathFill = "", // color key from colors.js (COLOR.WHITE, COLOR.PRIMARY, etc)
  pathStroke = "", // color key from colors.js (COLOR.WHITE, COLOR.PRIMARY, etc)
  name,
  className = "",
  "aria-hidden": ariaHidden,
}) => {
  const SVG_DATA = getSvg(name);
  const pathFillString = svgPathFillToTailwind[pathFill] || "";
  const pathStrokeString = svgPathStrokeToTailwind[pathStroke] || "";

  // Can also pass in tailwind classes through the className prop to fill in SVG colors:
  // [&_svg]:fill-primary
  // [&_path]:fill-black
  // [&_path]:stroke-blue-500
  // [&_rect]:fill-red-500

  return (
    <div
      className={`svg_wrapper relative pointer-events-none min-w-full min-h-full
        [&_svg]:absolute [&_svg]:top-0 [&_svg]:left-0 [&_svg]:w-full [&_svg]:h-full
        [&_path]:absolute [&_path]:top-0 [&_path]:left-0 [&_path]:w-full [&_path]:h-full
        after:block after:content-[''] ${pathFillString} ${pathStrokeString} ${className}`}
      aria-hidden={ariaHidden}
      aria-label={!ariaHidden ? name + " svg" : undefined}
    >
      {SVG_DATA && <>{SVG_DATA.SVG}</>}
    </div>
  );
};
