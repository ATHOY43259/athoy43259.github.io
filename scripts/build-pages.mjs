/**
 * Temporarily patches next.config.ts with output:"export" + trailingSlash,
 * runs `next build`, then restores the original file.
 * Run via: npm run build:pages
 */
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const CONFIG = "next.config.ts";
const original = readFileSync(CONFIG, "utf-8");

const patched = original.replace(
  "images: {",
  `output: "export",\n  trailingSlash: true,\n  images: {`
);

try {
  writeFileSync(CONFIG, patched);
  console.log("▶ Building static export for GitHub Pages…");
  execSync("next build", { stdio: "inherit" });
} finally {
  writeFileSync(CONFIG, original);
  console.log("✔ next.config.ts restored.");
}
