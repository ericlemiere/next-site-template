import { Text, Radio, useTheme } from "@sanity/ui";

export const AnchorTagLinkFormat = (props) => {
  const { elementProps, onChange, schemaType, validation, value = "" } = props;
  const { id, onBlur, onFocus, placeholder, readOnly, ref } = elementProps;

  const theme = useTheme();
  const darkMode = theme.sanity?.color?.dark || theme.sanity?.v2?.color?._dark;

  const border = darkMode ? "#2a2d3f" : "#e3e4e8";
  return (
    <div
      style={{
        width: "calc(100% - 20px)",
        padding: "10px",
        textAlign: "left",
        backgroundColor: "inherit",
        color: "inherit",
        borderRadius: "0.1875rem",
        fontWeight: 500,
        marginTop: -30,
      }}
    >
      <h4 style={{ fontWeight: 500 }}>
        The anchor tag must be unique and must not contain any spaces.
        <br />
        <br />
        You will need the slug of the page that the section is on, and a unique
        anchor tag to create a link.
        <br />
        <br />
        Format must follow /[page slug]#[anchor tag], <br />
        or #[anchor-tag] if linking to a section on the home page. Cannot
        contain spaces.
        <br />
        <br />
        Examples:
      </h4>
      <ul
        style={{
          fontSize: "1rem",
          fontWeight: 400,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          li: {
            padding: "0px 14px",
          },
        }}
      >
        <li>/about#awards</li>
        <li>/contact#contact-page-subscribe</li>
        <li>#events (this tag would lead to the home page)</li>
      </ul>
      <div
        style={{
          width: "calc(100% - 20px)",
          padding: "10px",
          borderBottom: `2px dotted ${border}`,
          color: "inherit",
        }}
      />
      <p>
        You will be able to add this anchor tag via link/button elsewhere in the
        site.
      </p>
    </div>
  );
};
