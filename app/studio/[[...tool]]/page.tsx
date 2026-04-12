"use client";

/**
 * Sanity Studio — admin panel for the portfolio.
 * Accessible at /studio  (only you have the Sanity account login)
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
