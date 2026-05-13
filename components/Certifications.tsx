"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, ExternalLink, ChevronDown, BookOpen, Award } from "lucide-react";
import type { SanityCertification } from "@/lib/types";

const BADGE_STYLES: Record<string, string> = {
  "Professional Certificate": "bg-[#6c63ff] text-white",
  "Specialization":           "bg-[#7c3aed] text-white",
};

function CertCard({ cert, index, inView }: { cert: SanityCertification; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const courseCount = cert.courses?.length ?? 0;
  const linkedCount = cert.courses?.filter((c) => c.link).length ?? 0;
  const badgeClass = cert.badge ? (BADGE_STYLES[cert.badge] ?? "bg-slate-600 text-white") : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl dark:bg-[#12122a] bg-white
                 border dark:border-[#2a2a4a] border-slate-200
                 shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_30px_rgba(0,0,0,0.3)]
                 hover:shadow-[0_8px_40px_rgba(108,99,255,0.15)] dark:hover:shadow-[0_8px_50px_rgba(108,99,255,0.2)]
                 transition-all duration-400"
    >
      {/* Colored left border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ background: `linear-gradient(180deg, ${cert.color}, ${cert.color}44)` }}
      />

      <div className="pl-7 pr-6 sm:pl-8 sm:pr-7 pt-6 pb-6">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${cert.color}18`, border: `1.5px solid ${cert.color}35` }}
            >
              <Award size={18} style={{ color: cert.color }} />
            </div>

            {/* Badge + meta */}
            <div>
              {cert.badge && (
                <span className={`inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md mb-1 ${badgeClass}`}>
                  {cert.badge}
                </span>
              )}
              <div className="flex items-center gap-2 text-xs dark:text-slate-500 text-slate-400">
                <span>{cert.date}</span>
                {courseCount > 0 && (
                  <>
                    <span className="opacity-40">•</span>
                    <span>{courseCount} courses</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Verify link — top right */}
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                         dark:bg-[#1e1e40] bg-slate-100 border dark:border-[#2d2d55] border-slate-200
                         dark:text-slate-300 text-slate-600 hover:opacity-80 transition-opacity"
            >
              <ExternalLink size={11} />
              Verify
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900 leading-snug mb-1">
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="text-sm dark:text-slate-500 text-slate-400 mb-3">{cert.issuer}</p>

        {/* Description */}
        {cert.description && (
          <p className="text-sm dark:text-slate-400 text-slate-500 leading-relaxed mb-5">
            {cert.description}
          </p>
        )}

        {/* Toggle */}
        {courseCount > 0 && (
          <motion.button
            onClick={() => setExpanded((v) => !v)}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl
                       dark:bg-[#1e1e40] bg-slate-100 border dark:border-[#2d2d55] border-slate-200
                       dark:text-slate-300 text-slate-600 hover:opacity-80 transition-opacity"
          >
            <BookOpen size={13} style={{ color: cert.color }} />
            {expanded ? "Hide courses" : `Show ${courseCount} courses`}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={14} />
            </motion.span>
          </motion.button>
        )}
      </div>

      {/* Courses panel */}
      <AnimatePresence initial={false}>
        {expanded && cert.courses && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="dark:bg-[#0d0d22] bg-slate-50 border-t dark:border-[#1e1e3e] border-slate-100 pl-7 pr-6 sm:pl-8 sm:pr-7 pt-5 pb-6">

              {/* Panel header */}
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 size={14} style={{ color: cert.color }} />
                <span className="text-xs font-bold uppercase tracking-widest dark:text-slate-500 text-slate-400">
                  Individual Course Certificates
                </span>
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${cert.color}18`, color: cert.color }}
                >
                  {linkedCount}/{courseCount} linked
                </span>
              </div>

              {/* Course list */}
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-0">
                {cert.courses.map((course, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.025 }}
                    className="flex items-center gap-3 py-2 border-b dark:border-white/[0.04] border-slate-100 last:border-0"
                  >
                    <span
                      className="text-[11px] font-bold tabular-nums w-5 shrink-0 text-right"
                      style={{ color: `${cert.color}70` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {course.link ? (
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm leading-snug flex-1 hover:underline underline-offset-2 transition-colors"
                        style={{ color: cert.color }}
                      >
                        {course.title}
                      </a>
                    ) : (
                      <span className="text-sm leading-snug flex-1 dark:text-slate-500 text-slate-400">
                        {course.title}
                      </span>
                    )}
                    {course.link && (
                      <ExternalLink size={10} style={{ color: `${cert.color}60` }} className="shrink-0" />
                    )}
                  </motion.li>
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="certifications" ref={ref} className="py-14 sm:py-20 lg:py-28 dark:bg-[#0a0a14] bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 sm:mb-14"
        >
          <span className="text-[#6c63ff] text-xs sm:text-sm font-bold uppercase tracking-[0.18em]">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 dark:text-white text-slate-900">
            My <span className="gradient-text">Certifications</span>
          </h2>
          <div className="mt-3 h-1 w-12 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] rounded-full" />
          <p className="dark:text-slate-400 text-slate-500 text-sm sm:text-base mt-4 max-w-lg leading-relaxed">
            Professional certificates and courses from IBM, validated on Coursera.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {data.map((cert, i) => (
            <CertCard key={cert._id ?? cert.title} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
