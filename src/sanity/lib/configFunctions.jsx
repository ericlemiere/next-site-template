import { schemaTypes } from "../schemaTypes";

export const sandbox = () => {
  // Use localhost in development, production URL otherwise
  const isDevelopment = process.env.NODE_ENV === "development";
  const URL = isDevelopment
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_SITE_URL ||
      "https://riff-template-app.vercel.app";

  return {
    title: "Sandbox",
    name: "sandbox",
    component: () => (
      <iframe
        style={{ width: "100%", height: "100%", border: "none" }}
        src={`${URL}/sandbox`}
        title="Component Sandbox"
      />
    ),
  };
};

export const getValidTypeFilters = () => {
  // Safety check for CLI environments where schemaTypes might not be available
  if (!schemaTypes || !schemaTypes.types || !Array.isArray(schemaTypes.types)) {
    return `_type in []`; // Return empty filter if schema types not available
  }

  const documentTypes = schemaTypes.types
    .filter((schema) => schema.type === "document")
    .map((schema) => schema.name)
    .filter((name) => name !== "teamNotes" && name !== "teamTask");
  return `_type in [${documentTypes.map((t) => `"${t}"`).join(", ")}]`;
};
