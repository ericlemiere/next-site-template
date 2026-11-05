import { useCallback, useEffect, useMemo } from "react";
import type { ObjectInputProps } from "sanity";
import { Stack, Card, Flex, Text, Box, Avatar } from "@sanity/ui";
import { Tooltip } from "@sanity/ui/tooltip";
import { set } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";

import { COLORS } from "@/utils/constants/colors";

import {
  ALIGN_OPTIONS,
  COLUMN_ALIGN_OPTIONS,
  FIELD_CONFIG,
  COLOR_KEYS,
  TEXT_KEYS,
  PADDING_KEYS,
} from "./SectionStyleInputConstants";

const LABEL_WIDTH = 160;
const outlineColor = "#A9A9A9";

// ===================================================== RENDER MAIN COMPONENT
export default function SectionStyleInput(props: ObjectInputProps) {
  const { value = {}, onChange } = props;
  const schemaDefaults = useMemo(
    () => props.schemaType?.options || {},
    [props.schemaType?.options]
  );
  const addRightAlignment = schemaDefaults?.addRightAlignment || false;
  const fieldsToRender = Object.keys(schemaDefaults);

  useEffect(() => {
    fieldsToRender.forEach((key) => {
      const defaultValue = schemaDefaults[key];
      if (!value[key] && defaultValue) {
        onChange(set(defaultValue, [key]));
      }
    });
  }, [fieldsToRender, value, onChange, schemaDefaults]);

  const handleChange = useCallback(
    (field: string, val: string) => {
      onChange(set(val, [field]));
    },
    [onChange]
  );

  // ===================================================== RENDER SECTION
  function renderSection(title: string, keys: string[]) {
    const sectionFields = FIELD_CONFIG.filter(
      (f) => fieldsToRender.includes(f.key) && keys.includes(f.key)
    );
    if (sectionFields.length === 0) return null;
    return (
      <Box>
        <Text
          size={4}
          weight="bold"
          style={{
            marginBottom: 24,
            padding: "4px 10px",
            backgroundColor: "lightgray",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          {title}
        </Text>
        <Stack gap={3}>
          {sectionFields.map((field, idx) => {
            const isLast = idx === sectionFields.length - 1;
            if (
              field.key === "textAlignment" ||
              field.key === "columnAlignment"
            ) {
              const description =
                field.key === "columnAlignment"
                  ? "The Column Alignment only works when the Column Width is less than 100%"
                  : "";
              return (
                <AlignmentField
                  key={field.key}
                  label={field.label}
                  value={
                    value[field.key] || schemaDefaults[field.key] || "left"
                  }
                  onChange={(val) => handleChange(field.key, val)}
                  noBorderBottom={isLast}
                  addRightAlignment={addRightAlignment}
                  useColumnAlignment={field.key === "columnAlignment"}
                  description={description}
                />
              );
            }
            if (field.type === "select") {
              return (
                <SelectField
                  key={field.key}
                  label={field.label}
                  value={value[field.key] || schemaDefaults[field.key]}
                  options={field.options}
                  onChange={(val) => handleChange(field.key, val)}
                  description={field.description || ""}
                  noBorderBottom={isLast}
                />
              );
            }
            return (
              <SwatchField
                key={field.key}
                label={field.label}
                value={value[field.key] || schemaDefaults[field.key]}
                options={field.options}
                onChange={(val) => handleChange(field.key, val)}
                noBorderBottom={isLast}
              />
            );
          })}
        </Stack>
      </Box>
    );
  }

  // ===================================================== RENDER MAIN COMPONENT
  return (
    <Card padding={4} radius={2} shadow={1} tone="transparent">
      <Stack gap={5}>
        {renderSection("Colors", COLOR_KEYS)}
        {renderSection("Text", TEXT_KEYS)}
        {renderSection("Padding", PADDING_KEYS)}
      </Stack>
    </Card>
  );
}

// ========================== ALIGNMENT FIELD
const AlignmentField = ({
  label,
  value,
  onChange,
  noBorderBottom,
  addRightAlignment = false,
  useColumnAlignment = false,
  description = "",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  noBorderBottom?: boolean;
  addRightAlignment?: boolean;
  useColumnAlignment?: boolean;
  description?: string;
}) => {
  // Use COLUMN_ALIGN_OPTIONS for columnAlignment field, otherwise use ALIGN_OPTIONS
  const baseOptions = useColumnAlignment ? COLUMN_ALIGN_OPTIONS : ALIGN_OPTIONS;
  // Only include 'right' alignment if addRightAlignment is true
  const alignmentOptions = addRightAlignment
    ? baseOptions
    : baseOptions.filter(({ key }) => key !== "right");

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={4}
      style={{
        flexWrap: "wrap",
        rowGap: 8,
        columnGap: 16,
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: noBorderBottom ? 0 : 20,
        borderBottom: noBorderBottom ? "none" : `1px solid ${outlineColor}80`,
      }}
    >
      <Box
        style={{
          minWidth: LABEL_WIDTH,
          flexShrink: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text size={2}>{label}</Text>
        {description && (
          <Tooltip
            animate
            fallbackPlacements={["right", "left"]}
            placement="right"
            portal
            content={
              <Text size={1} style={{ maxWidth: 220, whiteSpace: "normal" }}>
                {description}
              </Text>
            }
          >
            <Box style={{ display: "inline-flex", marginLeft: 4 }}>
              <HelpCircleIcon style={{ width: 24, height: 24 }} />
            </Box>
          </Tooltip>
        )}
      </Box>
      <Flex gap={2}>
        {alignmentOptions.map(({ key, icon: Icon, label }) => (
          <Tooltip
            key={key}
            content={<Text size={1}>{label}</Text>}
            placement="top"
          >
            <Box
              style={{
                cursor: "pointer",
                borderRadius: 4,
                padding: 6,
                border:
                  value === key
                    ? `2px solid ${outlineColor}`
                    : "2px solid transparent",
                transition: "all .2s ease",
              }}
              onClick={() => onChange(key)}
            >
              <Icon
                size={22}
                color={value === key ? COLORS.SECONDARY.VALUE : "#888"}
              />
            </Box>
          </Tooltip>
        ))}
      </Flex>
    </Flex>
  );
};

// ========================== SELECT FIELD
const SelectField = ({
  label,
  value,
  options,
  onChange,
  description,
  noBorderBottom,
}: {
  label: string;
  value: string;
  options: { title: string; value: string }[];
  onChange: (val: string) => void;
  description: string;
  noBorderBottom?: boolean;
}) => (
  <Flex
    align="center"
    justify="space-between"
    gap={4}
    style={{
      flexWrap: "wrap",
      rowGap: "8px",
      columnGap: "16px",
      flexDirection: "row",
      paddingTop: 10,
      paddingBottom: noBorderBottom ? 0 : 20,
      borderBottom: noBorderBottom ? "none" : `1px solid ${outlineColor}80`,
    }}
  >
    <Box
      style={{
        minWidth: LABEL_WIDTH,
        flexShrink: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text size={2}>{label}</Text>
      {description && (
        <Tooltip
          animate
          fallbackPlacements={["right", "left"]}
          placement="right"
          portal
          content={
            <Text size={1} style={{ maxWidth: 220, whiteSpace: "normal" }}>
              {description}
            </Text>
          }
        >
          <Box style={{ display: "inline-flex", marginLeft: 4 }}>
            <HelpCircleIcon style={{ width: 24, height: 24 }} />
          </Box>
        </Tooltip>
      )}
    </Box>
    <Box style={{ position: "relative", width: 180 }}>
      <select
        style={{
          width: "100%",
          fontSize: "1.1rem",
          padding: "0.3rem 1.8rem 0.3rem 0.3rem",
          borderRadius: 4,
          border: `1px solid rgba(150, 150, 150, 0.5)`,
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
        value={value}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.title}
          </option>
        ))}
      </select>
      <Box
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "#AAA",
          fontSize: 12,
          lineHeight: 1,
        }}
      >
        ▼
      </Box>
    </Box>
  </Flex>
);

// ========================== SWATCH FIELD
const SwatchField = ({
  label,
  value,
  options,
  onChange,
  noBorderBottom,
}: {
  label: string;
  value: string;
  options: { title: string; value: string }[];
  onChange: (val: string) => void;
  noBorderBottom?: boolean;
}) => {
  return (
    <Flex
      align="center"
      justify="flex-end"
      gap={2}
      style={{
        flexWrap: "wrap",
        rowGap: "8px",
        columnGap: "16px",
        flexDirection: "row",
        paddingTop: 4,
        paddingBottom: noBorderBottom ? 0 : 16,
        borderBottom: noBorderBottom ? "none" : `1px solid ${outlineColor}80`,
      }}
    >
      <Box
        style={{
          minWidth: LABEL_WIDTH,
          flexShrink: 0,
          textAlign: "left",
          marginRight: "auto",
        }}
      >
        <Text size={2}>{label}</Text>
      </Box>
      <Flex
        gap={0}
        justify="flex-end"
        style={{
          flexWrap: "wrap",
        }}
      >
        {options.map((opt) => {
          const isNoneColor =
            opt.title === "None" || opt.value === "transparent";
          return (
            <Tooltip
              key={opt.value}
              content={<Text size={1}>{opt.title}</Text>}
              placement="top"
              fallbackPlacements={["bottom"]}
            >
              <Card
                margin={0}
                style={{
                  boxShadow:
                    value === opt.value ? `0 0 0 2px ${outlineColor}` : "none",
                  transition: "all .2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  cursor: "pointer",
                  borderRadius: 8,
                  background: "transparent",
                  position: "relative",
                }}
                onClick={() => onChange(opt.value)}
              >
                <Avatar
                  size={2}
                  style={{
                    background: isNoneColor ? "transparent" : opt.value,
                    border: `2px solid ${outlineColor}`,
                    borderRadius: 4,
                    transition: "all .2s ease",
                    transform: value === opt.value ? "scale(1.2)" : "scale(1)",
                    minWidth: 40,
                    minHeight: 40,
                  }}
                />
                {isNoneColor && (
                  <div
                    style={{
                      position: "absolute",
                      width: "40px",
                      height: "2px",
                      background: outlineColor,
                      transform: "rotate(-45deg)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </Card>
            </Tooltip>
          );
        })}
      </Flex>
    </Flex>
  );
};
