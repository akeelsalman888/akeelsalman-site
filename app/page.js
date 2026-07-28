import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { site } from "./content";

// Structured data — helps Google show rich results for a search on his name.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description: site.tagline,
  url: "https://akeelsalman.com",
  email: `mailto:${site.email}`,
  sameAs: [site.socials.github, site.socials.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Nav />
      {/*
        Work leads. The reference site this design started from ran
        services → toolkit → work; putting shipped projects first is both a
        different skeleton and the better order for someone being evaluated —
        the strongest evidence shouldn't sit third.
      */}
      <main id="main" className="flex-1">
        <Hero />
        <Projects />
        <Services />
        <About />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
