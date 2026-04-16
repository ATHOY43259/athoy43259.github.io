/** Shared data types used by both Sanity responses and fallback data. */

export interface SiteSettings {
  // Hero
  heroName:         string;
  heroTagline:      string;
  heroRoles:        string[];
  heroLocation:     string;
  heroEmail:        string;
  heroPhone:        string;
  heroGithub:       string;
  heroLinkedin:     string;
  heroExpYears:     string;
  heroProjectCount: string;
  heroProfileImage: string;
  // About
  aboutBio1:        string;
  aboutBio2:        string;
  aboutBio3:        string;
  aboutCompany:     string;
  aboutRole:        string;
  aboutHighlights:  { label: string; desc: string }[];
  aboutStats:       { value: string; label: string }[];
  // Skills
  skillGroups:      { category: string; skills: { name: string; level: number; color: string }[] }[];
  techBadges:       string[];
  // Contact
  contactEmail:     string;
  contactPhone:     string;
  contactLocation:  string;
  contactGithub:    string;
  contactLinkedin:  string;
  refName:          string;
  refTitle:         string;
  refCompany:       string;
  // CTA
  ctaStats:         { value: string; label: string }[];
}

export interface SanityExperience {
  _id?:      string;
  company:   string;
  role:      string;
  type:      string;
  startDate: string;        // "YYYY-MM-DD"
  endDate:   string | null; // "YYYY-MM-DD" or null = current
  current:   boolean;
  location:  string;
  color:     string;
  points:    string[];
  tags:      string[];
  order?:    number;
}

export interface SanityProject {
  _id?:        string;
  title:       string;
  year:        string;
  description: string;
  tools:       string[];
  github:      string | null;
  live:        string | null;
  color:       string;
  order?:      number;
}

export interface SanityCertification {
  _id?:   string;
  title:  string;
  issuer: string;
  date:   string;
  link:   string | null;
  color:  string;
  order?: number;
}

export interface SanityEducation {
  _id?:        string;
  degree:      string;
  major:       string | null;
  institution: string;
  location:    string;
  period:      string;
  grade:       string | null;
  highlights:  string[];
  order?:      number;
}
