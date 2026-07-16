import { ImageResponse } from "next/og";

// Branded favicon — "A" monogram on terracotta accent.
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
          backgroundColor: "#bd4f2c",
          color: "#ffffff",
          fontSize: 46,
          fontWeight: 700,
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}
