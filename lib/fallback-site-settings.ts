import type { SiteSettings } from "./types";

export const fallbackSiteSettings: SiteSettings = {
  // Hero
  heroName:         "Athoy Kanti Ray",
  heroTagline:
    "Full Stack Developer building scalable web applications using Laravel, Next.js, and PostgreSQL. " +
    "Passionate about clean APIs, CI/CD automation, and delivering user-centric software.",
  heroRoles:        ["Full Stack Developer", "Laravel Engineer", "Next.js Developer", "API Architect", "DevOps Enthusiast"],
  heroLocation:     "Dhaka, Bangladesh",
  heroEmail:        "athoykanti.roy1612@gmail.com",
  heroPhone:        "+8801735850987",
  heroGithub:       "https://github.com/ATHOY43259",
  heroLinkedin:     "https://www.linkedin.com/in/athoykanti",
  heroExpYears:     "1+",
  heroProjectCount: "3+",
  heroProfileImage: "/profile.jpg",

  // About
  aboutBio1:
    "I'm a Full Stack Developer based in Dhaka, Bangladesh, with over a year of professional experience " +
    "building production-grade web applications from the ground up.",
  aboutBio2:
    "Currently working as an Associate Software Engineer at Cassetex, I contribute across the full stack — " +
    "from designing RESTful APIs and optimizing PostgreSQL databases to automating CI/CD pipelines on Linux VPS via GitHub Actions.",
  aboutBio3:
    "I hold a B.Sc. in Computer Science and Engineering from American International University-Bangladesh (AIUB). " +
    "Passionate about clean architecture, secure systems, and continuously levelling up my craft.",
  aboutCompany: "Cassetex",
  aboutRole:    "Associate Software Engineer",
  aboutHighlights: [
    { label: "Frontend",   desc: "React.js & Next.js"       },
    { label: "Backend",    desc: "Laravel & ASP.NET"         },
    { label: "Database",   desc: "PostgreSQL & MySQL"        },
    { label: "DevOps",     desc: "CI/CD & Linux VPS"         },
    { label: "Teamwork",   desc: "Agile & Cross-functional"  },
    { label: "Deployment", desc: "GitHub Actions & SSH"      },
  ],
  aboutStats: [
    { value: "1+", label: "Years\nExperience" },
    { value: "3+", label: "Projects\nBuilt"   },
    { value: "8+", label: "Certifi-\ncations" },
  ],

  // Skills
  skillGroups: [
    {
      category: "Frontend & Full-stack",
      skills: [
        { name: "Next.js",    level: 90, color: "#6c63ff" },
        { name: "Laravel",    level: 85, color: "#f97316" },
        { name: "PostgreSQL", level: 88, color: "#38bdf8" },
        { name: "React.js",   level: 90, color: "#6c63ff" },
      ],
    },
    {
      category: "Backend & Tools",
      skills: [
        { name: "Python",      level: 85, color: "#38bdf8" },
        { name: "JavaScript",  level: 92, color: "#f59e0b" },
        { name: "Git / CI-CD", level: 88, color: "#a78bfa" },
        { name: "Docker",      level: 75, color: "#38bdf8" },
      ],
    },
  ],
  techBadges: [
    "Laravel", "Next.js", "React.js", "PostgreSQL", "Docker",
    "Tailwind CSS", "GitHub Actions", "TypeScript", "PHP",
    "Python", "C#", "MySQL", "Figma", "Postman", "Git",
    "Ubuntu", "Selenium",
  ],

  // Contact
  contactEmail:    "athoykanti.roy1612@gmail.com",
  contactPhone:    "+8801735850987",
  contactLocation: "Bashundhara R/A, Dhaka, Bangladesh",
  contactGithub:   "https://github.com/ATHOY43259",
  contactLinkedin: "https://www.linkedin.com/in/athoykanti",
  refName:         "Faisal Khan",
  refTitle:        "AGM / Sr SW Architect",
  refCompany:      "Link3 Technologies Ltd",

  // CTA
  ctaStats: [
    { value: "1+",   label: "Years Experience"   },
    { value: "3+",   label: "Projects Delivered" },
    { value: "8+",   label: "Certifications"     },
    { value: "100%", label: "Commitment"          },
  ],
};
