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
    <header className="sticky top-0 z-50 h-12 border-b border-border-light bg-surface/80 backdrop-blur-xl">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-sm font-semibold text-primary tracking-tight hover:opacity-70 transition-opacity duration-200"
        >
          Resume.
        </Link>

        {/* Center: Template switcher */}
        <TemplateSwitcher
          active={data.template}
          onChange={onTemplateChange}
        />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ResetButton onReset={onReset} />
          <ExportButton data={data} />
        </div>
      </div>
    </header>
  );
}
