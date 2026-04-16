"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, CheckCircle, AlertCircle, Loader2, ChevronRight, Download } from "lucide-react";
import defaultData from "@/data/portfolio.json";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill      { name: string; level: number; color: string }
interface SkillGroup { category: string; skills: Skill[] }
interface Experience {
  company: string; role: string; type: string;
  startDate: string; endDate: string | null; current: boolean;
  location: string; color: string; points: string[]; tags: string[]; order: number;
}
interface Project {
  title: string; year: string; description: string;
  tools: string[]; github: string | null; live: string | null; color: string; order: number;
}
interface Education {
  degree: string; major: string | null; institution: string;
  location: string; period: string; grade: string | null; highlights: string[]; order: number;
}
interface Certification {
  title: string; issuer: string; date: string; link: string | null; color: string; order: number;
}
interface PortfolioData {
  siteSettings: {
    heroName: string; heroTagline: string; heroRoles: string[];
    heroLocation: string; heroEmail: string; heroPhone: string;
    heroGithub: string; heroLinkedin: string; heroExpYears: string;
    heroProjectCount: string; heroProfileImage: string;
    aboutBio1: string; aboutBio2: string; aboutBio3: string;
    aboutCompany: string; aboutRole: string;
    aboutHighlights: { label: string; desc: string }[];
    aboutStats: { value: string; label: string }[];
    skillGroups: SkillGroup[];
    techBadges: string[];
    contactEmail: string; contactPhone: string; contactLocation: string;
    contactGithub: string; contactLinkedin: string;
    refName: string; refTitle: string; refCompany: string;
    ctaStats: { value: string; label: string }[];
  };
  experiences:    Experience[];
  projects:       Project[];
  education:      Education[];
  certifications: Certification[];
}

// ─── Sections ────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "hero",           label: "Hero"           },
  { id: "about",          label: "About"          },
  { id: "skills",         label: "Skills"         },
  { id: "contact",        label: "Contact"        },
  { id: "cta",            label: "CTA"            },
  { id: "experience",     label: "Experience"     },
  { id: "projects",       label: "Projects"       },
  { id: "education",      label: "Education"      },
  { id: "certifications", label: "Certifications" },
];

// ─── Reusable field components ────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5 font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[#0f0f1a] border border-[#2d2d4e] rounded-xl px-4 py-2.5 text-sm text-white " +
  "placeholder-slate-600 focus:outline-none focus:border-[#6c63ff]/60 focus:ring-1 focus:ring-[#6c63ff]/30 transition-all";

const textareaCls = inputCls + " resize-none";

function Input({ value, onChange, placeholder = "" }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input
      className={inputCls}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

function Textarea({ value, onChange, rows = 3, placeholder = "" }: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <textarea
      className={textareaCls}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

function JsonEditor({ label, value, onChange }: {
  label: string; value: unknown; onChange: (v: unknown) => void;
}) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [err, setErr]   = useState("");

  useEffect(() => { setText(JSON.stringify(value, null, 2)); }, [value]);

  const handleBlur = () => {
    try {
      onChange(JSON.parse(text));
      setErr("");
    } catch {
      setErr("Invalid JSON — fix before saving");
    }
  };

  return (
    <div>
      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5 font-medium">
        {label}
        <span className="ml-2 text-slate-600 normal-case font-normal tracking-normal">(JSON)</span>
      </label>
      <textarea
        className={textareaCls + (err ? " border-red-500/60" : "")}
        rows={12}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        spellCheck={false}
      />
      {err && <p className="text-red-400 text-xs mt-1">{err}</p>}
    </div>
  );
}

// Simple key-value pair list editor
function PairList({ label, items, onChange, keyLabel = "Label", valLabel = "Value" }: {
  label: string;
  items: { [k: string]: string }[];
  onChange: (items: { [k: string]: string }[]) => void;
  keyLabel?: string;
  valLabel?: string;
}) {
  const keys = items.length > 0 ? Object.keys(items[0]) : ["label", "desc"];
  const [k1, k2] = keys;

  const update = (i: number, field: string, val: string) => {
    const next = items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add    = () => onChange([...items, { [k1]: "", [k2]: "" }]);

  return (
    <div>
      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2 font-medium">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputCls + " flex-1"}
              placeholder={keyLabel}
              value={item[k1] ?? ""}
              onChange={(e) => update(i, k1, e.target.value)}
            />
            <input
              className={inputCls + " flex-1"}
              placeholder={valLabel}
              value={item[k2] ?? ""}
              onChange={(e) => update(i, k2, e.target.value)}
            />
            <button
              onClick={() => remove(i)}
              className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-sm transition-all"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={add}
        className="mt-2 px-4 py-2 rounded-xl bg-[#6c63ff]/10 border border-[#6c63ff]/30 text-[#a78bfa] hover:bg-[#6c63ff]/20 text-sm transition-all"
      >
        + Add row
      </button>
    </div>
  );
}

// ─── Section renderers ────────────────────────────────────────────────────────

function HeroSection({ s, set }: { s: PortfolioData["siteSettings"]; set: (k: keyof PortfolioData["siteSettings"], v: unknown) => void }) {
  return (
    <div className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name">
          <Input value={s.heroName} onChange={(v) => set("heroName", v)} />
        </Field>
        <Field label="Profile Image Path">
          <Input value={s.heroProfileImage} onChange={(v) => set("heroProfileImage", v)} placeholder="/profile.jpg" />
        </Field>
      </div>
      <Field label="Tagline (below typing animation)">
        <Textarea value={s.heroTagline} onChange={(v) => set("heroTagline", v)} rows={3} />
      </Field>
      <Field label="Rotating Roles (one per line)">
        <Textarea
          value={s.heroRoles.join("\n")}
          onChange={(v) => set("heroRoles", v.split("\n").filter(Boolean))}
          rows={5}
          placeholder={"Full Stack Developer\nLaravel Engineer\n..."}
        />
      </Field>
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Location">
          <Input value={s.heroLocation} onChange={(v) => set("heroLocation", v)} />
        </Field>
        <Field label="Email">
          <Input value={s.heroEmail} onChange={(v) => set("heroEmail", v)} />
        </Field>
        <Field label="Phone">
          <Input value={s.heroPhone} onChange={(v) => set("heroPhone", v)} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="GitHub URL">
          <Input value={s.heroGithub} onChange={(v) => set("heroGithub", v)} />
        </Field>
        <Field label="LinkedIn URL">
          <Input value={s.heroLinkedin} onChange={(v) => set("heroLinkedin", v)} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Experience Badge (e.g. 1+)">
          <Input value={s.heroExpYears} onChange={(v) => set("heroExpYears", v)} />
        </Field>
        <Field label="Projects Badge (e.g. 3+)">
          <Input value={s.heroProjectCount} onChange={(v) => set("heroProjectCount", v)} />
        </Field>
      </div>
    </div>
  );
}

function AboutSection({ s, set }: { s: PortfolioData["siteSettings"]; set: (k: keyof PortfolioData["siteSettings"], v: unknown) => void }) {
  return (
    <div className="grid gap-5">
      <Field label="Bio Paragraph 1">
        <Textarea value={s.aboutBio1} onChange={(v) => set("aboutBio1", v)} rows={3} />
      </Field>
      <Field label="Bio Paragraph 2">
        <Textarea value={s.aboutBio2} onChange={(v) => set("aboutBio2", v)} rows={3} />
      </Field>
      <Field label="Bio Paragraph 3">
        <Textarea value={s.aboutBio3} onChange={(v) => set("aboutBio3", v)} rows={3} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Current Company">
          <Input value={s.aboutCompany} onChange={(v) => set("aboutCompany", v)} />
        </Field>
        <Field label="Current Role Title">
          <Input value={s.aboutRole} onChange={(v) => set("aboutRole", v)} />
        </Field>
      </div>
      <PairList
        label="Highlight Cards (label → description)"
        items={s.aboutHighlights as { [k: string]: string }[]}
        onChange={(v) => set("aboutHighlights", v)}
        keyLabel="Label"
        valLabel="Description"
      />
      <PairList
        label="Stats (value → label)"
        items={s.aboutStats as { [k: string]: string }[]}
        onChange={(v) => set("aboutStats", v)}
        keyLabel="Value (e.g. 1+)"
        valLabel="Label"
      />
    </div>
  );
}

function SkillsSection({ s, set }: { s: PortfolioData["siteSettings"]; set: (k: keyof PortfolioData["siteSettings"], v: unknown) => void }) {
  return (
    <div className="grid gap-6">
      <Field label="Tech Badges (one per line)">
        <Textarea
          value={s.techBadges.join("\n")}
          onChange={(v) => set("techBadges", v.split("\n").map((x) => x.trim()).filter(Boolean))}
          rows={10}
          placeholder={"Laravel\nNext.js\nReact.js\n..."}
        />
      </Field>
      <JsonEditor
        label="Skill Groups (bar charts)"
        value={s.skillGroups}
        onChange={(v) => set("skillGroups", v)}
      />
    </div>
  );
}

function ContactSection({ s, set }: { s: PortfolioData["siteSettings"]; set: (k: keyof PortfolioData["siteSettings"], v: unknown) => void }) {
  return (
    <div className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email">
          <Input value={s.contactEmail} onChange={(v) => set("contactEmail", v)} />
        </Field>
        <Field label="Phone">
          <Input value={s.contactPhone} onChange={(v) => set("contactPhone", v)} />
        </Field>
      </div>
      <Field label="Location">
        <Input value={s.contactLocation} onChange={(v) => set("contactLocation", v)} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="GitHub URL">
          <Input value={s.contactGithub} onChange={(v) => set("contactGithub", v)} />
        </Field>
        <Field label="LinkedIn URL">
          <Input value={s.contactLinkedin} onChange={(v) => set("contactLinkedin", v)} />
        </Field>
      </div>
      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium pt-2 border-t border-[#2d2d4e]">Reference Person</p>
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Full Name">
          <Input value={s.refName} onChange={(v) => set("refName", v)} />
        </Field>
        <Field label="Job Title">
          <Input value={s.refTitle} onChange={(v) => set("refTitle", v)} />
        </Field>
        <Field label="Company">
          <Input value={s.refCompany} onChange={(v) => set("refCompany", v)} />
        </Field>
      </div>
    </div>
  );
}

function CtaSection({ s, set }: { s: PortfolioData["siteSettings"]; set: (k: keyof PortfolioData["siteSettings"], v: unknown) => void }) {
  return (
    <div className="grid gap-5">
      <PairList
        label="Stats Row"
        items={s.ctaStats as { [k: string]: string }[]}
        onChange={(v) => set("ctaStats", v)}
        keyLabel="Value (e.g. 1+)"
        valLabel="Label"
      />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  // Pre-populate with the bundled JSON so the form is visible immediately
  const [data,         setData]        = useState<PortfolioData>(defaultData as PortfolioData);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [section,      setSection]     = useState("hero");
  const [status,       setStatus]      = useState<"idle" | "saving" | "saved" | "error">("idle");

  const API = "http://localhost:3001/api/portfolio";

  // Load latest data from the Express admin server
  useEffect(() => {
    fetch(API)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((d: PortfolioData) => { if (d.siteSettings) setData(d); setApiAvailable(true); })
      .catch(() => setApiAvailable(false));
  }, []);

  // Update a siteSettings key
  const setSetting = useCallback((key: keyof PortfolioData["siteSettings"], value: unknown) => {
    setData((prev) => ({ ...prev, siteSettings: { ...prev.siteSettings, [key]: value } }));
  }, []);

  // Update a top-level array
  const setArray = useCallback((key: keyof Omit<PortfolioData, "siteSettings">, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Save via Express server or download JSON as fallback
  const save = async () => {
    setStatus("saving");
    if (apiAvailable) {
      try {
        const res = await fetch(API, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(data),
        });
        setStatus(res.ok ? "saved" : "error");
      } catch {
        setStatus("error");
      }
    } else {
      // Fallback: download the JSON file for manual placement
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url; a.download = "portfolio.json"; a.click();
      URL.revokeObjectURL(url);
      setStatus("saved");
    }
    setTimeout(() => setStatus("idle"), 3000);
  };

  const renderSection = () => {
    if (!data) return null;
    const s = data.siteSettings;
    switch (section) {
      case "hero":           return <HeroSection    s={s} set={setSetting} />;
      case "about":          return <AboutSection   s={s} set={setSetting} />;
      case "skills":         return <SkillsSection  s={s} set={setSetting} />;
      case "contact":        return <ContactSection s={s} set={setSetting} />;
      case "cta":            return <CtaSection     s={s} set={setSetting} />;
      case "experience":     return <JsonEditor label="Experiences" value={data.experiences}    onChange={(v) => setArray("experiences",    v)} />;
      case "projects":       return <JsonEditor label="Projects"    value={data.projects}       onChange={(v) => setArray("projects",       v)} />;
      case "education":      return <JsonEditor label="Education"   value={data.education}      onChange={(v) => setArray("education",      v)} />;
      case "certifications": return <JsonEditor label="Certifications" value={data.certifications} onChange={(v) => setArray("certifications", v)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white flex">

      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-[#0f0f1a] border-r border-[#2d2d4e] flex flex-col">
        <div className="px-5 py-5 border-b border-[#2d2d4e]">
          <h1 className="text-sm font-bold text-white">Portfolio Admin</h1>
          <p className="text-xs text-slate-500 mt-0.5">Local editor</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSection(sec.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between transition-all duration-150
                ${section === sec.id
                  ? "bg-[#6c63ff]/20 text-[#a78bfa] border border-[#6c63ff]/30"
                  : "text-slate-400 hover:text-white hover:bg-[#1a1a2e]"
                }`}
            >
              {sec.label}
              {section === sec.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#0f0f1a] border-b border-[#2d2d4e] shrink-0">
          <div>
            <h2 className="font-bold text-white capitalize">{section.replace("-", " ")}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Changes are saved to <code className="text-[#a78bfa]">data/portfolio.json</code></p>
          </div>
          <button
            onClick={save}
            disabled={status === "saving" || !data}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#a78bfa]
                       text-white font-semibold text-sm shadow-lg shadow-purple-500/20
                       hover:shadow-purple-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {status === "saving" && <Loader2 size={15} className="animate-spin" />}
            {status === "saved"  && <CheckCircle size={15} />}
            {status === "error"  && <AlertCircle size={15} />}
            {status === "idle"   && (apiAvailable ? <Save size={15} /> : <Download size={15} />)}
            {status === "saving" ? "Saving…" : status === "saved" ? "Saved!" : status === "error" ? "Error" : apiAvailable ? "Save" : "Download JSON"}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {!apiAvailable && (
            <div className="mb-6 max-w-3xl bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-3 flex items-center gap-3 text-amber-400 text-sm">
              <Download size={15} className="shrink-0" />
              API unavailable — Save will download <code className="font-mono">portfolio.json</code>. Place it in <code className="font-mono">data/</code> to apply changes.
            </div>
          )}
          <div className="max-w-3xl">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
