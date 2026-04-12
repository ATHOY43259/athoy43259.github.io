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

import {
  getExperiences,
  getProjects,
  getCertifications,
  getEducation,
} from "@/lib/sanity/queries";

export default async function Home() {
  const [experiences, projects, certifications, education] = await Promise.all([
    getExperiences(),
    getProjects(),
    getCertifications(),
    getEducation(),
  ]);

  return (
    <main className="min-h-screen overflow-x-hidden dark:bg-[#0f0f1a] bg-white text-slate-900 dark:text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience     data={experiences}     />
      <Projects       data={projects}        />
      <Education      data={education}       />
      <Certifications data={certifications}  />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
