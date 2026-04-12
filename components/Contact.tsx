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
    { icon: Mail,   label: "Email",    value: "athoykanti.roy1612@gmail.com",       href: "mailto:athoykanti.roy1612@gmail.com",                              color: "#6c63ff" },
    { icon: Phone,  label: "Phone",    value: "+8801735850987",                      href: "tel:+8801735850987",                                               color: "#38bdf8" },
    { icon: MapPin, label: "Location", value: "Bashundhara R/A, Dhaka, Bangladesh",  href: "https://maps.google.com/?q=Bashundhara,Dhaka,Bangladesh",          color: "#a78bfa" },
  ];

  const socials = [
    { icon: FaGithub,    label: "GitHub",   href: "https://github.com/ATHOY43259",            color: "#6c63ff" },
    { icon: FaLinkedinIn,label: "LinkedIn", href: "https://www.linkedin.com/in/athoykanti",   color: "#38bdf8" },
    { icon: Mail,        label: "Email",    href: "mailto:athoykanti.roy1612@gmail.com",       color: "#a78bfa" },
  ];

  const inputClass =
    "w-full bg-[#0f0f1a] border border-[#2d2d4e] rounded-2xl px-5 py-4 text-base text-white " +
    "placeholder-slate-600 focus:outline-none focus:border-[#6c63ff]/60 focus:ring-2 focus:ring-[#6c63ff]/20 transition-all duration-200";

  return (
    <section id="contact" ref={ref} className="py-28 sm:py-32 dark:bg-[#0a0a14] bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#6c63ff] text-sm font-semibold uppercase tracking-[0.2em]">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-white">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-5 h-1 w-20 bg-gradient-to-r from-[#6c63ff] to-[#38bdf8] mx-auto rounded-full" />
          <p className="text-slate-400 text-lg mt-5 max-w-lg mx-auto leading-relaxed">
            Open to new opportunities — projects, questions, or just a hello.
            My inbox is always open!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14">

          {/* ── Left: info + socials + reference ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-6 bg-[#1a1a2e] border border-[#2d2d4e] rounded-3xl p-6 sm:p-7 transition-all duration-250"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${info.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${info.color}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2d2d4e";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${info.color}20`, border: `1.5px solid ${info.color}40` }}
                >
                  <info.icon size={22} style={{ color: info.color }} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-medium">{info.label}</p>
                  <p className="text-white font-semibold text-base group-hover:text-[#a78bfa] transition-colors">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="flex gap-4 pt-1">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-14 h-14 rounded-2xl bg-[#1a1a2e] border border-[#2d2d4e] flex items-center justify-center transition-all duration-200"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
                    (e.currentTarget as HTMLElement).style.background = `${color}18`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#2d2d4e";
                    (e.currentTarget as HTMLElement).style.background = "#1a1a2e";
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </motion.a>
              ))}
            </div>

            {/* Reference card */}
            <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-3xl p-7">
              <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Reference</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6c63ff]/20 to-[#38bdf8]/20
                               border border-[#6c63ff]/30 flex items-center justify-center text-xl font-bold text-[#6c63ff]">
                  F
                </div>
                <div>
                  <p className="text-white font-bold text-base">Faisal Khan</p>
                  <p className="text-slate-400 text-sm mt-0.5">AGM / Sr SW Architect</p>
                  <p className="text-slate-500 text-sm">Link3 Technologies Ltd</p>
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
              className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-3xl p-8 sm:p-10 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-400 uppercase tracking-wider mb-3 font-medium">Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 uppercase tracking-wider mb-3 font-medium">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    required placeholder="Your email" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 uppercase tracking-wider mb-3 font-medium">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange}
                  required placeholder="Project inquiry / Job opportunity" className={inputClass} />
              </div>

              <div>
                <label className="block text-sm text-slate-400 uppercase tracking-wider mb-3 font-medium">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  required rows={6} placeholder="Tell me about your project or opportunity..."
                  className={`${inputClass} resize-none`} />
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-green-400 text-base bg-green-400/10 border border-green-400/25 rounded-2xl px-5 py-4"
                >
                  <CheckCircle size={18} />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-red-400 text-base bg-red-400/10 border border-red-400/25 rounded-2xl px-5 py-4"
                >
                  <AlertCircle size={18} />
                  Something went wrong. Please try again.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl
                           bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] text-white font-bold text-base
                           shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
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
