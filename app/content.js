// Site content — single source of truth for what appears on the page.
// Mirror of resume-data.md. Edit here to change site copy.

export const site = {
  name: "Akeel Salman",
  title: "Full-Stack Developer",
  tagline:
    "I build websites and internal tools for organizations — and automate the manual work behind them.",
  location: "Central Time (CT) · Remote / Worldwide",
  email: "akeelsalman888@gmail.com",
  // Google Voice number — safe to publish (keeps the personal line private).
  // `phone` is E.164 for tel: links; `phoneDisplay` is what's shown. Empty = hidden.
  phone: "+14024170699",
  phoneDisplay: "(402) 417-0699",
  socials: {
    github: "https://github.com/akeelsalman888",
    linkedin: "https://www.linkedin.com/in/akeelsalman",
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
      "A bilingual (English/Arabic, full RTL) website serving an Islamic community center of 300+ families — with prayer times, events, online donations, and service applications. Built solo with React and a serverless backend, with an automated test suite that checks every page across languages and screen sizes before each release.",
    tech: ["React", "Vite", "Google Apps Script", "Playwright", "i18n/RTL"],
    // No screenshot captured yet — the card falls back to a labelled browser
    // frame showing the live domain. Drop a file in /public/work/ and set this
    // to its path to show a real preview instead.
    image: null,
  },
  {
    name: "Iman Connect",
    url: "https://connect.iman-islam.org",
    description:
      "An internal, SSO-gated operations portal for the center's board. Its two core systems — IPAS (Purchase Approval) and IPRS (Purchase Reimbursement) — carry a member's request end to end: email alerts to the finance committee, approve / deny / ask-a-question review inside the portal, an auto-generated PDF record, and a notification back to the requester. It also gives the board live visibility into donations. Built solo with React and Google Apps Script.",
    tech: ["React", "Google Apps Script", "Google SSO", "CI Visual Regression"],
    // Private, SSO-gated internal portal — not publicly reachable directly,
    // but the case study below has approved, sanitized screenshots.
    private: true,
    caseStudyUrl: "/work/iman-connect",
    image: "/work/iman-connect/dashboard.png",
    imageAlt: "The Iman Connect board dashboard",
  },
];

// Reviewed 2026-07-21: trimmed to skills Akeel can defend in an interview.
export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "Java", "Python", "SQL"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "Google Apps Script", "REST APIs", "Databases"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML & CSS", "i18n / RTL"],
  },
  {
    group: "Tooling & Practices",
    items: ["Git", "Playwright", "CI / Visual Regression", "Google SSO", "Responsive Design"],
  },
];

export const about = {
  paragraphs: [
    "I have a Master's in Information Technology and a strong foundation in computer systems, including core languages like Java, C++, and Python. On top of that, I've taught myself to build complete modern web applications — front end, backend, and the automation that connects them — and, just as importantly, to understand the real-world workflows behind them, so what I build actually fits how people work.",
    "Beyond writing code, I've taught programming and IT skills to students and professionals. That teaching background shapes how I work with clients: I listen first, break the problem down, and explain things in plain language — no jargon, no guesswork.",
  ],
  credentials: [
    "Master of Information Technology — Sikkim Manipal University (2010)",
    "Bachelor of Information Technology — Sikkim Manipal University (2008)",
    "Front-End & Back-End Developer Certifications — QuickStart (2026)",
    "Cisco Networking Academy (CCNA) — Southeast Community College (2019)",
  ],
};

// Testimonials.
// Each entry with `draft: true` is HIDDEN on the live site. To hide one, add a
// `draft: true` line; to publish it, remove that line. Add more entries any time.
export const testimonials = [
  {
    quote:
      "We handed Akeel the whole vision for bringing our center online, and he brought it to life. He built us a complete website in both English and Arabic where families can give, ask the imam a question, request a fatwa, and register and pay online for the adult classes I teach. He carried the entire project himself, with patience and integrity, and gave our center a home online that truly reflects who we are.",
    name: "Abdulaziz Al-Abbasi",
    role: "Imam & President",
    org: "Iman Islamic Center · Lincoln, NE",
  },
  {
    quote:
      "Behind the scenes, Akeel transformed how our board actually runs. The stacks of paperwork and manual tracking we used to rely on are gone — he moved all of it into a single internal portal that keeps our operations organized and saves us hours every week. He was reliable and easy to work with from start to finish, and delivered the whole system, website and portal alike, entirely on his own.",
    name: "Hamza Sindi",
    role: "Executive Leadership Committee",
    org: "Iman Islamic Center · Lincoln, NE",
  },
  {
    quote:
      "Akeel gave our community a real way to connect with the center. Members can volunteer, book a visit, and stay on top of every announcement, and the site tells our story — our mission, our journey, and where we're headed — to both our English- and Arabic-speaking families. He understood what our community needed before we asked, and delivered every piece of it himself.",
    name: "Mohammad Alshammari",
    role: "Executive Leadership Committee",
    org: "Iman Islamic Center · Lincoln, NE",
  },
];
