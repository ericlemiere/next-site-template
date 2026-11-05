import { InputError } from "@/modules/InputError";
import { inputClassString } from "@/modules/InputText/InputText";

export const InputTextarea = ({
  name,
  label,
  register,
  className = "",
  currentValue = "",
  error,
  validations,
}) => {
  const errorId = error?.message ? `${name}-error` : undefined;
  const isRequired = validations?.required;

  return (
    <div className={`relative cursor-text ${className}`}>
      <textarea
        className={`${inputClassString} ${error ? "border-error!" : ""}`}
        id={name}
        rows={10}
        name={name}
        {...register(name, validations)}
        data-testid="textarea"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={errorId}
        aria-required={isRequired ? "true" : undefined}
        required={isRequired}
      />

      {error?.message && <InputError name={name} message={error?.message} />}
    </div>
  );
};
