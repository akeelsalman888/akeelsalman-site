import { ImageResponse } from "next/og";

// Branded favicon — white "A" monogram on the site's near-black canvas.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 46,
          fontWeight: 900,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
