"use client";

import { HeaderData } from "@/lib/types";

interface Props {
  header: HeaderData;
  onChange: (header: HeaderData) => void;
}

const inputClass =
  "w-full bg-transparent border-b border-border-light py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200";

const labelClass = "block text-[11px] font-medium text-tertiary uppercase tracking-wider mt-3 mb-0.5";

export default function HeaderEditor({ header, onChange }: Props) {
  function update(field: keyof HeaderData, value: string) {
    onChange({ ...header, [field]: value });
  }

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={header.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Alexandra Chen"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={header.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Product Designer"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Location</label>
        <input
          type="text"
          value={header.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="San Francisco, CA"
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={header.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="alex@email.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={header.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(415) 555-0142"
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>LinkedIn</label>
          <input
            type="text"
            value={header.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            placeholder="linkedin.com/in/..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Portfolio</label>
          <input
            type="text"
            value={header.portfolio}
            onChange={(e) => update("portfolio", e.target.value)}
            placeholder="yoursite.com"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
