// Placeholder logo: replace with the client's logo SVG when setting up a project.
export const logo = () => (
  <svg
    id="Logo"
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="64"
    viewBox="0 0 120 64"
    // Pin the logo to the left of its container so header + footer logos line up
    // (keep this attribute when swapping in a client logo)
    preserveAspectRatio="xMinYMid meet"
    role="img"
    aria-label="Company Name Logo" // change label to company name
  >
    <rect
      x="1.5"
      y="1.5"
      width="117"
      height="61"
      fill="none"
      stroke="#000000"
      strokeWidth="3"
    />
    <text
      x="60"
      y="29"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="22"
      fontWeight="700"
      letterSpacing="2"
      fill="#000000"
    >
      LOGO
    </text>
    <text
      x="60"
      y="51"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="22"
      fontWeight="700"
      letterSpacing="2"
      fill="#000000"
    >
      HERE
    </text>
  </svg>
);
