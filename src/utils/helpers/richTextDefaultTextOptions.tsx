// =============================================================================
// Rich Text Default Text Options
// =============================================================================

import { JSX } from "react";

const FontStyle = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
  fontFamily: string,
  fontSize: number,
) => (
  <span
    style={{
      fontFamily: fontFamily,
      fontSize: fontSize,
    }}
  >
    {props.children}
  </span>
);

// TODO: update fonts to site fonts
export const defaultRichTextOptions = [
  {
    title: "Body - 16pt (Font 1)",
    value: "normal",
    // component: (
    //   props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
    // ) => FontStyle(props, "Roboto", 16),
  },
  {
    title: "Heading 2 - 48pt (Font 2)",
    value: "h2",
    component: (
      props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
    ) => FontStyle(props, "Saira", 48),
  },
  {
    title: "Heading 3 - 36pt (Font 1)",
    value: "h3",
    component: (
      props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
    ) => FontStyle(props, "Roboto", 36),
  },
  {
    title: "Heading 4 - 24pt (Font 2)",
    value: "h4",
    component: (
      props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
    ) => FontStyle(props, "Saira", 24),
  },
  {
    title: "Heading 5 - 20pt (Font 3)",
    value: "h5",
    component: (
      props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
    ) => FontStyle(props, "Fuzzy Bubbles", 20),
  },
  //{ title: 'Quote - 16pt', value: 'blockquote' },
];
