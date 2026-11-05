import { useState, useEffect } from "react";
import { inputClassString } from "@/modules/InputText/InputText";

export const InputCheckbox = ({
  name,
  inputRef,
  currentValue,
  options,
  register,
  className = "",
  submitted,
  onChange,
  label,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  // Reset on submit
  useEffect(() => {
    if (submitted) {
      setSelectedValues([]);
    }
  }, [submitted]);

  // Load initial value
  useEffect(() => {
    if (Array.isArray(currentValue)) {
      setSelectedValues(currentValue);
    }
  }, [currentValue]);

  const toggleValue = (value) => {
    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(updated);

    const joinedValue = updated.join(", ");

    // Sync with RHF hidden input
    if (inputRef?.current) {
      inputRef.current.value = joinedValue;
      const event = new Event("change", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }

    if (onChange) onChange(joinedValue);
  };

  const groupId = `checkbox-group-${name}`;

  return (
    <div
      className={`${className} ${inputClassString} flex flex-col gap-clamp-8`}
      role="group"
      aria-labelledby={groupId}
    >
      {/* Hidden input to integrate with RHF */}
      <input
        type="hidden"
        {...register(name)}
        ref={inputRef}
        value={selectedValues.join(", ")}
      />

      {/* Render each checkbox */}
      {options?.map((option) => (
        <label
          key={option.VALUE}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedValues.includes(option.VALUE)}
            onChange={() => toggleValue(option.VALUE)}
            className="cursor-pointer w-clamp-16 h-clamp-16 border-2 border-blue-200 bg-white accent-primary
            focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={option.LABEL}
          />
          <span className="text-body1">{option.LABEL}</span>
        </label>
      ))}
    </div>
  );
};
