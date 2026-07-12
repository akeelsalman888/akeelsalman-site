// Site content — single source of truth for what appears on the page.
// Mirror of resume-data.md. Edit here to change site copy.

export const site = {
  name: "Akeel Salman",
  title: "Full-Stack Web Developer",
  tagline:
    "I build websites and internal tools for organizations — and automate the manual work behind them.",
  location: "Central Time (CST) · Remote / Worldwide",
  email: "akeelsalman888@gmail.com",
  socials: {
    github: "https://github.com/akeelsalman888",
    // TODO: replace with your real LinkedIn URL once the account exists
    // (e.g. "https://www.linkedin.com/in/akeel-salman"). Leave as-is and it
    // simply won't render in the footer until you fill it in.
    linkedin: "",
  },
};

export const services = [
  {
    title: "Websites for Organizations & Businesses",
    body: "Fast, mobile-first sites with the features you actually need — events, online donations, bookings, applications, and multilingual support.",
  },
  {
    title: "Internal Tools & Portals",
    body: "Custom staff-facing systems — approval workflows, scheduling, reporting, and dashboards that replace manual paper and email.",
  },
  {
    title: "Automation & Integrations",
    body: "Connect the tools you already use — Google Workspace, email, spreadsheets — so repetitive work runs itself.",
  },
];

export const projects = [
  {
    name: "Iman Islamic Center (IIC)",
    url: "https://www.iman-islam.org",
    description:
      "A bilingual (English/Arabic, full RTL) website serving an Islamic community center — prayer times, events, online donations, and service applications. Built solo with React and a serverless backend, with an automated test suite that checks every page across languages and screen sizes before each release.",
    tech: ["React", "Vite", "Google Apps Script", "Playwright", "i18n/RTL"],
  },
  {
    name: "Iman Connect",
    url: "https://connect.iman-islam.org",
    description:
      "An internal operations portal that replaced the board's manual paper-and-email workflows — purchase approvals, reimbursements, volunteer scheduling, and donation reporting, all secured behind Google sign-in. Built end to end, solo.",
    tech: ["React", "Google Apps Script", "Google SSO", "CI Visual Regression"],
    // Private, SSO-gated internal portal — not publicly reachable.
    // When screenshots exist, add caseStudyUrl (e.g. "/work/iman-connect")
    // and the card will link to the case study instead.
    private: true,
  },
];

// TODO: review this list — keep only what you're comfortable being interviewed on.
// Reorder items so your strongest skills come first in each group.
export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "Python", "Java", "C++", "TypeScript", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML & CSS", "i18n / RTL"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "Google Apps Script", "REST APIs", "Databases"],
  },
  {
    group: "Tooling & Practices",
    items: ["Git", "Playwright", "CI / Visual Regression", "Google SSO", "Responsive Design"],
  },
];

export const about = {
  paragraphs: [
    "I'm a self-taught developer with a strong foundation in computer systems. Over the past few years I've taught myself to build complete web applications — and, just as importantly, to understand the real-world workflows behind them, so what I build actually fits how people work.",
    "Beyond writing code, I've taught programming and IT skills to students and professionals. That teaching background shapes how I work with clients: I listen first, break the problem down, and explain things in plain language — no jargon, no guesswork.",
  ],
  credentials: [
    "Master of Information Technology",
    "Frontend & Backend Developer Bootcamp",
  ],
};

// Testimonials.
// Each entry with `draft: true` is HIDDEN on the live site. When you receive a
// real quote, paste it in, fill name/role, and delete the `draft: true` line —
// the section then appears automatically. Add more entries any time.
export const testimonials = [
  {
    // Paste the real quote here once your coworkers help you draft it, fill in
    // name/role, then DELETE the `draft: true` line to make the section visible.
    // (Here's the sample wording you previewed, to reuse as a starting point:
    //  "Akeel built our community website and internal operations portal from
    //   the ground up. The site made it easy for our community to find prayer
    //   times, events, and donate online, and the portal replaced the manual
    //   paperwork our board used to rely on. Reliable, easy to work with, and
    //   delivered everything himself.")
    quote: "",
    name: "",
    role: "Board Member, Iman Islamic Center",
    draft: true,
  },
];
