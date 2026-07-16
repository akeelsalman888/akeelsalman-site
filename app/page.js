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
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Skills />
        <Projects />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
