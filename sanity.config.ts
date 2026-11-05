"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";

// Import plugins
import { media } from "sanity-plugin-media";
import { dashboardTool } from "@sanity/dashboard";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { codeInput } from "@sanity/code-input";
import { muxInput } from "sanity-plugin-mux-input";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";

import { customDocumentActions } from "./src/sanity/plugins/customDocumentActions";
import { teamTasksPlugin } from "./src/sanity/plugins/teamTasks";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { locations } from "@/sanity/presentation/locations";

import { COLORS } from "@/utils/constants/colors";
import { sandbox, getValidTypeFilters } from "@/sanity/lib/configFunctions";

import CustomField from "./src/sanity/components/CustomSanity/CustomField";
//import CustomStringInput from "./src/sanity/components/CustomSanity/CustomStringInput";

export default defineConfig({
  name: "template",
  title: "Next Site Template", // TODO: update to your project title
  basePath: "/admin",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: schemaTypes,
  tasks: { enabled: false },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      title: "Site Preview",
      resolve: { locations },
      previewUrl: {
        initial: isDev
          ? "http://localhost:3000"
          : process.env.SANITY_STUDIO_PREVIEW_URL ||
            "https://next-site-template-el.vercel.app", // TODO: update to your deployed frontend URL
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),

    media(),
    muxInput(),

    dashboardTool({
      title: "Recent",
      widgets: [
        documentListWidget({
          title: "Drafts",
          query: `*[_id in path("drafts.**") && ${getValidTypeFilters()}]`,
          order: "_createdAt desc",
          layout: { width: "small" },
        }),
        documentListWidget({
          title: "Recently Edited",
          query: `*[_type != "teamNotes" && _type != "teamTask" && ${getValidTypeFilters()}] | order(_updatedAt desc)[0...10]`,
          layout: { width: "small" },
        }),
        documentListWidget({
          title: "Recently Created",
          query: `*[_type != "teamNotes" && _type != "teamTask" && ${getValidTypeFilters()}] | order(_createdAt desc)[0...10]`,
          layout: { width: "small" },
        }),
      ],
    }),

    // Only include visionTool in development
    teamTasksPlugin(),
    ...(isDev ? [visionTool({ defaultApiVersion: apiVersion })] : []),

    customDocumentActions(),
    codeInput(),
    unsplashImageAsset(),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: "rgba",
      defaultColorList: [
        // TODO: UPDATE
        { label: COLORS.WHITE.NAME, value: COLORS.WHITE.VALUE },
        { label: COLORS.BLACK.NAME, value: COLORS.BLACK.VALUE },
        { label: COLORS.PRIMARY.NAME, value: COLORS.PRIMARY.VALUE },
        { label: COLORS.PRIMARY_DARK.NAME, value: COLORS.PRIMARY_DARK.VALUE },
        {
          label: COLORS.PRIMARY_LIGHT.NAME,
          value: COLORS.PRIMARY_LIGHT.VALUE,
        },
        { label: COLORS.SECONDARY.NAME, value: COLORS.SECONDARY.VALUE },
        //{ label: "Custom...", value: "custom" },
      ],
    }),

    imageHotspotArrayPlugin(),
  ],
  tools: [sandbox()],

  form: {
    components: {
      field: CustomField,
      // input: (props) => {
      //   // If props.schemaType's name is 'string' and the title contains 'Meta',
      //   // render CustomStringInput. Otherwise, render the default input.
      //   const shouldUseCustomInput =
      //     props.schemaType?.title?.includes("Meta") &&
      //     (props.schemaType?.name === "string" ||
      //       props.schemaType?.name === "placeholderString");

      //   return shouldUseCustomInput
      //     ? CustomStringInput(props)
      //     : props.renderDefault(props);
      // },
    },
  },
});
