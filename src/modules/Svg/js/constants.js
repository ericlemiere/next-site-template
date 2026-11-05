import * as files from '../svgs'

// Calculate SVGS.RATIO //
// Percentage of svg h:w
// height: Int, width: Int
// You can find the h & w in the svg `viewbox` attr
const getRatio = (height, width) => {
  return `${(height / width) * 100}%`
}

export const SVGS = {
  BLUESKY: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.bluesky(),
  },
  DROPDOWN_ARROW: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.dropdownArrow(),
  },
  FACEBOOK: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.facebook(),
  },
  INSTAGRAM: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.instagram(),
  },
  LEFT_ARROW: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.leftArrow(),
  },
  LINKEDIN: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.linkedin(),
  },
  LOGO_HORIZONTAL: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.logoHorizontal(),
  },
  MAIL: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.mail(),
  },
  PINTEREST: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.pinterest(),
  },
  RIGHT_ARROW: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.rightArrow(),
  },
  TIKTOK: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.tiktok(),
  },
  YOUTUBE: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.youtube(),
  },
  CHECKMARK: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.checkMark(),
  },
  X_ICON: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.X_Icon(),
  },
  VIMEO: {
    RATIO: getRatio(1, 1), // '100%'
    SVG: files.vimeo(),
  },
}
