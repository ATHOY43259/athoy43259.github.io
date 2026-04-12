"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SiLaravel, SiNextdotjs, SiReact, SiPostgresql, SiDocker,
  SiTailwindcss, SiGithubactions, SiTypescript, SiPhp, SiPython,
  SiSharp, SiMysql, SiFigma, SiPostman, SiGit, SiUbuntu, SiSelenium,
} from "react-icons/si";

type Skill    = { name: string; level: number; color: string };
type TechBadge = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
};

const skillGroups: { category: string; skills: Skill[] }[] = [
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
];

const techBadges: TechBadge[] = [
  { name: "Laravel",        icon: SiLaravel,       color: "#f55247" },
  { name: "Next.js",        icon: SiNextdotjs,     color: "#ffffff" },
  { name: "React.js",       icon: SiReact,         color: "#61dafb" },
  { name: "PostgreSQL",     icon: SiPostgresql,    color: "#336791" },
  { name: "Docker",         icon: SiDocker,        color: "#2496ed" },
  { name: "Tailwind CSS",   icon: SiTailwindcss,   color: "#38bdf8" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
  { name: "TypeScript",     icon: SiTypescript,    color: "#3178c6" },
  { name: "PHP",            icon: SiPhp,           color: "#777bb3" },
  { name: "Python",         icon: SiPython,        color: "#3572a5" },
  { name: "C#",             icon: SiSharp,         color: "#9b4f96" },
  { name: "MySQL",          icon: SiMysql,         color: "#4479a1" },
  { name: "Figma",          icon: SiFigma,         color: "#f24e1e" },
  { name: "Postman",        icon: SiPostman,       color: "#ef5b25" },
  { name: "Git",            icon: SiGit,           color: "#f05032" },
  { name: "Ubuntu",         icon: SiUbuntu,        color: "#e95420" },
  { name: "Selenium",       icon: SiSelenium,      color: "#43b02a" },
];

function VerticalBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.8 }}
        className="text-[11px] sm:text-xs font-semibold"
        style={{ color: skill.color }}
      >
        {skill.level}%
      </motion.span>

      {/* Bar */}
      <div className="relative w-full h-28 sm:h-36 md:h-44 dark:bg-[#2d2d4e] bg-slate-200 rounded-lg sm:rounded-xl overflow-hidden flex items-end">
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: `${skill.level}%` } : { height: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-full rounded-lg sm:rounded-xl relative"
          style={{
            background: `linear-gradient(to top, ${skill.color}, ${skill.color}88)`,
            boxShadow: `0 0 12px ${skill.color}44`,
          }}
        >
          <div
            className="absolute inset-0 rounded-lg sm:rounded-xl"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
          />
        </motion.div>
      </div>

      {/* Label */}
      <span className="text-[10px] sm:text-xs dark:text-slate-300 text-slate-600 font-semibold text-center leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" ref={ref} className="py-16 sm:py-24 lg:py-32 dark:bg-[#0a0a14] bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-[#6c63ff] text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 dark:text-white text-slate-900">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <div className="mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
        </motion.div>

        {/* Bar chart cards */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: gi * 0.15 }}
              className="dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 overflow-hidden"
            >
              {/* Card heading */}
              <h3 className="dark:text-white text-slate-900 font-bold text-base sm:text-xl mb-0.5 sm:mb-1">
                {group.category}<span className="text-[#6c63ff]">.</span>
              </h3>
              <p className="dark:text-slate-500 text-slate-400 text-xs mb-4 sm:mb-6 uppercase tracking-wide">
                Proficiency levels
              </p>

              {/* Bars — always in a single row, sizes adapt via CSS */}
              <div className="flex gap-2 sm:gap-4 md:gap-5 items-end">
                {group.skills.map((skill, si) => (
                  <VerticalBar
                    key={skill.name}
                    skill={skill}
                    inView={inView}
                    delay={0.2 + gi * 0.1 + si * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-center dark:text-slate-500 text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium">
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {techBadges.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.75, y: 12 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.04, type: "spring", stiffness: 220, damping: 14 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="group flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5
                             dark:bg-[#1a1a2e] bg-white
                             border dark:border-[#2d2d4e] border-slate-200
                             rounded-full cursor-default transition-all duration-200"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow   = `0 0 12px ${tech.color}44`;
                    el.style.borderColor = `${tech.color}55`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow   = "";
                    el.style.borderColor = ""; // let the CSS class take over
                  }}
                >
                  <Icon
                    size={14}
                    style={{ color: tech.color }}
                    className="shrink-0"
                  />
                  <span className="text-xs sm:text-sm dark:text-slate-300 text-slate-700 font-medium whitespace-nowrap">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
