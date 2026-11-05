import { textColorToTailwind } from "@/utils/constants/colors";

export const InputLabel = ({ name, label, validations, textColor, id }) => {
  const isRequired = validations?.required;
  const textColorClass = textColorToTailwind[textColor] || "text-black";

  return (
    <label
      id={id}
      className={`text-formLabel ${textColorClass} mb-clamp-8 block`}
      htmlFor={name}
    >
      {label}
      {isRequired && (
        <span className="ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};
