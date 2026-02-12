"use client";

import Link from "next/link";
import { ResumeData, TemplateName } from "@/lib/types";
import TemplateSwitcher from "./TemplateSwitcher";
import ExportButton from "./ExportButton";
import ResetButton from "./ResetButton";
import ThemeToggle from "../ThemeToggle";

interface Props {
  data: ResumeData;
  onTemplateChange: (t: TemplateName) => void;
  onReset: () => void;
}

export default function TopBar({ data, onTemplateChange, onReset }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-light bg-surface/80 backdrop-blur-xl">
      {/* Desktop: single row */}
      <div className="h-12 hidden md:flex items-center justify-between px-4">
        <Link
          href="/"
          className="text-sm font-semibold text-primary tracking-tight hover:opacity-70 transition-opacity duration-200"
        >
          Resume.
        </Link>

        <TemplateSwitcher
          active={data.template}
          onChange={onTemplateChange}
        />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ResetButton onReset={onReset} />
          <ExportButton data={data} />
        </div>
      </div>

      {/* Mobile: two rows */}
      <div className="md:hidden">
        <div className="h-11 flex items-center justify-between px-3">
          <Link
            href="/"
            className="text-sm font-semibold text-primary tracking-tight hover:opacity-70 transition-opacity duration-200"
          >
            Resume.
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ResetButton onReset={onReset} />
            <ExportButton data={data} />
          </div>
        </div>
        <div className="flex justify-center pb-2">
          <TemplateSwitcher
            active={data.template}
            onChange={onTemplateChange}
          />
        </div>
      </div>
    </header>
  );
}
