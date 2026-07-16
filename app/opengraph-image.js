import { ImageResponse } from "next/og";
import { site } from "./content";

// Social share card (LinkedIn / WhatsApp / iMessage / Twitter previews).
// Generated at build with next/og — matches the site's warm editorial theme.
export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#faf7f1",
          color: "#211d18",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#bd4f2c",
              fontWeight: 600,
            }}
          >
            {site.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              width: 96,
              height: 12,
              backgroundColor: "#bd4f2c",
              borderRadius: 3,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 36,
              lineHeight: 1.3,
              color: "#6f665a",
              maxWidth: 940,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#9a9084",
          }}
        >
          <div style={{ display: "flex" }}>akeelsalman.com</div>
          <div style={{ display: "flex" }}>Remote · Worldwide</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
