// Ensure names are CAPITAL version of Sanity Name.
// So 'Purple' in Sanity would be titled 'PURPLE' here.
export const COLOR = {
  BLACK: "#000000",
  WHITE: "#FFFFFF",

  PRIMARY: "#03CCFF",
  PRIMARY_DARK: "#460071",
  PRIMARY_LIGHT: "#09FBFF",
  SECONDARY: "#D403E1",

  GRAY: "#C6C6C6",
  LIGHT_GRAY: "#F5F5F5",
  DARK_GRAY: "#777777",

  ERROR: "#ff0059",
  ACCENT: "#D403E1",
};

// TODO: Update colors in the app/styles/colors.css file to match these.

export const COLORS = {
  WHITE: { NAME: "White", VALUE: COLOR.WHITE },
  BLACK: { NAME: "Black", VALUE: COLOR.BLACK },
  PRIMARY: { NAME: "Blue", VALUE: COLOR.PRIMARY },
  PRIMARY_DARK: { NAME: "Purple", VALUE: COLOR.PRIMARY_DARK },
  PRIMARY_LIGHT: { NAME: "Light Blue", VALUE: COLOR.PRIMARY_LIGHT },
  SECONDARY: { NAME: "Pink", VALUE: COLOR.SECONDARY },
};

export const defaultColorOptions = [
  {
    title: "Gradient",
    value: `linear-gradient(to right, ${COLOR.PRIMARY_DARK} , ${COLOR.BLACK})`,
  },
  { title: COLORS.PRIMARY.NAME, value: COLORS.PRIMARY.VALUE },
  { title: COLORS.PRIMARY_DARK.NAME, value: COLORS.PRIMARY_DARK.VALUE },
  { title: COLORS.PRIMARY_LIGHT.NAME, value: COLORS.PRIMARY_LIGHT.VALUE },
  { title: COLORS.SECONDARY.NAME, value: COLORS.SECONDARY.VALUE },
  { title: COLORS.BLACK.NAME, value: COLORS.BLACK.VALUE },
  { title: COLORS.WHITE.NAME, value: COLORS.WHITE.VALUE },
];

export const defaultBackgroundColorOptions = [
  {
    title: "Gradient",
    value: `linear-gradient(to right, ${COLOR.PRIMARY_DARK} , ${COLOR.BLACK})`,
  },
  { title: COLORS.PRIMARY_DARK.NAME, value: COLORS.PRIMARY_DARK.VALUE },
  { title: COLORS.PRIMARY.NAME, value: COLORS.PRIMARY.VALUE },
  { title: COLORS.SECONDARY.NAME, value: COLORS.SECONDARY.VALUE },
  { title: COLORS.BLACK.NAME, value: COLORS.BLACK.VALUE },
  { title: COLORS.WHITE.NAME, value: COLORS.WHITE.VALUE },
];

// TODO: Match these to the button colors in SanityButton.tsx
export const defaultButtonColorOptions = [
  { title: COLORS.PRIMARY.NAME, value: COLORS.PRIMARY.VALUE },
  { title: COLORS.PRIMARY_DARK.NAME, value: COLORS.PRIMARY_DARK.VALUE },
  { title: COLORS.SECONDARY.NAME, value: COLORS.SECONDARY.VALUE },
  { title: COLORS.BLACK.NAME, value: COLORS.BLACK.VALUE },
  { title: COLORS.WHITE.NAME, value: COLORS.WHITE.VALUE },
];

export const defaultOverlayOptions = [
  { title: COLORS.PRIMARY_DARK.NAME, value: COLORS.PRIMARY_DARK.VALUE },
  { title: COLORS.PRIMARY.NAME, value: COLORS.PRIMARY.VALUE },
  { title: COLORS.SECONDARY.NAME, value: COLORS.SECONDARY.VALUE },
  { title: COLORS.BLACK.NAME, value: COLORS.BLACK.VALUE },
  { title: COLORS.WHITE.NAME, value: COLORS.WHITE.VALUE },
];

export const defaultTextColorOptions = [
  { title: COLORS.PRIMARY_DARK.NAME, value: COLORS.PRIMARY_DARK.VALUE },
  { title: COLORS.PRIMARY.NAME, value: COLORS.PRIMARY.VALUE },
  { title: COLORS.SECONDARY.NAME, value: COLORS.SECONDARY.VALUE },
  { title: COLORS.BLACK.NAME, value: COLORS.BLACK.VALUE },
  { title: COLORS.WHITE.NAME, value: COLORS.WHITE.VALUE },
];
// TODO: UPDATE INITIAL VALUE
export const buttonColorInitialValue = COLORS.BLACK.VALUE;

export const SANITY_COLORS = {
  BORDER: "#556bfc",
  WARNING: "#FFA500",
  ERROR: "#FF0000",
};

// ============================================= HELPER MAPS FOR TAILWIND CLASSES
// Used in DefaultWrapper and Text components
// TODO: update these to match colors in this file and the app/styles/colors.css file
// Text colors
export const textColorToTailwind = {
  [COLOR.WHITE]: "text-white",
  [COLOR.BLACK]: "text-black",
  [COLOR.PRIMARY]: "text-primary",
  [COLOR.PRIMARY_DARK]: "text-primary-dark",
  [COLOR.PRIMARY_LIGHT]: "text-primary-light",
  [COLOR.SECONDARY]: "text-secondary",
  [COLOR.GRAY]: "text-gray",
  [COLOR.LIGHT_GRAY]: "text-lightgray",
  [COLOR.DARK_GRAY]: "text-darkgray",
  [COLOR.ERROR]: "text-error",
  [COLOR.ACCENT]: "text-accent",
};

// Background colors
export const backgroundToTailwind = {
  [COLOR.WHITE]: "bg-white",
  [COLOR.BLACK]: "bg-black",
  [COLOR.PRIMARY]: "bg-primary",
  [COLOR.PRIMARY_DARK]: "bg-primary-dark",
  [COLOR.PRIMARY_LIGHT]: "bg-primary-light",
  [COLOR.SECONDARY]: "bg-secondary",
};

export const svgPathFillToTailwind = {
  [COLOR.WHITE]: "[&_path]:fill-white",
  [COLOR.BLACK]: "[&_path]:fill-black",
  [COLOR.PRIMARY]: "[&_path]:fill-primary",
  [COLOR.PRIMARY_DARK]: "[&_path]:fill-primary-dark",
  [COLOR.PRIMARY_LIGHT]: "[&_path]:fill-primary-light",
  [COLOR.SECONDARY]: "[&_path]:fill-secondary",
  [COLOR.GRAY]: "[&_path]:fill-gray",
  [COLOR.LIGHT_GRAY]: "[&_path]:fill-lightgray",
  [COLOR.DARK_GRAY]: "[&_path]:fill-darkgray",
  [COLOR.ERROR]: "[&_path]:fill-error",
  [COLOR.ACCENT]: "[&_path]:fill-accent",
};

export const svgPathStrokeToTailwind = {
  [COLOR.WHITE]: "[&_path]:stroke-white",
  [COLOR.BLACK]: "[&_path]:stroke-black",
  [COLOR.PRIMARY]: "[&_path]:stroke-primary",
  [COLOR.PRIMARY_DARK]: "[&_path]:stroke-primary-dark",
  [COLOR.PRIMARY_LIGHT]: "[&_path]:stroke-primary-light",
  [COLOR.SECONDARY]: "[&_path]:stroke-secondary",
  [COLOR.GRAY]: "[&_path]:stroke-gray",
  [COLOR.LIGHT_GRAY]: "[&_path]:stroke-lightgray",
  [COLOR.DARK_GRAY]: "[&_path]:stroke-darkgray",
  [COLOR.ERROR]: "[&_path]:stroke-error",
  [COLOR.ACCENT]: "[&_path]:stroke-accent",
};
