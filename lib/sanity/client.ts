import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production";

/** Returns true only when a real projectId is configured. */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

/** Lazily-created client — only instantiated when Sanity is configured. */
export const sanityClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;
