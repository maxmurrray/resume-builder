import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Resume. — The best resumes are simple.";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top nav bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 48px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#1d1d1f",
              display: "flex",
            }}
          >
            resume.
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#86868b",
              display: "flex",
            }}
          >
            Get Started
          </div>
        </div>

        {/* Hero content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>The best resumes</span>
            <span style={{ display: "flex" }}>are simple.</span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "20px",
              color: "#86868b",
              lineHeight: 1.6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>
              No gimmicks. No templates that scream &quot;resume builder.&quot;
            </span>
            <span style={{ display: "flex" }}>
              Just clean, professional formatting.
            </span>
          </div>
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "48px",
              padding: "0 32px",
              backgroundColor: "#0071e3",
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "4px 4px 0 #1d1d1f",
            }}
          >
            Start Building
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
