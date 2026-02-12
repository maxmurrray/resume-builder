import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "Resume — Build a beautiful resume",
  description:
    "A minimal, elegant resume builder. Create an ATS-friendly resume in minutes.",
  openGraph: {
    title: "Resume — Build a beautiful resume",
    description:
      "A minimal, elegant resume builder. Create an ATS-friendly resume in minutes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume — Build a beautiful resume",
    description:
      "A minimal, elegant resume builder. Create an ATS-friendly resume in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
