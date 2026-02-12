"use client";

import { EducationItem } from "@/lib/types";

interface Props {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

const inputClass =
  "w-full bg-transparent border-b border-border-light py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200";

const labelClass =
  "block text-[11px] font-medium text-tertiary uppercase tracking-wider mt-2 mb-0.5";

function generateId() {
  return "edu-" + Math.random().toString(36).substring(2, 9);
}

export default function EducationEditor({ items, onChange }: Props) {
  function updateItem(index: number, updated: EducationItem) {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  }

  function addItem() {
    onChange([
      ...items,
      {
        id: generateId(),
        school: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
      },
    ]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="relative bg-bg rounded-lg p-3 space-y-1"
        >
          <button
            onClick={() => removeItem(i)}
            className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-tertiary hover:text-danger transition-colors duration-200"
            title="Remove"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>School</label>
              <input
                type="text"
                value={item.school}
                onChange={(e) =>
                  updateItem(i, { ...item, school: e.target.value })
                }
                placeholder="University name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Degree</label>
              <input
                type="text"
                value={item.degree}
                onChange={(e) =>
                  updateItem(i, { ...item, degree: e.target.value })
                }
                placeholder="BS, Computer Science"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={item.location}
                onChange={(e) =>
                  updateItem(i, { ...item, location: e.target.value })
                }
                placeholder="City, State"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Start</label>
              <input
                type="text"
                value={item.startDate}
                onChange={(e) =>
                  updateItem(i, { ...item, startDate: e.target.value })
                }
                placeholder="2013"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End</label>
              <input
                type="text"
                value={item.endDate}
                onChange={(e) =>
                  updateItem(i, { ...item, endDate: e.target.value })
                }
                placeholder="2017"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-xs font-medium text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
      >
        + Add Education
      </button>
    </div>
  );
}
