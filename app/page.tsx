import Navbar        from "@/components/Navbar";
import Hero           from "@/components/Hero";
import About          from "@/components/About";
import Skills         from "@/components/Skills";
import Experience     from "@/components/Experience";
import Projects       from "@/components/Projects";
import Education      from "@/components/Education";
import Certifications from "@/components/Certifications";
import CTA            from "@/components/CTA";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";
import { getPortfolioData } from "@/lib/local-data";

export default function Home() {
  const { siteSettings, experiences, projects, certifications, education } = getPortfolioData();

  return (
    <main className="min-h-screen overflow-x-hidden dark:bg-[#0f0f1a] bg-white text-slate-900 dark:text-white">
      <Navbar />
      <Hero          settings={siteSettings}    />
      <About         settings={siteSettings}    />
      <Skills        settings={siteSettings}    />
      <Experience    data={experiences}         />
      <Projects      data={projects}            />
      <Education     data={education}           />
      <Certifications data={certifications}     />
      <CTA           settings={siteSettings}    />
      <Contact       settings={siteSettings}    />
      <Footer />
    </main>
  );
}
