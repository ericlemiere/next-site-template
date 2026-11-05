export const InputError = ({ name, message }) => {
  const errorId = message ? `${name}-error` : undefined;

  return (
    <div
      id={errorId}
      className="absolute right-2 mt-1 z-0 flex items-center gap-1 text-error"
      role="alert"
      aria-live="polite"
    >
      <svg 
        className="w-clamp-16 h-clamp-16 shrink-0" 
        fill="currentColor" 
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
          clipRule="evenodd" 
        />
      </svg>
      {message}
    </div>
  );
};
