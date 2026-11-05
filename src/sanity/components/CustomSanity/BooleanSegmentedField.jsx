import { Button, Stack, Text } from "@sanity/ui";
import { set } from "sanity";
import styles from "./CustomField.module.css";

/**
 * Replaces Sanity's default boolean switch with a title/underline header that matches
 * the other fields (see `.booleanTitle` in CustomField.module.css),
 * followed by a segmented Yes / No control.
 */
export default function BooleanSegmentedField(props) {
  const { title, description, inputId, value, inputProps } = props;
  const readOnly = Boolean(inputProps?.readOnly);

  const choose = (next) => {
    if (readOnly || value === next) return;
    inputProps.onChange(set(next));
  };

  const options = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  return (
    <Stack gap={4}>
      <div className={styles.booleanHeader}>
        {title && (
          // Underline lives on this wrapper, not the Text: Sanity UI trims Text's
          // line-height box, so a border on the Text itself overlaps the glyphs.
          <div className={styles.booleanTitle}>
            <Text id={`${inputId}-title`} size={3} weight="bold">
              {title}
            </Text>
          </div>
        )}

        {description && (
          // Padding on a wrapper (not margin on Text): Sanity UI's Text uses negative
          // margins to trim its line box, which collapse with and cancel out a margin.
          <div className={styles.booleanDescription}>
            <Text size={1} muted>
              {description}
            </Text>
          </div>
        )}
      </div>

      <div
        className={styles.segmented}
        role="radiogroup"
        aria-labelledby={title ? `${inputId}-title` : undefined}
      >
        {options.map((option, i) => {
          // An unset value is treated as "No" (Sanity booleans default to undefined)
          const selected = option.value ? value === true : value !== true;
          return (
            <Button
              key={option.label}
              id={i === 0 ? inputId : undefined}
              role="radio"
              aria-checked={selected}
              text={option.label}
              mode={selected ? "default" : "ghost"}
              tone={selected ? "primary" : "default"}
              fontSize={2}
              padding={3}
              disabled={readOnly}
              onClick={() => choose(option.value)}
              className={styles.segmentedButton}
            />
          );
        })}
      </div>
    </Stack>
  );
}
