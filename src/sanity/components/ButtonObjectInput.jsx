// components/ButtonObjectInput.js
import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, Flex, Text } from "@sanity/ui";
import { ObjectInput, set } from "sanity";
import { unset } from "sanity";
import { PiCursorClick } from "react-icons/pi";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  defaultButtonColorOptions,
  buttonColorInitialValue,
} from "@/utils/constants/colors";

const ButtonObjectInput = React.forwardRef((props, ref) => {
  const { value, onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const useStandardComponent =
    props?.schemaType?.options?.useStandardComponent || false;

  // If useStandardComponent is true, render the default ObjectInput
  // This is useful for when using an array of buttons
  if (useStandardComponent) {
    return <ObjectInput {...props} ref={ref} />;
  }

  let buttonColor = value?.buttonColor || "";
  // Convert buttonColor value to its corresponding title for display
  for (const option of defaultButtonColorOptions) {
    if (buttonColor === option.value) {
      buttonColor = option.title;
      break;
    }
  }

  useEffect(() => {
    if (!value || !value.text) {
      // If there's no text, clear the buttonId
      if (value?.buttonId) {
        onChange(set("", ["buttonId"]));
      }
      return;
    }

    const { text, buttonId, __randomId } = value;

    // Step 1: Ensure we have a __randomId for uniqueness
    if (!__randomId) {
      const newRandomId = Math.random().toString(36).slice(2, 10);
      onChange(set(newRandomId, ["__randomId"]));
      return; // Exit and let the next render cycle handle buttonId generation
    }

    // Step 2: Generate buttonId using text and __randomId
    const formattedText = text.replace(/[^a-zA-Z0-9]+/g, "_").toLowerCase();
    const newButtonId = `${formattedText}-${__randomId}`;

    // Step 3: Update buttonId if it's different
    if (buttonId !== newButtonId) {
      onChange(set(newButtonId, ["buttonId"]));
    }
  }, [value?.text, value?.__randomId, value?.buttonId, onChange]);

  function isButtonEmpty(value) {
    if (!value) return true;
    // List all fields that should count as "filled"
    const fieldsToCheck = ["text", "buttonStyle", "url", "link"];
    return !fieldsToCheck.some((field) => value[field]);
  }

  const handleAddButton = () => {
    setIsModalOpen(true);
    onChange(set("_blank", ["target"]));
    onChange(set(buttonColorInitialValue, ["buttonColor"]));
  };

  const handleEditButton = () => {
    setIsModalOpen(true);
  };

  const handleDeleteButton = () => {
    onChange(unset());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      {isButtonEmpty(value) ? (
        // Show "Add Button" state
        <Box
          padding={3}
          style={{ border: "1px dashed #cad1dc", borderRadius: "3px" }}
        >
          <Flex align="center" justify="center" direction="column" gap={3}>
            <Button
              text="Add Button"
              tone="primary"
              icon={FaPlus}
              onClick={handleAddButton}
            />
          </Flex>
        </Box>
      ) : (
        // Show existing button preview only
        <Box
          padding={4}
          style={{
            border: "1px solid #e1e3e6",
            borderRadius: "3px",
            marginTop: 10,
          }}
        >
          <Flex align="center" justify="space-between" wrap={"wrap"} gap={2}>
            <Flex align="center" gap={3}>
              <PiCursorClick size={20} />
              <Box>
                <Text weight="medium" style={{ marginBottom: "10px" }}>
                  {value.text || "(Missing Text)"}
                </Text>
                <Text
                  size={1}
                  style={{ color: "#9ca0a7", marginBottom: "5px" }}
                >
                  {value.buttonStyle || "Style Not Set"} •{" "}
                  {buttonColor || "Color Not Set"}
                </Text>
              </Box>
            </Flex>
            <Flex gap={2} wrap={"wrap"} justify={"flex-end"}>
              <Button
                text="Edit"
                mode="ghost"
                icon={FaEdit}
                onClick={handleEditButton}
                style={{ minWidth: 90 }}
              />
              <Button
                text="Delete"
                mode="ghost"
                tone="critical"
                icon={FaTrash}
                onClick={handleDeleteButton}
                style={{ minWidth: 90 }}
              />
            </Flex>
          </Flex>
        </Box>
      )}

      {isModalOpen && (
        <ButtonModal
          buttonData={value}
          onClose={handleCloseModal}
          inputProps={props}
        />
      )}
    </Box>
  );
});

const ButtonModal = ({ buttonData, onClose, inputProps }) => (
  <Dialog
    header="Button Configuration"
    id="button-modal"
    onClose={onClose}
    onClickOutside={onClose}
    width={1}
  >
    <Box padding={4}>
      <ObjectInput {...inputProps} value={buttonData || {}} />
    </Box>
  </Dialog>
);

ButtonObjectInput.displayName = "ButtonObjectInput";

export default ButtonObjectInput;
