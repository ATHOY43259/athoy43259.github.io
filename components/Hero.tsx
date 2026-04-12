"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "Laravel Engineer",
  "Next.js Developer",
  "API Architect",
  "DevOps Enthusiast",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayed, isDeleting, roleIndex]);

  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-pattern"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6c63ff]/10 border border-[#6c63ff]/30 text-[#a78bfa] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Athoy Kanti Ray</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 mb-6 h-10"
            >
              <span className="text-[#6c63ff]">{displayed}</span>
              <span className="cursor-blink text-[#38bdf8]">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Full Stack Developer building scalable web applications using{" "}
              <span className="text-[#a78bfa] font-medium">Laravel</span>,{" "}
              <span className="text-[#38bdf8] font-medium">Next.js</span>, and{" "}
              <span className="text-[#a78bfa] font-medium">PostgreSQL</span>.
              Passionate about clean APIs, CI/CD automation, and delivering
              user-centric software.
            </motion.p>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8 text-sm text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#6c63ff]" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-[#6c63ff]" />
                athoykanti.roy1612@gmail.com
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-[#6c63ff]" />
                +8801735850987
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.a
                href="/cv.pdf"
                download="Athoy_Kanti_Ray_CV.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200"
              >
                Download CV
              </motion.a>
              <motion.button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl border border-[#6c63ff]/50 text-[#a78bfa] font-semibold hover:bg-[#6c63ff]/10 transition-all duration-200"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/ATHOY43259",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedinIn,
                  href: "https://www.linkedin.com/in/athoykanti",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:athoykanti.roy1612@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-[#1a1a2e] border border-[#2d2d4e] flex items-center justify-center text-slate-400 hover:text-[#6c63ff] hover:border-[#6c63ff]/50 transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex-shrink-0"
          >
            <div className="relative">
              {/* Outer ring animation */}
              <div className="absolute inset-0 rounded-full border-2 border-[#6c63ff]/40 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-[-8px] rounded-full border border-[#6c63ff]/20" />
              <div className="absolute inset-[-16px] rounded-full border border-[#38bdf8]/10" />

              {/* Gradient ring */}
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#6c63ff] via-[#a78bfa] to-[#38bdf8] p-[3px]">
                <div className="w-full h-full rounded-full bg-[#0f0f1a]" />
              </div>

              {/* Profile image */}
              <div className="floating relative z-10 w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-[#0f0f1a]">
                <Image
                  src="/profile.jpg"
                  alt="Athoy Kanti Ray"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-10 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl px-3 py-2 text-xs font-medium shadow-lg glow-purple"
              >
                <span className="text-[#6c63ff]">1+</span>{" "}
                <span className="text-slate-300">Years Exp.</span>
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-4 bottom-16 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl px-3 py-2 text-xs font-medium shadow-lg glow-blue"
              >
                <span className="text-[#38bdf8]">3+</span>{" "}
                <span className="text-slate-300">Projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down */}
        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-[#6c63ff] transition-colors cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
