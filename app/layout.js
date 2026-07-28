import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "./content";
import IntroOverlay from "./components/IntroOverlay";
import Ambience from "./components/Ambience";
import PointerEffects from "./components/PointerEffects";

// Display / body split rather than one face doing both: Space Grotesk's
// slightly mechanical letterforms carry the headings, Inter handles running text
// where Grotesk's quirks would get tiring.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
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

// Dark-only site — tells the browser to render form controls, scrollbars and the
// mobile URL bar in dark chrome to match.
export const viewport = {
  colorScheme: "dark",
  themeColor: "#0a0b0e",
};

// Runs before paint so a repeat load within the same browser session skips
// the intro overlay instantly instead of flashing it and then removing it.
const introScript = `(function(){try{if(sessionStorage.getItem('introShown')){document.documentElement.setAttribute('data-intro','done');}}catch(e){}})();`;

export default function RootLayout({ children }) {
  // suppressHydrationWarning on <html>: introScript sets data-intro before React
  // hydrates, so the server and client markup differ there by design.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          {/* Without JS the IntersectionObserver never adds .is-visible, so the
              reveal resting state would hide everything. Resets `translate` (not
              `transform`) because that is the property the entrances animate. */}
          <style>
            {".reveal,.reveal-child{opacity:1 !important;translate:none !important;}"}
          </style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <IntroOverlay />
        <Ambience />
        <PointerEffects />
        {children}
      </body>
    </html>
  );
}
