"use client";

import { useState } from "react";
import { ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
}

export default function ExportButton({ data }: Props) {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    setExporting(true);
    setError(null);
    try {
      const { generatePdf } = await import("@/lib/pdfExport");
      await generatePdf(data);
    } catch (err) {
      console.error("PDF export failed:", err);
      const message =
        err instanceof Error ? err.message : "PDF export failed";
      setError(message);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {error && (
        <span className="text-[10px] text-danger max-w-[160px] truncate">
          {error}
        </span>
      )}
      <button
        onClick={handleExport}
        disabled={exporting}
        className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-accent text-white text-xs font-medium transition-all duration-200 hover:bg-accent-hover active:scale-[0.97] disabled:opacity-50"
      >
        {exporting ? "Exporting..." : "Export PDF"}
      </button>
    </div>
  );
}
