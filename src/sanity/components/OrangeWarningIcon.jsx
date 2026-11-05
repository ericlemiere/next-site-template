const OrangeWarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    style={{ width: "1em", height: "1em", transform: "scale(1.2)" }}
  >
    {/* Document body */}
    <path
      d="M14 2H4V22H20V8L14 2z"
      fill="none"
      stroke="#FF8C00"
      strokeWidth="1.8"
      strokeLinejoin="miter"
    />
    {/* Folded corner */}
    <path d="M14 2v6h6" fill="none" stroke="#FF8C00" strokeWidth="1.8" />
    {/* Document lines */}
    <path d="M8 13h8M8 17h8M8 9h2" stroke="#FF8C00" strokeWidth="1" />
  </svg>
);

export default OrangeWarningIcon;
