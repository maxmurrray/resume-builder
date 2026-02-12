"use client";

import { TemplateName } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";

interface Props {
  active: TemplateName;
  onChange: (t: TemplateName) => void;
}

export default function TemplateSwitcher({ active, onChange }: Props) {
  return (
    <div className="flex items-center bg-bg rounded-full p-0.5">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-3 py-1.5 text-[11px] md:px-4 md:text-xs font-medium rounded-full transition-all duration-200 ${
            active === t.id
              ? "bg-surface text-primary shadow-sm"
              : "text-secondary hover:text-primary"
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
