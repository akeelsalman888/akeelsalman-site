// Site content — single source of truth for what appears on the page.
// Mirror of resume-data.md. Edit here to change site copy.

export const site = {
  name: "Akeel Salman",
  title: "Full-stack Developer",
  tagline: "I build fast, reliable web applications — from front-end to back-end.",
  location: "Central Time (CST) · Remote / Worldwide",
  email: "akeelsalman888@gmail.com",
  // TODO: add real profile URLs, then they'll show up in the nav/footer.
  socials: {
    github: "", // e.g. "https://github.com/yourhandle"
    linkedin: "", // e.g. "https://linkedin.com/in/yourhandle"
  },
};

// TODO: confirm/replace these — placeholders based on a full-stack skill set.
export const services = [
  {
    title: "Web Application Development",
    body: "End-to-end builds with modern frameworks — responsive front-ends backed by solid APIs and databases.",
  },
  {
    title: "Website Design & Build",
    body: "Clean, fast, mobile-first marketing and business sites that load quickly and rank well.",
  },
  {
    title: "Maintenance & Improvements",
    body: "Bug fixes, performance tuning, new features, and ongoing support for existing sites.",
  },
];

export const projects = [
  {
    name: "Iman Islamic Center (IIC)",
    url: "https://www.iman-islam.org",
    description:
      "Bilingual (English/Arabic, full RTL) public website for an Islamic community center — prayer times, events, donations, and service applications. Solo-built React/Vite site with a serverless Google Apps Script backend and an automated Playwright suite that regression-tests every route across viewports and languages before it ships.",
    tech: ["React", "Vite", "Google Apps Script", "Playwright", "i18n/RTL"],
  },
  {
    name: "Iman Connect",
    url: "https://connect.iman-islam.org",
    description:
      "Internal operations portal for the same center — purchase approvals, reimbursements, volunteer scheduling, and donation reporting, gated behind Google Workspace SSO. Solo-built end to end (React frontend, Google Apps Script backends, CI-enforced responsive/visual regression gate) to replace manual paper/email workflows for the board and staff.",
    tech: ["React", "Google Apps Script", "Google SSO", "CI Visual Regression"],
    // Private, SSO-gated internal portal — not publicly reachable.
    // When screenshots exist, add caseStudyUrl (e.g. "/work/iman-connect")
    // and the card will link to the case study instead.
    private: true,
  },
];

export const about = {
  paragraphs: [
    "I'm a self-driven, self-taught developer with a strong foundation in computer systems. Over the past years I've taught myself programming, and my persistence and passion for technology have kept me building.",
    "Beyond writing code, I've taught programming fundamentals and IT skills to students and professionals — which sharpened how I break down problems and think through workflow logic.",
  ],
  credentials: [
    "Master of Information Technology",
    "Frontend & Backend Developer Bootcamp",
  ],
};
