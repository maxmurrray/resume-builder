import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Resume — Build a beautiful resume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Document icon */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "150px",
              background: "#f5f5f7",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "20px",
                width: "100%",
              }}
            >
              <div style={{ width: "60%", height: "6px", background: "#231f20", borderRadius: "3px", display: "flex" }} />
              <div style={{ width: "80%", height: "4px", background: "#ccc", borderRadius: "2px", display: "flex" }} />
              <div style={{ width: "70%", height: "4px", background: "#ccc", borderRadius: "2px", display: "flex" }} />
              <div style={{ width: "85%", height: "4px", background: "#ccc", borderRadius: "2px", display: "flex" }} />
              <div style={{ width: "50%", height: "4px", background: "#ccc", borderRadius: "2px", display: "flex" }} />
              <div style={{ width: "75%", height: "4px", background: "#ccc", borderRadius: "2px", display: "flex" }} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#f5f5f7",
                letterSpacing: "-1px",
                display: "flex",
              }}
            >
              Resume.
            </div>
            <div
              style={{
                fontSize: "22px",
                color: "#888",
                display: "flex",
              }}
            >
              Build a beautiful resume in minutes
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
