"use client";

/**
 * Sanity Studio, embedded at /cms. Branded with TTR colors, grouped
 * sidebar, singletons that cannot be duplicated or deleted.
 */
import { buildLegacyTheme, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, singletonTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { StudioIcon } from "./sanity/StudioIcon";

const theme = buildLegacyTheme({
  "--black": "#07060b",
  "--white": "#f5f3fa",
  "--gray": "#6f6880",
  "--gray-base": "#6f6880",
  "--component-bg": "#0c0a13",
  "--component-text-color": "#f5f3fa",
  "--brand-primary": "#8a2fd0",
  "--default-button-color": "#6f6880",
  "--default-button-primary-color": "#8a2fd0",
  "--default-button-success-color": "#2f9e6e",
  "--default-button-warning-color": "#c58a1b",
  "--default-button-danger-color": "#d0435c",
  "--state-info-color": "#a66bff",
  "--state-success-color": "#2f9e6e",
  "--state-warning-color": "#c58a1b",
  "--state-danger-color": "#d0435c",
  "--main-navigation-color": "#07060b",
  "--main-navigation-color--inverted": "#f5f3fa",
  "--focus-color": "#a66bff",
});

export default defineConfig({
  name: "ttr",
  title: "TTR Digital Marketing",
  basePath: "/cms",
  projectId,
  dataset,
  icon: StudioIcon,
  theme,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Singletons do not appear in the "Create new" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Singletons can be edited and published, but not duplicated or deleted.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action)) : input,
  },
});
