import { Stack, Text, Box } from "@sanity/ui";
import { set, unset } from "sanity";
import { useCallback } from "react";
import styled from "styled-components";
import { SANITY_COLORS } from "../../utils/constants/colors";

const StyledSlider = styled.input`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: #e0e0e0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${SANITY_COLORS.BORDER};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2276fc;
    cursor: pointer;
    border: none;
  }

  &:hover {
    background: #d0d0d0;
  }
`;

export function SliderInput(props) {
  const { elementProps, onChange, value = 50 } = props;

  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(Number(nextValue)) : unset());
    },
    [onChange]
  );

  return (
    <Stack gap={3}>
      <Box>
        <StyledSlider
          {...elementProps}
          type="range"
          min={20}
          max={80}
          step={1}
          value={value}
          onChange={handleChange}
          onMouseEnter={(e) => (e.target.style.opacity = 1)}
          onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
        />
      </Box>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text size={2} muted>
          Column 1: {value}%
        </Text>
        <Text size={2} muted>
          Column 2: {100 - value}%
        </Text>
      </div>
    </Stack>
  );
}
