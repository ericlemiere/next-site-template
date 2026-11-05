"use client";
import { SVGS } from "./svgs";
import {
  svgPathFillToTailwind,
  svgPathStrokeToTailwind,
} from "@/utils/constants/colors";

// Look up the SVG render function for the "name" prop (must match a key in svgs/index.js exactly)
const getSvg = (name) => SVGS[name];

export const Svg = ({
  pathFill = "", // color key from colors.js (COLOR.WHITE, COLOR.PRIMARY, etc)
  pathStroke = "", // color key from colors.js (COLOR.WHITE, COLOR.PRIMARY, etc)
  name,
  className = "",
  "aria-hidden": ariaHidden,
}) => {
  const renderSvg = getSvg(name);
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
      {renderSvg?.()}
    </div>
  );
};
