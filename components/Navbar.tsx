"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "About",          href: "#about"          },
  { label: "Skills",         href: "#skills"         },
  { label: "Experience",     href: "#experience"     },
  { label: "Projects",       href: "#projects"       },
  { label: "Education",      href: "#education"      },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact"        },
];

export default function Navbar() {
  const [isOpen, setIsOpen]        = useState(false);
  const [scrolled, setScrolled]    = useState(false);
  const [activeSection, setActive] = useState("");
  const [mounted, setMounted]      = useState(false);
  const { theme, setTheme }        = useTheme();

  // Only read theme after mount to avoid hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 110) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "dark:bg-[#0f0f1a]/95 bg-white/95 backdrop-blur-md dark:border-b dark:border-[#2d2d4e] border-b border-slate-200 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#38bdf8] flex items-center justify-center">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">AKR</span>
          </motion.button>

          {/* Desktop nav — all classes use dark: prefix, no JS conditionals */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`nav-link text-sm font-medium transition-colors duration-200 cursor-pointer
                  dark:text-slate-300 dark:hover:text-white text-slate-600 hover:text-slate-900
                  ${activeSection === link.href.replace("#", "") ? "!text-[#6c63ff]" : ""}`}
              >
                {link.label}
              </button>
            ))}

            {/* Theme toggle – renders nothing until mounted to avoid mismatch */}
            <div className="w-9 h-9">
              {mounted && (
                <motion.button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200
                             dark:border-[#2d2d4e] dark:bg-[#1a1a2e] dark:text-[#a78bfa] dark:hover:border-[#6c63ff]/60
                             border-slate-200 bg-slate-100 text-slate-600 hover:border-[#5b52e8]/40"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )}
            </div>

            <motion.a
              href="/cv.pdf"
              download="Athoy_Kanti_Ray_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] text-white text-sm font-semibold
                         hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            >
              Download CV
            </motion.a>
          </div>

          {/* Mobile: fixed-size placeholder + hamburger — no theme-conditional classes */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-9 h-9">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200
                             dark:border-[#2d2d4e] dark:bg-[#1a1a2e] dark:text-[#a78bfa]
                             border-slate-200 bg-slate-100 text-slate-600"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors dark:text-slate-300 dark:hover:bg-white/10 text-slate-600 hover:bg-slate-100"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — dark: prefix for all theme variants */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b backdrop-blur-md dark:bg-[#1a1a2e]/97 dark:border-[#2d2d4e] bg-white/97 border-slate-200"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-3 py-3 rounded-xl text-base font-medium transition-colors
                    dark:text-slate-300 dark:hover:text-[#6c63ff] dark:hover:bg-[#6c63ff]/5
                    text-slate-600 hover:text-[#5b52e8] hover:bg-[#5b52e8]/5
                    ${activeSection === link.href.replace("#", "")
                      ? "!text-[#6c63ff] dark:bg-[#6c63ff]/10 bg-[#6c63ff]/8"
                      : ""}`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/cv.pdf"
                download="Athoy_Kanti_Ray_CV.pdf"
                className="mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] text-white text-base font-semibold text-center"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
