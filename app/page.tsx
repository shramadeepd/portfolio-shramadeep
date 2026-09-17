import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CursorGlow } from "@/components/CursorGlow";
import { Education } from "@/components/Education";
import { Engineering } from "@/components/Engineering";
import { Experience } from "@/components/Experience";
import { Experiments } from "@/components/Experiments";
import { Exploring } from "@/components/Exploring";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowIThink } from "@/components/HowIThink";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { Nav, ScrollProgress } from "@/components/Nav";
import { Notes } from "@/components/Notes";
import { OpenSource } from "@/components/OpenSource";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Stats } from "@/components/Stats";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="bg-noise relative min-h-screen bg-ink">
      <CursorGlow />
      <ScrollProgress />
      <Nav />

      <main id="content">
        <Hero />
        <Stats />
        <About />
        <HowIThink />
        <Projects />
        <Experiments />
        <Engineering />
        <TechStack />
        <KnowledgeGraph />
        <Experience />
        <Education />
        <Exploring />
        <Notes />
        <OpenSource />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}