"use client";

import { ProjectItem } from "@/lib/types";

interface Props {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

const inputClass =
  "w-full bg-transparent border-b border-border-light py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200";

const labelClass =
  "block text-[11px] font-medium text-tertiary uppercase tracking-wider mt-2 mb-0.5";

function generateId() {
  return "proj-" + Math.random().toString(36).substring(2, 9);
}

export default function ProjectsEditor({ items, onChange }: Props) {
  function updateItem(index: number, updated: ProjectItem) {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  }

  function addItem() {
    onChange([
      ...items,
      {
        id: generateId(),
        name: "",
        description: "",
        url: "",
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

          <div>
            <label className={labelClass}>Project Name</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) =>
                updateItem(i, { ...item, name: e.target.value })
              }
              placeholder="Project name"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={item.description}
              onChange={(e) =>
                updateItem(i, { ...item, description: e.target.value })
              }
              placeholder="What it does, technologies used, impact..."
              rows={2}
              className="w-full bg-transparent border border-border-light rounded-md py-1.5 px-2 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
            />
          </div>
          <div>
            <label className={labelClass}>URL</label>
            <input
              type="text"
              value={item.url}
              onChange={(e) =>
                updateItem(i, { ...item, url: e.target.value })
              }
              placeholder="github.com/you/project"
              className={inputClass}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-xs font-medium text-secondary hover:text-primary hover:border-primary/30 transition-all duration-200"
      >
        + Add Project
      </button>
    </div>
  );
}
