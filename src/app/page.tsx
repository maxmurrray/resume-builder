import Link from "next/link";
import AmbientAudio from "@/components/landing/AmbientAudio";
import ThemeToggle from "@/components/ThemeToggle";

const HAND_DRAWN_CIRCLES = [
  // Slightly tilted, loose oval — left feature
  "M24 40C16 20 40 6 80 4C120 2 156 14 160 36C164 58 140 74 100 76C60 78 32 60 24 40Z",
  // Rounder, slightly wobbly — middle feature
  "M20 38C14 16 44 2 90 2C136 2 164 18 164 40C164 62 138 78 90 78C42 78 26 60 20 38Z",
  // Tighter, angled — right feature
  "M28 42C22 22 46 6 86 3C126 0 158 16 162 38C166 60 142 76 96 77C50 78 34 62 28 42Z",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 sm:px-10 py-5 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          resume.
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/builder"
            className="text-xs font-medium text-secondary hover:text-primary transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <AmbientAudio />

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
        <div className="text-center max-w-2xl animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
            The best{" "}
            <span className="relative inline-block">
              resumes
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{ height: "0.18em" }}
              >
                <path
                  d="M2 8C20 2 40 12 60 6C80 0 100 10 120 4C140 -2 160 10 180 5C190 2.5 195 6 198 4"
                  stroke="#0071e3"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="animate-[squiggle_0.8s_ease-out_0.4s_both]"
                  style={{
                    strokeDasharray: 300,
                    strokeDashoffset: 300,
                  }}
                />
              </svg>
            </span>
            <br />
            are simple.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-secondary font-normal leading-relaxed max-w-lg mx-auto">
            No gimmicks. No templates that scream &ldquo;resume builder.&rdquo;
            <br />
            Just clean, professional formatting.
          </p>
          <p className="mt-3 text-sm text-tertiary">
            Create your resume in seconds, for free.
          </p>
          <div className="mt-10">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center h-12 px-8 bg-accent text-white text-xs font-bold uppercase tracking-[0.08em] border border-primary transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0_#1d1d1f] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              Start Building
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-2xl w-full animate-[fadeIn_1s_ease-out_0.2s_both]">
          {[
            { title: "Live Preview", desc: "See changes as you type" },
            { title: "Three Templates", desc: "Modern, Classic, or Compact" },
            { title: "PDF Export", desc: "ATS-friendly, high quality" },
          ].map((feature, i) => (
            <div key={feature.title} className="text-center relative py-5 px-3">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 184 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d={HAND_DRAWN_CIRCLES[i]}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  className={`animate-[squiggle_0.6s_ease-out_both]`}
                  style={{
                    strokeDasharray: 500,
                    strokeDashoffset: 500,
                    animationDelay: `${0.8 + i * 0.15}s`,
                  }}
                />
              </svg>
              <h3 className="text-sm font-semibold text-primary relative">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-tertiary relative">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
