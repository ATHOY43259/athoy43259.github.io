"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
          subject:    `[Portfolio] ${form.subject}`,
          from_name:  form.name,
          replyto:    form.email,
          message:    `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("send failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",    value: "athoykanti.roy1612@gmail.com",      href: "mailto:athoykanti.roy1612@gmail.com",                     color: "#6c63ff" },
    { icon: Phone,  label: "Phone",    value: "+8801735850987",                     href: "tel:+8801735850987",                                      color: "#38bdf8" },
    { icon: MapPin, label: "Location", value: "Bashundhara R/A, Dhaka, Bangladesh", href: "https://maps.google.com/?q=Bashundhara,Dhaka,Bangladesh", color: "#a78bfa" },
  ];

  const socials = [
    { icon: FaGithub,     label: "GitHub",   href: "https://github.com/ATHOY43259",          color: "#6c63ff" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/athoykanti", color: "#38bdf8" },
    { icon: Mail,         label: "Email",    href: "mailto:athoykanti.roy1612@gmail.com",     color: "#a78bfa" },
  ];

  const inputClass =
    "w-full dark:bg-[#0f0f1a] bg-slate-100 border dark:border-[#2d2d4e] border-slate-300 rounded-xl px-4 py-3 text-sm sm:text-base dark:text-white text-slate-800 " +
    "dark:placeholder-slate-600 placeholder-slate-400 focus:outline-none focus:border-[#6c63ff]/60 focus:ring-2 focus:ring-[#6c63ff]/20 transition-all duration-200";

  return (
    <section id="contact" ref={ref} className="py-14 sm:py-20 lg:py-28 dark:bg-[#0a0a14] bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="text-[#6c63ff] text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 dark:text-white text-slate-900">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
          <p className="dark:text-slate-400 text-slate-500 text-sm sm:text-base mt-4 max-w-md mx-auto leading-relaxed">
            Open to new opportunities — projects, questions, or just a hello.
            My inbox is always open!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">

          {/* ── Left: info + socials + reference ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-3 sm:gap-4"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 sm:gap-5 dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 rounded-2xl p-4 sm:p-5 transition-all duration-250 min-w-0"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${info.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${info.color}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${info.color}20`, border: `1.5px solid ${info.color}40` }}
                >
                  <info.icon size={18} style={{ color: info.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="dark:text-slate-500 text-slate-400 text-xs mb-0.5 uppercase tracking-wide font-medium">{info.label}</p>
                  <p className="dark:text-white text-slate-800 font-semibold text-sm sm:text-base group-hover:text-[#a78bfa] transition-colors truncate">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="flex gap-3 pt-1">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 flex items-center justify-center transition-all duration-200"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
                    (e.currentTarget as HTMLElement).style.background = `${color}18`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.background = "";
                  }}
                >
                  <Icon size={16} style={{ color }} />
                </motion.a>
              ))}
            </div>

            {/* Reference card */}
            <div className="dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 rounded-2xl p-4 sm:p-5">
              <p className="dark:text-slate-500 text-slate-400 text-xs uppercase tracking-[0.15em] mb-3 font-medium">Reference</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#6c63ff]/20 to-[#38bdf8]/20
                               border border-[#6c63ff]/30 flex items-center justify-center text-lg font-bold text-[#6c63ff] shrink-0">
                  F
                </div>
                <div>
                  <p className="dark:text-white text-slate-800 font-bold text-sm sm:text-base">Faisal Khan</p>
                  <p className="dark:text-slate-400 text-slate-500 text-xs sm:text-sm mt-0.5">AGM / Sr SW Architect</p>
                  <p className="dark:text-slate-500 text-slate-400 text-xs sm:text-sm">Link3 Technologies Ltd</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <form
              onSubmit={handleSubmit}
              className="dark:bg-[#1a1a2e] bg-white border dark:border-[#2d2d4e] border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col gap-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs dark:text-slate-400 text-slate-500 uppercase tracking-wide mb-2 font-medium">Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs dark:text-slate-400 text-slate-500 uppercase tracking-wide mb-2 font-medium">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    required placeholder="Your email" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-xs dark:text-slate-400 text-slate-500 uppercase tracking-wide mb-2 font-medium">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange}
                  required placeholder="Project inquiry / Job opportunity" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs dark:text-slate-400 text-slate-500 uppercase tracking-wide mb-2 font-medium">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  required rows={5} placeholder="Tell me about your project or opportunity..."
                  className={`${inputClass} resize-none`} />
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/25 rounded-xl px-4 py-3"
                >
                  <CheckCircle size={16} />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/25 rounded-xl px-4 py-3"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl
                           bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] text-white font-bold text-sm sm:text-base
                           shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
