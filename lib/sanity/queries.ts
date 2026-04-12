import { sanityClient, isSanityConfigured } from "./client";
import {
  fallbackExperiences,
  fallbackProjects,
  fallbackCertifications,
  fallbackEducation,
} from "@/lib/fallback-data";
import type {
  SanityExperience,
  SanityProject,
  SanityCertification,
  SanityEducation,
} from "@/lib/types";

async function fetchOrFallback<T>(query: string, fallback: T[]): Promise<T[]> {
  if (!isSanityConfigured || !sanityClient) return fallback;
  try {
    const data = await sanityClient.fetch<T[]>(query, {}, { next: { revalidate: 60 } });
    return data?.length ? data : fallback;
  } catch {
    return fallback;
  }
}

export const getExperiences = () =>
  fetchOrFallback<SanityExperience>(`*[_type == "experience"] | order(order asc)`, fallbackExperiences);

export const getProjects = () =>
  fetchOrFallback<SanityProject>(`*[_type == "project"] | order(order asc)`, fallbackProjects);

export const getCertifications = () =>
  fetchOrFallback<SanityCertification>(`*[_type == "certification"] | order(order asc)`, fallbackCertifications);

export const getEducation = () =>
  fetchOrFallback<SanityEducation>(`*[_type == "education"] | order(order asc)`, fallbackEducation);
