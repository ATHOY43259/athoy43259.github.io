import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  // "not-configured" is a valid placeholder — only lowercase/digits/dashes allowed by Sanity
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "not-configured",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  title:     "Portfolio Admin",
  basePath:  "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio Content")
          .items([
            S.listItem().title("Experience").schemaType("experience").child(S.documentTypeList("experience")),
            S.listItem().title("Projects").schemaType("project").child(S.documentTypeList("project")),
            S.listItem().title("Certifications").schemaType("certification").child(S.documentTypeList("certification")),
            S.listItem().title("Education").schemaType("education").child(S.documentTypeList("education")),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
