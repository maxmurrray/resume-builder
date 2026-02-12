"use client";

import { useResume } from "@/hooks/useResume";
import { useState, useCallback, useRef } from "react";
import TopBar from "@/components/builder/TopBar";
import EditorPane from "@/components/builder/EditorPane";
import PreviewPane from "@/components/builder/PreviewPane";

const MIN_EDITOR = 320;
const MAX_EDITOR = 700;

export default function BuilderPage() {
  const { data, loaded, updateData, setTemplate, reorderSection, resetData } =
    useResume();
  const [editorWidth, setEditorWidth] = useState(420);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, width: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX, width: editorWidth };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [editorWidth]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const newWidth = Math.min(MAX_EDITOR, Math.max(MIN_EDITOR, dragStart.current.width + dx));
      setEditorWidth(newWidth);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar
        data={data}
        onTemplateChange={setTemplate}
        onReset={resetData}
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div
          className="shrink-0 overflow-hidden"
          style={{ width: editorWidth }}
        >
          <EditorPane
            data={data}
            updateData={updateData}
            reorderSection={reorderSection}
          />
        </div>

        {/* Drag handle */}
        <div
          className="w-1 shrink-0 cursor-col-resize relative group"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className={`absolute inset-0 transition-colors duration-150 ${isDragging ? "bg-accent" : "bg-border-light group-hover:bg-border"}`} />
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-hidden">
          <PreviewPane data={data} />
        </div>
      </div>
    </div>
  );
}
