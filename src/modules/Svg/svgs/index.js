import { bluesky } from "./bluesky";
import { checkMark } from "./checkMark";
import { dropdownArrow } from "./dropdownArrow";
import { facebook } from "./facebook";
import { instagram } from "./instagram";
import { leftArrow } from "./leftArrow";
import { linkedin } from "./linkedin";
import { logo } from "./logo";
import { mail } from "./mail";
import { pinterest } from "./pinterest";
import { rightArrow } from "./rightArrow";
import { tiktok } from "./tiktok";
import { vimeo } from "./vimeo";
import { X_Icon } from "./X_Icon";
import { youtube } from "./youtube";

// SVG registry: <Svg name="key" /> looks up components here by exact key.
// Convention: file name = export name = key (camelCase), e.g. leftArrow.jsx exports `leftArrow`.
//
// To add an SVG: create the component file in this folder, then import it and add it below.
export const SVGS = {
  bluesky,
  checkMark,
  dropdownArrow,
  facebook,
  instagram,
  leftArrow,
  linkedin,
  logo,
  mail,
  pinterest,
  rightArrow,
  tiktok,
  vimeo,
  X_Icon,
  youtube,
};
