import { ImageResponse } from "next/og";

// Apple touch icon — white "A" monogram on the site's near-black canvas.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0b0e",
          color: "#e07d52",
          fontSize: 120,
          fontWeight: 900,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
