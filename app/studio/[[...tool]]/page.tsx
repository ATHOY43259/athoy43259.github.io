/**
 * Sanity Studio — admin panel.
 *
 * Dev mode  → run `npm run dev` and visit http://localhost:3000/studio
 * Production → this page is a static placeholder (studio not served on GitHub Pages)
 *
 * generateStaticParams must be in a server component with NO Sanity imports,
 * because Sanity Studio packages use browser-only APIs that crash the build.
 */
import StudioClient from "./StudioClient";

export function generateStaticParams() {
  // Generates only the root /studio/ page in the static export.
  // Sub-routes (/studio/settings etc.) are handled client-side by Sanity Studio.
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <StudioClient />;
}
