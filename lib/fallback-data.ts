/**
 * Fallback data — used when Sanity is not yet configured.
 * Once you add content in Sanity Studio the live data takes over automatically.
 */
import type {
  SanityExperience,
  SanityProject,
  SanityCertification,
  SanityEducation,
} from "./types";

export const fallbackExperiences: SanityExperience[] = [
  {
    company:   "Cassetex",
    role:      "Associate Software Engineer",
    type:      "Full-time",
    startDate: "2025-03-01",
    endDate:   null,
    current:   true,
    location:  "Mohakhali DOHS, Dhaka-1212",
    color:     "#6c63ff",
    points: [
      "Built and deployed scalable web applications using Next.js, Laravel, and PostgreSQL backends.",
      "Designed and integrated secure RESTful APIs, improving system interoperability across services.",
      "Deployed and maintained production systems on Linux VPS using GitHub Actions and secure SSH pipelines.",
      "Collaborated with cross-functional teams to enhance system performance and overall user experience.",
    ],
    tags:  ["Next.js", "Laravel", "PostgreSQL", "GitHub Actions", "Linux VPS"],
    order: 0,
  },
  {
    company:   "Smile Care Limited",
    role:      "UI/UX Designer – Intern",
    type:      "Internship",
    startDate: "2024-09-01",
    endDate:   "2025-01-01",
    current:   false,
    location:  "Banani, Dhaka",
    color:     "#38bdf8",
    points: [
      "Assisted in designing product interfaces, selecting typography, and ensuring brand consistency.",
      "Collaborated with the product team to create user-friendly design prototypes and style guides.",
    ],
    tags:  ["Figma", "Canva", "UI/UX Design"],
    order: 1,
  },
  {
    company:   "Kreatech",
    role:      "Front-End Developer – Intern",
    type:      "Internship",
    startDate: "2024-05-01",
    endDate:   "2024-08-01",
    current:   false,
    location:  "Baridhara, Dhaka",
    color:     "#a78bfa",
    points: [
      "Collaborated with designers and back-end teams to implement dynamic and responsive front-end interfaces.",
      "Utilized React.js, Tailwind CSS, and Git for efficient version-controlled development.",
      "Enhanced SEO performance and improved overall site load time by optimising assets and code.",
    ],
    tags:  ["React.js", "Tailwind CSS", "Git", "SEO"],
    order: 2,
  },
];

export const fallbackProjects: SanityProject[] = [
  {
    title:       "Traffic View in a City",
    year:        "2023",
    description: "An interactive simulation for managing traffic lights and vehicle movement in a virtual city. Features real-time traffic control with dynamic vehicle spawning and intersection management.",
    tools:       ["C++", "OpenGL"],
    github:      "https://github.com/ATHOY43259/trafficViewInaCity",
    live:        null,
    color:       "#6c63ff",
    order:       0,
  },
  {
    title:       "Pharmacy Management System",
    year:        "2022",
    description: "A robust backend system for pharmacy operations — managing medicines, pharmacists, inventory tracking, and prescriptions via a secure web API with full CRUD capabilities.",
    tools:       ["ASP.NET Web API", "C#", "Microsoft SQL Server"],
    github:      "https://github.com/ATHOY43259/Pharmacy-Management-System",
    live:        null,
    color:       "#38bdf8",
    order:       1,
  },
  {
    title:       "My Home – Web Application",
    year:        "2022",
    description: "An online hostel management application with role-based access control for managers and staff. Features room booking, tenant management, and an administrative dashboard.",
    tools:       ["HTML", "CSS", "PHP"],
    github:      "https://github.com/ATHOY43259/WebTechnology/tree/main/MG",
    live:        null,
    color:       "#a78bfa",
    order:       2,
  },
];

export const fallbackCertifications: SanityCertification[] = [
  { title: "Full Stack Software Developer Assessment",    issuer: "IBM / Coursera",      date: "2025",     link: "https://www.coursera.org/account/accomplishments/verify/RYJ9D4CIX51L",             color: "#6c63ff", order: 0 },
  { title: "IBM DevOps, Cloud, and Agile Foundations",   issuer: "IBM / Coursera",      date: "2025",     link: "https://www.coursera.org/account/accomplishments/specialization/3OG41WB79T3D",   color: "#a78bfa", order: 1 },
  { title: "Introduction to DevOps",                     issuer: "IBM / Coursera",      date: "Feb 2026", link: "https://www.coursera.org/account/accomplishments/verify/LP4THQPQJH33",             color: "#38bdf8", order: 2 },
  { title: "Introduction to Software Engineering",       issuer: "IBM / Coursera",      date: "Feb 2026", link: "https://www.coursera.org/account/accomplishments/verify/GZ15SU3IRAQ7",             color: "#6c63ff", order: 3 },
  { title: "Getting Started with Git and GitHub",        issuer: "IBM / Coursera",      date: "Nov 2025", link: "https://www.coursera.org/account/accomplishments/verify/NS3MZ8JHBNOD",             color: "#a78bfa", order: 4 },
  { title: "Introduction to Cloud Computing",            issuer: "IBM / Coursera",      date: "2025",     link: "https://www.coursera.org/account/accomplishments/verify/XQGSMI3ZS4K4",             color: "#38bdf8", order: 5 },
  { title: "Introduction to HTML, CSS, & JavaScript",   issuer: "IBM / Coursera",      date: "2025",     link: "https://www.coursera.org/account/accomplishments/verify/1NQONB26WV5D",             color: "#f97316", order: 6 },
  { title: "Quality Assurance and Software Testing",     issuer: "ICT Division EDGE",   date: "2024",     link: null,                                                                               color: "#10b981", order: 7 },
];

export const fallbackEducation: SanityEducation[] = [
  {
    degree:      "B.Sc. in Computer Science and Engineering",
    major:       "Computer Software Engineering",
    institution: "American International University-Bangladesh (AIUB)",
    location:    "Dhaka, Bangladesh",
    period:      "Jan 2020 – Jan 2024",
    grade:       "3.27 / 4.00",
    highlights: [
      "Software Engineering & System Design",
      "Full-Stack Application Development",
      "Algorithms & Data Structures",
      "Database Management Systems",
    ],
    order: 0,
  },
  {
    degree:      "Higher Secondary Certificate (H.S.C.)",
    major:       "Science Group",
    institution: "Srijanee Bidyaniketan-Dumki, Patuakhali",
    location:    "Barisal Board",
    period:      "2019",
    grade:       null,
    highlights:  [],
    order:       1,
  },
  {
    degree:      "Secondary School Certificate (S.S.C.)",
    major:       "Science Group",
    institution: "Srijanee Bidyaniketan-Dumki, Patuakhali",
    location:    "Barisal Board",
    period:      "2016",
    grade:       null,
    highlights:  [],
    order:       2,
  },
];
