"use client";

import { useState, ReactNode } from "react";
import { SectionKey } from "@/lib/types";

interface Props {
  title: string;
  sectionKey: SectionKey;
  children: ReactNode;
  defaultOpen?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export default function SectionAccordion({
  title,
  children,
  defaultOpen = false,
  onMoveUp,
  onMoveDown,
  canMoveUp = true,
  canMoveDown = true,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border-light">
      <div className="flex items-center gap-2 py-3 px-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center gap-2 text-left"
        >
          <svg
            className={`w-3 h-3 text-tertiary transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {title}
          </span>
        </button>

        {/* Reorder buttons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-1 text-tertiary hover:text-primary disabled:opacity-20 transition-colors duration-200"
            title="Move up"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-1 text-tertiary hover:text-primary disabled:opacity-20 transition-colors duration-200"
            title="Move down"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}
