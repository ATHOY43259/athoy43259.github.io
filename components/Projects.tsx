"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { SanityProject } from "@/lib/types";

export default function Projects({ data }: { data: SanityProject[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="projects" ref={ref} className="py-28 sm:py-32 dark:bg-[#0a0a14] bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#6c63ff] text-sm font-semibold uppercase tracking-[0.2em]">Portfolio</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 dark:text-white text-slate-900">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-5 h-1 w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
          <p className="dark:text-slate-400 text-slate-500 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            A selection of projects showcasing my technical range across different domains and technologies.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {data.map((project, i) => (
            <motion.div
              key={project._id ?? project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 rounded-3xl overflow-hidden
                         transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${project.color}55`;
                (e.currentTarget as HTMLElement).style.boxShadow   = `0 24px 60px ${project.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.boxShadow   = "";
              }}
            >
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}55)` }} />

              <div className="p-7 sm:p-8 flex flex-col flex-1 gap-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${project.color}18`, border: `1.5px solid ${project.color}40` }}>
                    <Code2 size={22} style={{ color: project.color }} />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full border"
                    style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}12` }}>
                    {project.year}
                  </span>
                </div>

                <h3 className="dark:text-white text-slate-900 font-bold text-xl leading-snug group-hover:text-[#a78bfa] transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="dark:text-slate-400 text-slate-500 text-base leading-[1.8] flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="text-sm px-3 py-1 rounded-full font-medium"
                      style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}35` }}>
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 pt-5 border-t dark:border-[#2d2d4e] border-slate-100">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base dark:text-slate-400 text-slate-500 hover:dark:text-white hover:text-slate-900 transition-colors duration-200 font-medium">
                      <FaGithub size={18} />
                      Source Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base font-medium ml-auto" style={{ color: project.color }}>
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <a href="https://github.com/ATHOY43259" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-8 py-4 border dark:border-[#2d2d4e] border-slate-200 rounded-2xl
                         dark:text-slate-300 text-slate-600 hover:dark:text-white hover:text-slate-900
                         hover:border-[#6c63ff]/50 hover:bg-[#6c63ff]/8 text-base font-medium transition-all duration-200"
            >
              <FaGithub size={20} />
              View All Projects on GitHub
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
