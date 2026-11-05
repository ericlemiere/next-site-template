export const MenuLines = ({ isOpen }) => {
  const sharedClasses = "bg-primary h-0.75 rounded-2xl";
  return (
    <>
      <div
        id="menu-line-1"
        aria-hidden="true"
        className={`${sharedClasses} origin-left ${isOpen ? "w-9.5" : "w-7"}`}
        style={{
          transition: isOpen
            ? "transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6) 0.1s, width 0.2s ease-in-out"
            : "transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6), width 0.2s ease-in-out 0.3s",
          transform: isOpen
            ? "translateY(-4px) translateX(8px) rotate(45deg)"
            : "translateY(0) translateX(0) rotate(0deg)",
        }}
      />
      <div
        id="menu-line-2"
        aria-hidden="true"
        className={`${sharedClasses} w-7 origin-center ${isOpen ? "opacity-0" : "opacity-100"}`}
        style={{
          transition: isOpen
            ? "opacity 0.3s ease-out, transform 0.3s ease-out"
            : "opacity 0.3s ease-out 0.2s, transform 0.3s ease-out 0.2s",
          transform: isOpen
            ? "scale(0.8) rotate(180deg)"
            : "scale(1) rotate(0deg)",
        }}
      />
      <div
        id="menu-line-3"
        aria-hidden="true"
        className={`${sharedClasses} origin-left ${isOpen ? "w-9.5" : "w-7"}`}
        style={{
          transition: isOpen
            ? "transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6) 0.1s, width 0.2s ease-in-out"
            : "transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6), width 0.2s ease-in-out 0.3s",
          transform: isOpen
            ? "translateY(2px) translateX(8px) rotate(-45deg)"
            : "translateY(0) translateX(0) rotate(0deg)",
        }}
      />
    </>
  );
};
