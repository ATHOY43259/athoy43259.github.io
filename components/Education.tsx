"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import type { SanityEducation } from "@/lib/types";

export default function Education({ data }: { data: SanityEducation[] }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="education" className="py-14 sm:py-20 lg:py-28 dark:bg-[#0a0a14] bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#6c63ff] mb-2 sm:mb-3">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-slate-900 leading-tight">Education</h2>
          <div className="mt-3 sm:mt-4 w-10 sm:w-12 h-[3px] rounded-full bg-[#6c63ff]" />
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative space-y-8">
          <div className="absolute left-5 top-3 bottom-3 w-px dark:bg-[#2d2d4e] bg-slate-200" aria-hidden />

          {data.map((edu, i) => (
            <motion.div
              key={edu._id ?? edu.degree}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-8"
            >
              {/* Dot */}
              <div className="relative shrink-0 w-10 flex flex-col items-center pt-[22px]">
                <div className="w-[11px] h-[11px] rounded-full bg-[#6c63ff] ring-4 dark:ring-[#0a0a14] ring-slate-50" />
              </div>

              {/* Card */}
              <div className="flex-1 dark:bg-[#13132a] bg-white border dark:border-[#252545] border-slate-200 rounded-2xl p-7 sm:p-8 shadow-sm">

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold dark:text-slate-400 text-slate-500 mb-4">
                  <Calendar size={12} />
                  {edu.period}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900 leading-snug">
                  {edu.degree}
                </h3>

                {edu.major && (
                  <p className="mt-1 text-base font-medium text-[#6c63ff]">{edu.major}</p>
                )}

                <div className="mt-3 flex flex-wrap gap-5 text-sm dark:text-slate-400 text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={14} className="shrink-0" />
                    {edu.institution}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="shrink-0" />
                    {edu.location}
                  </span>
                </div>

                {edu.grade && (
                  <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                  dark:bg-[#1e1e3a] bg-slate-100 border dark:border-[#2d2d4e] border-slate-200">
                    <span className="text-xs font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500">CGPA</span>
                    <span className="text-lg font-bold dark:text-white text-slate-900">{edu.grade}</span>
                  </div>
                )}

                {edu.highlights.length > 0 && (
                  <div className="mt-6 pt-6 border-t dark:border-[#252545] border-slate-100">
                    <p className="text-xs font-semibold uppercase tracking-widest dark:text-slate-500 text-slate-400 mb-3">Coursework</p>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {edu.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5 text-sm dark:text-slate-300 text-slate-700 font-medium">
                          <span className="w-[5px] h-[5px] rounded-full shrink-0 bg-[#6c63ff]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
