"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, ExternalLink, CheckCircle } from "lucide-react";
import type { SanityCertification } from "@/lib/types";

export default function Certifications({ data }: { data: SanityCertification[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <section id="certifications" ref={ref} className="py-28 sm:py-32 dark:bg-[#0f0f1a] bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#6c63ff] text-sm font-semibold uppercase tracking-[0.2em]">Credentials</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 dark:text-white text-slate-900">
            My <span className="gradient-text">Certifications</span>
          </h2>
          <div className="mt-5 h-1 w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
          <p className="dark:text-slate-400 text-slate-500 text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            Professional certifications from IBM and ICT Division validating my skills in software engineering, DevOps, and cloud computing.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {data.map((cert, i) => (
            <motion.a
              key={cert._id ?? cert.title}
              href={cert.link ?? "#"}
              target={cert.link ? "_blank" : undefined}
              rel={cert.link ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group flex flex-col dark:bg-[#1a1a2e] bg-slate-50 border dark:border-[#2d2d4e] border-slate-200 rounded-3xl p-7 sm:p-8
                         transition-all duration-250 shadow-md hover:shadow-2xl"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${cert.color}50`;
                (e.currentTarget as HTMLElement).style.boxShadow   = `0 20px 50px ${cert.color}18`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.boxShadow   = "";
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${cert.color}20`, border: `1.5px solid ${cert.color}40` }}>
                  <Award size={22} style={{ color: cert.color }} />
                </div>
                {cert.link
                  ? <ExternalLink size={16} className="dark:text-slate-600 text-slate-400 group-hover:text-[#6c63ff] transition-colors mt-1" />
                  : <CheckCircle  size={16} className="dark:text-slate-600 text-slate-400 mt-1" />
                }
              </div>

              <h3 className="dark:text-white text-slate-900 font-bold text-base leading-snug mb-2 group-hover:text-[#a78bfa] transition-colors duration-200 flex-1">
                {cert.title}
              </h3>

              <p className="dark:text-slate-500 text-slate-400 text-sm mb-5">{cert.issuer}</p>

              <span className="inline-block self-start text-sm px-3 py-1 rounded-full font-semibold"
                style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}>
                {cert.date}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
