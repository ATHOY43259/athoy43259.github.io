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
    <section id="about" ref={ref} className="py-28 sm:py-32 dark:bg-[#0f0f1a] bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#6c63ff] text-sm font-semibold uppercase tracking-[0.2em]">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-white">
            Who I <span className="gradient-text">Am</span>
          </h2>
          <div className="mt-5 h-1 w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

          {/* Left – bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="dark:text-slate-200 text-slate-700 text-base sm:text-xl leading-[1.8] mb-5 sm:mb-6 font-light">
              I&apos;m a{" "}
              <span className="text-[#a78bfa] font-semibold">Full Stack Developer</span>{" "}
              based in Dhaka, Bangladesh, with over a year of professional experience
              building production-grade web applications from the ground up.
            </p>
            <p className="dark:text-slate-400 text-slate-600 text-base sm:text-lg leading-[1.8] mb-5 sm:mb-6">
              Currently working as an{" "}
              <span className="text-[#38bdf8] font-medium">
                Associate Software Engineer at Cassetex
              </span>
              , I contribute across the full stack — from designing RESTful APIs and
              optimizing PostgreSQL databases to automating CI/CD pipelines on Linux
              VPS via GitHub Actions.
            </p>
            <p className="dark:text-slate-400 text-slate-600 text-base sm:text-lg leading-[1.8] mb-8 sm:mb-10">
              I hold a{" "}
              <span className="text-white font-semibold">B.Sc. in Computer Science and Engineering</span>{" "}
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
                  className="dark:bg-[#1a1a2e] bg-slate-50 border dark:border-[#2d2d4e] border-slate-200 rounded-2xl p-5 sm:p-6 text-center hover:border-[#6c63ff]/40 transition-all duration-200"
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-slate-400 text-sm mt-2 leading-tight whitespace-pre-line">{stat.label}</div>
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
                className="dark:bg-[#1a1a2e] bg-slate-50 border dark:border-[#2d2d4e] border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center gap-4
                           cursor-default hover:border-[#6c63ff]/50 hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-250"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6c63ff]/20 to-[#38bdf8]/20 border border-[#6c63ff]/30 flex items-center justify-center">
                  <item.icon size={24} className="text-[#a78bfa]" />
                </div>
                <div>
                  <div className="text-white font-bold text-base">{item.label}</div>
                  <div className="text-slate-500 text-sm mt-1 leading-snug">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
