import { InputError } from "@/modules/InputError";

export const inputClassString = `relative w-full h-full text-body1 outline-primary border-2 border-transparent transition-all 
  rounded-form bg-gray hover:bg-lightgray hover:border-primary p-clamp-20`;

export const InputText = ({
  name,
  label,
  type,
  register,
  validations,
  className = "",
  currentValue = "",
  error = false,
  disabled,
  testId,
  isPhoneField = false,
}) => {
  const formatPhoneNumber = (value) => {
    if (!value) return value;

    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, "");

    // Format based on length
    if (phoneNumber.length < 4) {
      return phoneNumber;
    } else if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneInput = (e) => {
    if (isPhoneField) {
      const formatted = formatPhoneNumber(e.target.value);
      e.target.value = formatted;
    }
  };

  const errorId = error?.message ? `${name}-error` : undefined;
  const isRequired = validations?.required;

  return (
    <div className={`relative cursor-text ${className}`}>
      <input
        className={`${inputClassString} ${error ? "border-error!" : ""}`}
        type={type || "text"}
        id={name}
        {...register(name, validations)}
        data-testid={testId || "input"}
        disabled={disabled}
        onInput={handlePhoneInput}
        maxLength={isPhoneField ? 14 : undefined}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={errorId}
        aria-required={isRequired ? "true" : undefined}
        required={isRequired}
      />

      {error?.message && <InputError name={name} message={error.message} />}
    </div>
  );
};
