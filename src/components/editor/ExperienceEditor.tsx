"use client";

import { ExperienceItem } from "@/lib/types";

interface Props {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

const inputClass =
  "w-full bg-transparent border-b border-border-light py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200";

const labelClass =
  "block text-[11px] font-medium text-tertiary uppercase tracking-wider mt-2 mb-0.5";

function generateId() {
  return "exp-" + Math.random().toString(36).substring(2, 9);
}

export default function ExperienceEditor({ items, onChange }: Props) {
  function updateItem(index: number, updated: ExperienceItem) {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  }

  function addItem() {
    onChange([
      ...items,
      {
        id: generateId(),
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        bullets: [""],
      },
    ]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function updateBullet(itemIndex: number, bulletIndex: number, value: string) {
    const next = [...items];
    const bullets = [...next[itemIndex].bullets];
    bullets[bulletIndex] = value;
    next[itemIndex] = { ...next[itemIndex], bullets };
    onChange(next);
  }

  function addBullet(itemIndex: number) {
    const next = [...items];
    next[itemIndex] = {
      ...next[itemIndex],
      bullets: [...next[itemIndex].bullets, ""],
    };
    onChange(next);
  }

  function removeBullet(itemIndex: number, bulletIndex: number) {
    const next = [...items];
    next[itemIndex] = {
      ...next[itemIndex],
      bullets: next[itemIndex].bullets.filter((_, i) => i !== bulletIndex),
    };
    onChange(next);
  }

  return (
    <div className="space-y-6">
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
              <label className={labelClass}>Company</label>
              <input
                type="text"
                value={item.company}
                onChange={(e) =>
                  updateItem(i, { ...item, company: e.target.value })
                }
                placeholder="Company name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Role</label>
              <input
                type="text"
                value={item.role}
                onChange={(e) =>
                  updateItem(i, { ...item, role: e.target.value })
                }
                placeholder="Job title"
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
              <label className={labelClass}>Start Date</label>
              <input
                type="text"
                value={item.startDate}
                onChange={(e) =>
                  updateItem(i, { ...item, startDate: e.target.value })
                }
                placeholder="Jan 2022"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input
                type="text"
                value={item.endDate}
                onChange={(e) =>
                  updateItem(i, { ...item, endDate: e.target.value })
                }
                placeholder="Present"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-2">
            <label className={labelClass}>Bullet Points</label>
            {item.bullets.map((bullet, bi) => (
              <div key={bi} className="flex items-start gap-1 mt-1">
                <span className="mt-2.5 text-tertiary text-xs">-</span>
                <textarea
                  value={bullet}
                  onChange={(e) => updateBullet(i, bi, e.target.value)}
                  placeholder="Describe what you did and the impact..."
                  rows={2}
                  className="flex-1 bg-transparent border border-border-light rounded-md py-1.5 px-2 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                />
                <button
                  onClick={() => removeBullet(i, bi)}
                  className="mt-1.5 p-0.5 text-tertiary hover:text-danger transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3"
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
              </div>
            ))}
            <button
              onClick={() => addBullet(i)}
              className="mt-2 text-xs font-medium text-accent hover:text-accent-hover transition-colors duration-200"
            >
              + Add bullet
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-xs font-medium text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
      >
        + Add Experience
      </button>
    </div>
  );
}
