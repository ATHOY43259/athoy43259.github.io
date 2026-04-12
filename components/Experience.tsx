"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, Briefcase, ChevronDown } from "lucide-react";
import { useLiveDuration } from "@/hooks/useLiveDuration";
import type { SanityExperience } from "@/lib/types";

/* ── helpers ─────────────────────────────────────────────────────── */
function toDate(str: string): Date {
  // "YYYY-MM-DD" → Date  (treat as local midnight to avoid tz shifts)
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function staticDuration(start: Date, end: Date): string {
  let years  = end.getFullYear() - start.getFullYear();
  let months = end.getMonth()    - start.getMonth();
  if (months < 0) { years -= 1; months += 12; }
  const parts: string[] = [];
  if (years  > 0) parts.push(`${years} yr${years  > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "< 1 mo";
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* ── Live counter badge ───────────────────────────────────────────── */
function LiveBadge({ startDate, color }: { startDate: Date; color: string }) {
  const { years, months, label } = useLiveDuration(startDate);
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
      style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      title="Live duration — updates every minute"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: color }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
      </span>
      {label}
      <span className="sr-only">{years} years {months} months</span>
    </motion.div>
  );
}

/* ── Single experience card ───────────────────────────────────────── */
function ExperienceItem({
  exp,
  index,
  isLast,
}: {
  exp: SanityExperience;
  index: number;
  isLast: boolean;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [expanded, setExpanded] = useState(index === 0);

  const startDateObj = toDate(exp.startDate);
  const endDateObj   = exp.endDate ? toDate(exp.endDate) : null;

  const periodStr  = endDateObj ? `${fmt(startDateObj)} – ${fmt(endDateObj)}` : `${fmt(startDateObj)} – Present`;
  const durationStr = endDateObj ? staticDuration(startDateObj, endDateObj) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* Spine */}
      <div className="flex flex-col items-center shrink-0 w-6 pt-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 300 }}
          className="relative z-10"
        >
          <div
            className="w-5 h-5 rounded-full border-[3px] border-white dark:border-[#0f0f1a]"
            style={{ background: exp.color, boxShadow: `0 0 14px ${exp.color}88` }}
          />
          {exp.current && (
            <span
              className="absolute -inset-2 rounded-full animate-ping opacity-30"
              style={{ background: exp.color }}
            />
          )}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.08 + 0.35, duration: 0.8, ease: "easeOut" }}
            className="mt-3 flex-1 w-px origin-top"
            style={{ background: `linear-gradient(to bottom, ${exp.color}80, ${exp.color}10)` }}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-12"}`}>
        <button onClick={() => setExpanded((p) => !p)} className="w-full text-left group">
          <div
            className="rounded-2xl border px-6 py-5 transition-all duration-300 cursor-pointer
                       dark:bg-[#1a1a2e] dark:border-[#2d2d4e] bg-white border-slate-200 hover:shadow-xl"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}50`;
              (e.currentTarget as HTMLElement).style.boxShadow   = `0 12px 40px ${exp.color}18`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "";
              (e.currentTarget as HTMLElement).style.boxShadow   = "";
            }}
          >
            <div className="h-0.5 w-12 rounded-full mb-4 group-hover:w-full transition-all duration-500"
              style={{ background: `linear-gradient(90deg, ${exp.color}, ${exp.color}44)` }}
            />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900">{exp.company}</h3>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-semibold bg-green-500/15 text-green-400 border border-green-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>
                <p className="font-semibold text-base" style={{ color: exp.color }}>{exp.role}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs px-3 py-1 rounded-full font-medium border"
                  style={{ color: exp.color, borderColor: `${exp.color}40`, background: `${exp.color}12` }}>
                  {exp.type}
                </span>
                {exp.current
                  ? <LiveBadge startDate={startDateObj} color={exp.color} />
                  : durationStr && <span className="text-sm font-medium dark:text-slate-400 text-slate-500">{durationStr}</span>
                }
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm dark:text-slate-500 text-slate-400 mt-3">
              <span className="flex items-center gap-1.5"><Calendar size={13} className="shrink-0" />{periodStr}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} className="shrink-0" />{exp.location}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs dark:text-slate-500 text-slate-400">
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={14} />
              </motion.div>
              {expanded ? "Hide details" : "Show details"}
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3 px-1">
                <ul className="space-y-3 mb-5">
                  {exp.points.map((point, pi) => (
                    <motion.li
                      key={pi}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: pi * 0.08, duration: 0.4, ease: "easeOut" }}
                      className="flex gap-3 text-base dark:text-slate-300 text-slate-600 leading-[1.75]"
                    >
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                      {point}
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, ti) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ti * 0.05 + 0.2 }}
                      className="text-sm px-3.5 py-1.5 rounded-full font-medium"
                      style={{ background: `${exp.color}12`, color: `${exp.color}dd`, border: `1px solid ${exp.color}28` }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */
export default function Experience({ data }: { data: SanityExperience[] }) {
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px 0px" });

  return (
    <section id="experience" className="py-14 sm:py-20 lg:py-28 dark:bg-[#0f0f1a] bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[#6c63ff] text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            <Briefcase size={12} /> Work History
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 dark:text-white text-slate-900">
            My <span className="gradient-text">Experience</span>
          </h2>
          <div className="mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
        </motion.div>

        <div>
          {data.map((exp, i) => (
            <ExperienceItem key={exp._id ?? exp.company} exp={exp} index={i} isLast={i === data.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
