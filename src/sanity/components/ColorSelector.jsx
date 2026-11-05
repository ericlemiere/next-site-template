import { Avatar, Card, Flex, Stack, Text, useTheme } from "@sanity/ui";
import { Tooltip } from "@sanity/ui/tooltip";
import React, { useCallback } from "react";
import { set } from "sanity";

const ColorSwatch = ({ colorName, color, active, onClickHandler }) => {
  const theme = useTheme();
  const darkMode = theme.sanity?.color?.dark || theme.sanity?.v2?.color?._dark;
  const outlineColor = darkMode ? "darkgray" : "lightgray";
  const isNoneColor = !color || colorName === "None";

  return (
    <Tooltip
      content={<Text size={1}>{colorName + " " + (color || "")}</Text>}
      placement="top"
      fallbackPlacements={["bottom"]}
    >
      <Card
        paddingLeft={2}
        paddingRight={2}
        paddingBottom={4}
        margin={0}
        style={{
          border: active
            ? `2px solid ${outlineColor}`
            : `2px solid transparent`,
          transition: "all .2s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          cursor: "pointer",
          borderRadius: 10,
        }}
        onClick={() => onClickHandler(color)}
      >
        <div
          style={{
            borderRadius: 4,
            transition: "all .2s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
            transform: active ? "scale(1.2)" : "scale(1)",
            position: "relative",
          }}
        >
          <Avatar
            size={3}
            style={{
              background: isNoneColor ? "transparent" : color,
              border: `2px solid ${outlineColor}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: 4,
              transition: "all .2s ease",
            }}
          />
          {isNoneColor && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "2px",
                background: outlineColor,
                transform: "rotate(-45deg)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </Card>
    </Tooltip>
  );
};

const ColorSelector = ({ value = "", onChange, withHexInput, schemaType }) => {
  const list = schemaType?.options?.list;

  const handleSelect = useCallback(
    (color) => {
      if (color && color !== value) {
        onChange(set(color));
      }
    },
    [onChange, value]
  );

  return (
    <Stack gap={3}>
      {list && (
        <Card borderTop={withHexInput} paddingTop={withHexInput ? 3 : 0}>
          {withHexInput && (
            <Text size={1} style={{ marginBottom: ".5em" }}>
              or select color below
            </Text>
          )}
          <Flex direction={"row"} wrap={"wrap"} justify="flex-start">
            {list.map((colorItem) => {
              return (
                <ColorSwatch
                  key={colorItem.value}
                  colorName={colorItem.title}
                  color={
                    colorItem.value === "transparent" ? "" : colorItem.value
                  }
                  active={colorItem.value === value}
                  onClickHandler={handleSelect}
                />
              );
            })}
          </Flex>
        </Card>
      )}
    </Stack>
  );
};

export default ColorSelector;
