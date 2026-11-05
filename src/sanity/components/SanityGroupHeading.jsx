import { useTheme } from "@sanity/ui";
import { COLOR } from "@/utils/constants/colors";

export const SanityGroupHeading = (props) => {
  // To use this, you must use the placeholder field in the Schema
  const heading = props.elementProps.placeholder;
  const theme = useTheme();
  const darkMode = theme.sanity?.color?.dark || theme.sanity?.v2?.color?._dark;

  return (
    <div
      style={{
        padding: "14px 10px",
        margin: "-26px 0",
        fontSize: "1.4rem",
        fontWeight: 800,
        backgroundColor: darkMode
          ? "rgba(255,255,255,.8)"
          : "rgba(0, 0, 0, 0.7)",
        color: darkMode ? "black" : "white",
        textAlign: "center",
        border: `4px solid ${COLOR.SANITY_BORDER}`,
        borderRadius: 4,
      }}
    >
      {heading}
    </div>
  );
};
