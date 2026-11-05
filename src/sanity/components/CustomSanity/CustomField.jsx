import { useTheme, Stack, Text, Card } from "@sanity/ui";
import { SANITY_COLORS } from "@/utils/constants/colors";
import styles from "./CustomField.module.css";

export default function CustomField(props) {
  // const theme = useTheme();
  // const darkMode = theme.sanity?.color?.dark || theme.sanity?.v2?.color?._dark;

  const hasError = props.validation?.length > 0;
  const errorMessage = props.validation?.[0]?.message;
  const isWarning = props.validation?.[0]?.level === "warning";

  const borderColor = hasError
    ? isWarning
      ? SANITY_COLORS.WARNING
      : SANITY_COLORS.ERROR
    : SANITY_COLORS.BORDER;

  const errorTextColor = isWarning
    ? SANITY_COLORS.WARNING
    : SANITY_COLORS.ERROR;

  // Check if this is an image-related field that should have dotted border
  const isObjectNestedField =
    props.title === "Image File" ||
    props.title === "Alt Text" ||
    props.title === "Image Title" ||
    props.title === "Image Link" ||
    props.title === "Modal Title" ||
    props.title === "Image Call To Action" ||
    props.title === "Modal Body";

  // Check if title is a single space (no border should render)
  const isHiddenTitle = props.title === " ";

  const isBooleanField = props.schemaType?.jsonType === "boolean";

  return (
    <Card>
      <Stack gap={3}>
        <div
          className={`${styles.fieldWrapper} ${isObjectNestedField ? styles.imageField : ""} ${isHiddenTitle ? styles.noBorder : ""} ${isBooleanField ? styles.booleanField : ""}`}
          style={{
            "--border-color": borderColor,
            position: "relative",
            transition: "all 0.2s ease",
          }}
        >
          {props.renderDefault({ ...props, validation: [] })}
        </div>

        {hasError && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {isWarning ? (
              <svg
                fill={errorTextColor}
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
              </svg>
            ) : (
              <svg
                fill={errorTextColor}
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
              </svg>
            )}
            <Text
              size={2}
              style={{
                color: errorTextColor,
              }}
            >
              {errorMessage}
            </Text>
          </div>
        )}
      </Stack>
    </Card>
  );
}
