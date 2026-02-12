"use client";

import { useState, KeyboardEvent } from "react";

interface Props {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillsEditor({ skills, onChange }: Props) {
  const [input, setInput] = useState("");

  function addSkill() {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setInput("");
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
    if (e.key === "Backspace" && input === "" && skills.length > 0) {
      onChange(skills.slice(0, -1));
    }
  }

  function removeSkill(index: number) {
    onChange(skills.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-bg rounded-md text-xs text-primary"
          >
            {skill}
            <button
              onClick={() => removeSkill(i)}
              className="text-tertiary hover:text-danger transition-colors duration-200"
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
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter..."
        className="w-full bg-transparent border-b border-border-light py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200"
      />
    </div>
  );
}
