"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ResumeData, TemplateName, SectionKey } from "@/lib/types";
import { SAMPLE_RESUME } from "@/lib/sampleData";
import { loadResume, saveResume, clearResume } from "@/lib/storage";

export function useResume() {
  const [data, setData] = useState<ResumeData>(SAMPLE_RESUME);
  const [loaded, setLoaded] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadResume();
    if (saved) {
      setData(saved);
    }
    setLoaded(true);
  }, []);

  // Debounced autosave
  useEffect(() => {
    if (!loaded) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveResume(data);
    }, 500);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [data, loaded]);

  const updateData = useCallback(
    (updater: (prev: ResumeData) => ResumeData) => {
      setData((prev) => updater(prev));
    },
    []
  );

  const setTemplate = useCallback((template: TemplateName) => {
    setData((prev) => ({ ...prev, template }));
  }, []);

  const reorderSection = useCallback(
    (sectionKey: SectionKey, direction: "up" | "down") => {
      setData((prev) => {
        const order = [...prev.sectionOrder];
        const movableOrder = order.filter((s): s is SectionKey => s !== "header");
        const idx = movableOrder.indexOf(sectionKey);
        if (idx === -1) return prev;
        if (direction === "up" && idx === 0) return prev;
        if (direction === "down" && idx === movableOrder.length - 1) return prev;

        const swapIdx = direction === "up" ? idx - 1 : idx + 1;
        [movableOrder[idx], movableOrder[swapIdx]] = [
          movableOrder[swapIdx],
          movableOrder[idx],
        ];
        return { ...prev, sectionOrder: ["header", ...movableOrder] };
      });
    },
    []
  );

  const resetData = useCallback(() => {
    clearResume();
    setData(SAMPLE_RESUME);
  }, []);

  return {
    data,
    loaded,
    updateData,
    setTemplate,
    reorderSection,
    resetData,
  };
}
