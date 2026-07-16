import { ImageResponse } from "next/og";

// Apple touch icon — "A" monogram on terracotta accent.
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
          backgroundColor: "#bd4f2c",
          color: "#ffffff",
          fontSize: 120,
          fontWeight: 700,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
