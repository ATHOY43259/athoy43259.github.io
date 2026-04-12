"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Server, Database, GitBranch, Users, Rocket } from "lucide-react";

const highlights = [
  { icon: Code2,     label: "Frontend",   desc: "React.js & Next.js" },
  { icon: Server,    label: "Backend",    desc: "Laravel & ASP.NET"  },
  { icon: Database,  label: "Database",   desc: "PostgreSQL & MySQL" },
  { icon: GitBranch, label: "DevOps",     desc: "CI/CD & Linux VPS"  },
  { icon: Users,     label: "Teamwork",   desc: "Agile & Cross-functional" },
  { icon: Rocket,    label: "Deployment", desc: "GitHub Actions & SSH" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="about" ref={ref} className="py-14 sm:py-20 lg:py-28 dark:bg-[#0f0f1a] bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="text-[#6c63ff] text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 dark:text-white text-slate-900">
            Who I <span className="gradient-text">Am</span>
          </h2>
          <div className="mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-start">

          {/* Left – bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="dark:text-slate-200 text-slate-700 text-sm sm:text-base lg:text-xl leading-[1.8] mb-4 sm:mb-5 font-light">
              I&apos;m a{" "}
              <span className="text-[#a78bfa] font-semibold">Full Stack Developer</span>{" "}
              based in Dhaka, Bangladesh, with over a year of professional experience
              building production-grade web applications from the ground up.
            </p>
            <p className="dark:text-slate-400 text-slate-600 text-sm sm:text-base lg:text-lg leading-[1.8] mb-4 sm:mb-5">
              Currently working as an{" "}
              <span className="text-[#38bdf8] font-medium">
                Associate Software Engineer at Cassetex
              </span>
              , I contribute across the full stack — from designing RESTful APIs and
              optimizing PostgreSQL databases to automating CI/CD pipelines on Linux
              VPS via GitHub Actions.
            </p>
            <p className="dark:text-slate-400 text-slate-600 text-sm sm:text-base lg:text-lg leading-[1.8] mb-6 sm:mb-8">
              I hold a{" "}
              <span className="dark:text-white text-slate-900 font-semibold">B.Sc. in Computer Science and Engineering</span>{" "}
              from American International University-Bangladesh (AIUB). Passionate
              about clean architecture, secure systems, and continuously levelling
              up my craft.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { value: "1+",  label: "Years\nExperience" },
                { value: "3+",  label: "Projects\nBuilt"    },
                { value: "8+",  label: "Certifi-\ncations"  },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="dark:bg-[#1a1a2e] bg-slate-50 border dark:border-[#2d2d4e] border-slate-200 rounded-2xl p-3 sm:p-5 text-center hover:border-[#6c63ff]/40 transition-all duration-200"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-tight whitespace-pre-line">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.08 }}
                whileHover={{ scale: 1.04, y: -5 }}
                className="dark:bg-[#1a1a2e] bg-slate-50 border dark:border-[#2d2d4e] border-slate-200 rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center text-center gap-3
                           cursor-default hover:border-[#6c63ff]/50 hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-250"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#6c63ff]/20 to-[#38bdf8]/20 border border-[#6c63ff]/30 flex items-center justify-center">
                  <item.icon size={18} className="text-[#a78bfa]" />
                </div>
                <div>
                  <div className="dark:text-white text-slate-800 font-bold text-sm sm:text-base">{item.label}</div>
                  <div className="text-slate-500 text-xs sm:text-sm mt-0.5 leading-snug">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
