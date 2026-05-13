"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { SanityCertification } from "@/lib/types";

const BADGE_STYLES: Record<string, string> = {
  "Professional Certificate": "bg-[#6c63ff] text-white",
  "Specialization":           "bg-[#a78bfa] text-white",
};

function CertCard({ cert, index, inView }: { cert: SanityCertification; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const courseCount = cert.courses?.length ?? 0;
  const badgeClass  = cert.badge ? (BADGE_STYLES[cert.badge] ?? "bg-slate-500 text-white") : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="dark:bg-[#13132a] bg-white border dark:border-[#252545] border-slate-200 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Card body */}
      <div className="p-6 sm:p-7">

        {/* Row 1: icon + meta */}
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 size={22} style={{ color: cert.color }} className="shrink-0" />
          {cert.badge && (
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeClass}`}>
              {cert.badge}
            </span>
          )}
          <span className="dark:text-slate-400 text-slate-500 text-sm">{cert.date}</span>
          {courseCount > 0 && (
            <span className="dark:text-slate-400 text-slate-500 text-sm">
              {courseCount} courses
            </span>
          )}
        </div>

        {/* Row 2: title */}
        <h3 className="text-lg sm:text-xl font-bold dark:text-white text-slate-900 leading-snug mb-1">
          {cert.title}
        </h3>

        {/* Row 3: issuer */}
        <p className="text-sm dark:text-slate-400 text-slate-500 mb-2">{cert.issuer}</p>

        {/* Row 4: description */}
        {cert.description && (
          <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed mb-5">
            {cert.description}
          </p>
        )}

        {/* Row 5: verify + toggle */}
        <div className="flex items-center justify-between gap-4 mt-4">
          {cert.link ? (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6c63ff] hover:underline"
            >
              <ExternalLink size={13} />
              Verify
            </a>
          ) : (
            <span />
          )}

          {courseCount > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#6c63ff] hover:underline"
            >
              {expanded ? "Hide courses" : "Show courses"}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* Expandable courses */}
      <AnimatePresence initial={false}>
        {expanded && cert.courses && (
          <motion.div
            key="courses"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="dark:bg-[#0d0d22] bg-slate-50 border-t dark:border-[#252545] border-slate-200 px-6 sm:px-7 py-5">
              <p className="text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400 mb-4">
                Courses Included
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {cert.courses.map((course, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="mt-[7px] w-[6px] h-[6px] rounded-full shrink-0"
                      style={{ background: cert.color }}
                    />
                    {course.link ? (
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#6c63ff] hover:underline leading-snug"
                      >
                        {course.title}
                      </a>
                    ) : (
                      <span className="text-sm dark:text-slate-400 text-slate-600 leading-snug">
                        {course.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Certifications({ data }: { data: SanityCertification[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <section id="certifications" ref={ref} className="py-14 sm:py-20 lg:py-28 dark:bg-[#0f0f1a] bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <span className="text-[#6c63ff] text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 dark:text-white text-slate-900">
            Certifications<span className="text-[#6c63ff]">.</span>
          </h2>
          <p className="dark:text-slate-400 text-slate-500 text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed">
            Professional certificates and courses from leading institutions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {data.map((cert, i) => (
            <CertCard key={cert._id ?? cert.title} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
