import fs from "fs";
import path from "path";
import { fallbackSiteSettings } from "./fallback-site-settings";
import { fallbackExperiences, fallbackProjects, fallbackCertifications, fallbackEducation } from "./fallback-data";
import type { SiteSettings, SanityExperience, SanityProject, SanityCertification, SanityEducation } from "./types";

export interface PortfolioData {
  siteSettings:   SiteSettings;
  experiences:    SanityExperience[];
  projects:       SanityProject[];
  certifications: SanityCertification[];
  education:      SanityEducation[];
}

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

export function getPortfolioData(): PortfolioData {
  try {
    const raw  = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      siteSettings:   data.siteSettings   ?? fallbackSiteSettings,
      experiences:    data.experiences    ?? fallbackExperiences,
      projects:       data.projects       ?? fallbackProjects,
      certifications: data.certifications ?? fallbackCertifications,
      education:      data.education      ?? fallbackEducation,
    };
  } catch {
    return {
      siteSettings:   fallbackSiteSettings,
      experiences:    fallbackExperiences,
      projects:       fallbackProjects,
      certifications: fallbackCertifications,
      education:      fallbackEducation,
    };
  }
}
