import { ImageResponse } from "next/og";
import { site } from "./content";

// Social share card (LinkedIn / WhatsApp / iMessage / Twitter previews).
// Generated at build with next/og — matches the site theme.
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
          backgroundColor: "#0a0b0e",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#e07d52",
              fontWeight: 700,
            }}
          >
            {site.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              width: 96,
              height: 6,
              backgroundColor: "#e07d52",
              borderRadius: 3,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#a3a3a3",
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
            fontSize: 24,
            color: "#74757e",
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
