import {
  backgroundToTailwind,
  textColorToTailwind,
  COLOR,
} from "@/utils/constants/colors";

interface FormButtonProps {
  submitting?: boolean;
  onSubmit?: () => void;
  className?: string;
  children: React.ReactNode;
  errors?: object;
  backgroundColor?: string;
  textColor?: string;
}

export const FormButton = ({
  children,
  className,
  submitting = false,
  onSubmit,
  errors,
  backgroundColor = COLOR.PRIMARY,
  textColor = COLOR.WHITE,
}: FormButtonProps) => {
  const hasErrors = errors && Object.keys(errors).length > 0;

  const bgColor = backgroundToTailwind[backgroundColor];
  const txtColor = textColorToTailwind[textColor];

  return (
    <div className="relative w-full flex items-center gap-4">
      <button
        className={`w-fit flex items-center justify-center text-center
        transition-all duration-150 ease-in-out shadow-black/20 p-1
        relative rounded-button ${txtColor}
        ${hasErrors || submitting ? "bg-gray" : `${bgColor} opacity-100 hover:shadow-lg hover:translate-y-0.5 hover:scale-110 cursor-pointer`} 
        ${className}`}
        onClick={onSubmit}
        disabled={hasErrors || submitting}
        type="submit"
        aria-live="polite"
        aria-busy={submitting}
      >
        <div
          className={`text-button flex items-end pt-clamp-16 pb-clamp-14 px-clamp-30 rounded-button
        ${hasErrors || submitting ? "bg-gray" : `${bgColor} cursor-pointer`} `}
        >
          {!submitting ? (
            children
          ) : (
            <>
              Submitting
              <span
                id="dot1"
                className="bg-current ml-2 mb-px h-1.25 w-1.25 rounded-full inline-block"
                aria-hidden="true"
              />
              <span
                id="dot2"
                className="bg-current ml-1.5 mb-px h-1.25 w-1.25 rounded-full inline-block"
                aria-hidden="true"
              />
              <span
                id="dot3"
                className="bg-current ml-1.5 mb-px h-1.25 w-1.25 rounded-full inline-block"
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </button>
      {hasErrors && (
        <div className="w-fit text-error">
          Please fill out all required fields
        </div>
      )}
    </div>
  );
};
