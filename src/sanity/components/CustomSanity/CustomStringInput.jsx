import { useTheme, Stack, Text } from "@sanity/ui";

export default function CustomStringInput(props) {
  const theme = useTheme();
  const darkMode = theme.sanity?.color?.dark || theme.sanity?.v2?.color?._dark;
  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <Text
        size={1}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          color: darkMode ? "orange" : "#932F03",
        }}
      >
        Characters: {props.value?.length || 0}
      </Text>
    </Stack>
  );
}
