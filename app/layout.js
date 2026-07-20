import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "./content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://akeelsalman.com"),
  title: `${site.name} — ${site.title}`,
  description: site.tagline,
  keywords: [
    "Akeel Salman",
    "Full-Stack Web Developer",
    "React developer",
    "Next.js developer",
    "internal tools",
    "web automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    url: "https://akeelsalman.com",
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
  },
};

// Runs before paint so the saved theme is applied with no flash of the wrong
// colors. Only an explicit choice sets data-theme; otherwise CSS follows the OS.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
