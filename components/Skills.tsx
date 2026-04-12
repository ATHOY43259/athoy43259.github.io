"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SiLaravel, SiNextdotjs, SiReact, SiPostgresql, SiDocker,
  SiTailwindcss, SiGithubactions, SiTypescript, SiPhp, SiPython,
  SiSharp, SiMysql, SiFigma, SiPostman, SiGit, SiUbuntu, SiSelenium,
} from "react-icons/si";

type Skill = { name: string; level: number; color: string };

type TechBadge = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
};

const skillGroups: { category: string; skills: Skill[] }[] = [
  {
    category: "Frontend & Full-stack",
    skills: [
      { name: "Next.js", level: 90, color: "#6c63ff" },
      { name: "Laravel", level: 85, color: "#f97316" },
      { name: "PostgreSQL", level: 88, color: "#38bdf8" },
      { name: "React.js", level: 90, color: "#6c63ff" },
    ],
  },
  {
    category: "Backend & Tools",
    skills: [
      { name: "Python", level: 85, color: "#38bdf8" },
      { name: "JavaScript", level: 92, color: "#f59e0b" },
      { name: "Git/GitHub Actions", level: 88, color: "#a78bfa" },
      { name: "Docker", level: 75, color: "#38bdf8" },
    ],
  },
];

const techBadges: TechBadge[] = [
  { name: "Laravel",         icon: SiLaravel,        color: "#f55247" },
  { name: "Next.js",         icon: SiNextdotjs,      color: "#ffffff" },
  { name: "React.js",        icon: SiReact,          color: "#61dafb" },
  { name: "PostgreSQL",      icon: SiPostgresql,     color: "#336791" },
  { name: "Docker",          icon: SiDocker,         color: "#2496ed" },
  { name: "Tailwind CSS",    icon: SiTailwindcss,    color: "#38bdf8" },
  { name: "GitHub Actions",  icon: SiGithubactions,  color: "#2088ff" },
  { name: "TypeScript",      icon: SiTypescript,     color: "#3178c6" },
  { name: "PHP",             icon: SiPhp,            color: "#777bb3" },
  { name: "Python",          icon: SiPython,         color: "#3572a5" },
  { name: "C#",              icon: SiSharp,          color: "#9b4f96" },
  { name: "MySQL",           icon: SiMysql,          color: "#4479a1" },
  { name: "Figma",           icon: SiFigma,          color: "#f24e1e" },
  { name: "Postman",         icon: SiPostman,        color: "#ef5b25" },
  { name: "Git",             icon: SiGit,            color: "#f05032" },
  { name: "Ubuntu",          icon: SiUbuntu,         color: "#e95420" },
  { name: "Selenium",        icon: SiSelenium,       color: "#43b02a" },
];

function VerticalBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.8 }}
        className="text-xs font-semibold"
        style={{ color: skill.color }}
      >
        {skill.level}%
      </motion.span>

      <div className="relative w-full h-44 sm:h-52 bg-[#2d2d4e] rounded-xl overflow-hidden flex items-end">
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: `${skill.level}%` } : { height: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-full rounded-xl relative"
          style={{
            background: `linear-gradient(to top, ${skill.color}, ${skill.color}88)`,
            boxShadow: `0 0 16px ${skill.color}55`,
          }}
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
            }}
          />
        </motion.div>
      </div>

      <span className="text-sm text-slate-300 font-semibold text-center leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="skills" ref={ref} className="py-28 sm:py-32 dark:bg-[#0a0a14] bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#6c63ff] text-sm font-semibold uppercase tracking-[0.2em]">
            Technical Skills
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-white">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <div className="mt-5 h-1 w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
        </motion.div>

        {/* Vertical bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: gi * 0.18 }}
              className="dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 rounded-3xl p-8 sm:p-10"
            >
              <h3 className="text-white font-bold text-2xl mb-1">
                {group.category}
                <span className="text-[#6c63ff]">.</span>
              </h3>
              <p className="text-slate-500 text-sm mb-8 uppercase tracking-widest">
                Core technologies and proficiency levels
              </p>
              <div className="flex gap-5 sm:gap-6 items-end">
                {group.skills.map((skill, si) => (
                  <VerticalBar
                    key={skill.name}
                    skill={skill}
                    inView={inView}
                    delay={0.25 + gi * 0.12 + si * 0.12}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badge cloud with icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <p className="text-center text-slate-500 text-sm mb-10 uppercase tracking-[0.2em] font-medium">
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {techBadges.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.7, y: 14 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.65 + i * 0.045, type: "spring", stiffness: 220, damping: 14 }}
                  whileHover={{ scale: 1.12, y: -4 }}
                  className="group flex items-center gap-2.5 px-5 py-3 dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 rounded-full cursor-default
                             hover:border-transparent transition-all duration-250"
                  style={{
                    // subtle glow on hover comes from the ::before trick via inline shadow
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${tech.color}55`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${tech.color}60`;
                    (e.currentTarget as HTMLElement).style.background = `${tech.color}12`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "#2d2d4e";
                    (e.currentTarget as HTMLElement).style.background = "#1a1a2e";
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: tech.color }}
                    className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-base text-slate-300 group-hover:text-white transition-colors duration-200 whitespace-nowrap font-medium">
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
