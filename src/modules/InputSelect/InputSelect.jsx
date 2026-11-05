import { useState, useEffect, useRef } from "react";
import { InputError } from "@/modules/InputError";
import { inputClassString } from "@/modules/InputText/InputText";

export const InputSelect = ({
  name,
  label,
  error,
  inputRef,
  currentValue,
  options,
  register,
  validations,
  className = "",
  submitted,
  clearErrors,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // This useEffect is for when the form is submitted
  // It resets the selected value and error state
  useEffect(() => {
    if (submitted) {
      setSelectedValue("");
      setIsError(false);
      setTouched(false);
    }
  }, [submitted]);

  useEffect(() => {
    setSelectedValue(currentValue);
  }, [currentValue]);

  // This useEffect is for when a user interacts with the select dropdown
  // but does not make a selection
  useEffect(() => {
    if (touched && validations?.required) {
      setIsError(selectedValue === undefined || selectedValue === "");
    }
  }, [selectedValue, touched, validations]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          setTouched(true); // Only mark as touched if dropdown was actually open
        }
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (!isOpen) {
      // Open dropdown with Space, Enter, or Arrow keys
      if ([" ", "Enter", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        setIsOpen(true);
        // Set initial focus to current selection or first option
        const currentIndex = options.findIndex(
          (opt) => opt.VALUE === selectedValue
        );
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
    } else {
      // Close with Escape
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        setTouched(true);
        setFocusedIndex(-1);
      }
      // Navigate options with Arrow keys
      else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        let nextIndex;

        if (event.key === "ArrowDown") {
          nextIndex = focusedIndex < options.length - 1 ? focusedIndex + 1 : 0;
        } else {
          nextIndex = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
        }

        setFocusedIndex(nextIndex);
      }
      // Select with Enter or Space
      else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex].VALUE);
        }
        setIsOpen(false);
        setTouched(true);
        setFocusedIndex(-1);
      }
    }
  };

  // Handle option selection
  const handleSelect = (value) => {
    setSelectedValue(value);
    setTouched(true);
    setIsOpen(false);
    setIsError(false); // Clear local error state

    // Update the form value through register
    if (inputRef?.current) {
      inputRef.current.value = value;
      // Trigger change event for react-hook-form
      const event = new Event("change", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }

    // Clear react-hook-form error
    if (clearErrors) {
      clearErrors(name);
    }

    if (onChange) {
      onChange(value);
    }
  };

  const getSelectedLabel = () => {
    const selected = options?.find((option) => option.VALUE === selectedValue);
    return selected?.LABEL || "";
  };

  return (
    <div className={`${className} relative`} ref={dropdownRef}>
      {/* Hidden native select for form submission */}
      <select
        className="sr-only"
        id={name}
        value={selectedValue}
        {...register(name, validations)}
        ref={inputRef}
        tabIndex={-1}
      >
        <option value="" disabled></option>
        {options?.map((option) => (
          <option key={option.VALUE} value={option.VALUE}>
            {option.LABEL}
          </option>
        ))}
      </select>

      <label
        id={`${name}-label`}
        className={`absolute top-1/2 transform -translate-y-1/2 left-clamp-20 z-10 pointer-events-none
          text-body1 text-darkgray transition-opacity ${selectedValue ? "opacity-0" : "opacity-100"}`}
        htmlFor={name}
      >
        Please select one
      </label>

      {/* Custom dropdown trigger */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) {
            setTouched(true); // Mark as touched when closing
            setFocusedIndex(-1);
          }
        }}
        onKeyDown={handleKeyDown}
        className={`${inputClassString} text-darkgray flex items-center justify-between gap-2 
          overflow-hidden ${error ? "border-error!" : ""} cursor-pointer`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${name}-label`}
        aria-controls={`${name}-listbox`}
        aria-invalid={error ? "true" : "false"}
      >
        <span
          className={`${selectedValue ? "text-black" : "text-transparent"} text-left w-0 truncate flex-1`}
        >
          {getSelectedLabel() || "placeholder"}
        </span>

        {/* Dropdown arrow */}
        <svg
          className={`w-clamp-28 h-clamp-28 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Custom dropdown menu */}
      <div
        className={`absolute z-20 w-full mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul
          id={`${name}-listbox`}
          className="bg-white border-2 border-gray rounded-form shadow-lg max-h-clamp-600 overflow-y-auto"
          role="listbox"
          aria-labelledby={`${name}-label`}
        >
          {options?.map((option, index) => (
            <li
              key={option.VALUE}
              id={`${name}-option-${option.VALUE}`}
              onClick={() => handleSelect(option.VALUE)}
              onMouseEnter={() => setFocusedIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(option.VALUE);
                }
              }}
              className={`cursor-pointer hover:bg-lightgray transition-colors text-body1 px-clamp-20 py-clamp-12
                border-b border-gray last:border-0
                ${selectedValue === option.VALUE ? "bg-lightgray font-semibold underline" : "list-none"}
                ${focusedIndex === index ? "bg-lightgray" : ""}`}
              role="option"
              aria-selected={selectedValue === option.VALUE}
              tabIndex={isOpen ? 0 : -1}
            >
              {option.LABEL}
            </li>
          ))}
        </ul>
      </div>

      {(error?.message || (isError && touched)) && (
        <InputError name={name} message={error?.message || "Required."} />
      )}
    </div>
  );
};
