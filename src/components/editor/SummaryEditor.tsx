"use client";

interface Props {
  summary: string;
  onChange: (summary: string) => void;
}

export default function SummaryEditor({ summary, onChange }: Props) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-tertiary uppercase tracking-wider mb-1">
        Professional Summary
      </label>
      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="A brief overview of your experience and goals..."
        className="w-full bg-transparent border border-border-light rounded-lg py-2 px-3 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
      />
    </div>
  );
}
