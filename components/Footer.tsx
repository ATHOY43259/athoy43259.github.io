"use client";

import { motion } from "framer-motion";
import { Mail, Heart, Code2 } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2d2d4e] bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#38bdf8] flex items-center justify-center">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold gradient-text">Athoy Kanti Ray</span>
          </div>

          {/* Copyright */}
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            © {year} Made with{" "}
            <Heart size={13} className="text-red-400 fill-red-400" />
            by Athoy Kanti Ray
          </p>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              { icon: FaGithub, href: "https://github.com/ATHOY43259", label: "GitHub" },
              { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/athoykanti", label: "LinkedIn" },
              { icon: Mail, href: "mailto:athoykanti.roy1612@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-8 h-8 rounded-lg bg-[#1a1a2e] border border-[#2d2d4e] flex items-center justify-center text-slate-500 hover:text-[#6c63ff] hover:border-[#6c63ff]/40 transition-all duration-200"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
