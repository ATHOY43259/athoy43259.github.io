"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, ChevronRight } from "lucide-react";

export default function CTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f0f1a]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6c63ff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6c63ff]/10 border border-[#6c63ff]/30 text-[#a78bfa] text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to new opportunities
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Ready to Start Your{" "}
          <span className="gradient-text">Next Project?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Let&apos;s collaborate to build something amazing together. I specialize
          in scalable web applications and production-ready backend systems.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            onClick={() => scrollTo("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] text-white font-semibold text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200"
          >
            <Send size={18} />
            Start a Project
          </motion.button>

          <motion.button
            onClick={() => scrollTo("projects")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#2d2d4e] text-white font-semibold text-base hover:border-[#6c63ff]/50 hover:bg-[#6c63ff]/5 transition-all duration-200"
          >
            View My Work
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-10 mt-14 pt-10 border-t border-[#2d2d4e]"
        >
          {[
            { value: "1+", label: "Years Experience" },
            { value: "3+", label: "Projects Delivered" },
            { value: "8+", label: "Certifications" },
            { value: "100%", label: "Commitment" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
