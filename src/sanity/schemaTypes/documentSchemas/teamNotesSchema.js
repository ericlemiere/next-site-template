import { ComposeSparklesIcon } from "@sanity/icons/ComposeSparkles";

const teamNotesSchema = {
  name: "teamNotes",
  title: "Team Notes",
  type: "document",
  icon: ComposeSparklesIcon,
  fields: [
    {
      name: "notes",
      title: "Notes",
      type: "text",
    },
    {
      name: "lastUpdatedBy",
      title: "Last Updated By",
      type: "string",
    },
    {
      name: "lastUpdatedAt",
      title: "Last Updated At",
      type: "datetime",
    },
  ],
  __experimental_omnisearch_visibility: false,
};

export default teamNotesSchema;
