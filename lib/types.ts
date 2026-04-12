/** Shared data types used by both Sanity responses and fallback data. */

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
