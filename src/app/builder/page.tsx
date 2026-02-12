"use client";

import { useResume } from "@/hooks/useResume";
import { useState, useCallback, useRef, useEffect } from "react";
import TopBar from "@/components/builder/TopBar";
import EditorPane from "@/components/builder/EditorPane";
import PreviewPane from "@/components/builder/PreviewPane";

const MIN_EDITOR = 320;
const MAX_EDITOR = 700;
const MOBILE_BREAKPOINT = 768;

export default function BuilderPage() {
  const { data, loaded, updateData, setTemplate, reorderSection, resetData } =
    useResume();
  const [editorWidth, setEditorWidth] = useState(420);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  // Detect mobile
  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

      {/* Mobile tab toggle */}
      {isMobile && (
        <div className="flex border-b border-border-light shrink-0 bg-surface">
          <button
            onClick={() => setMobileTab("editor")}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors duration-150 ${
              mobileTab === "editor"
                ? "text-accent border-b-2 border-accent"
                : "text-secondary"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors duration-150 ${
              mobileTab === "preview"
                ? "text-accent border-b-2 border-accent"
                : "text-secondary"
            }`}
          >
            Preview
          </button>
        </div>
      )}

      {isMobile ? (
        /* Mobile: show one pane at a time */
        <div className="flex-1 overflow-hidden">
          {mobileTab === "editor" ? (
            <EditorPane
              data={data}
              updateData={updateData}
              reorderSection={reorderSection}
            />
          ) : (
            <PreviewPane data={data} />
          )}
        </div>
      ) : (
        /* Desktop: side-by-side with drag handle */
        <div className="flex-1 flex overflow-hidden">
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

          <div
            className="w-1 shrink-0 cursor-col-resize relative group"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className={`absolute inset-0 transition-colors duration-150 ${isDragging ? "bg-accent" : "bg-border-light group-hover:bg-border"}`} />
          </div>

          <div className="flex-1 overflow-hidden">
            <PreviewPane data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
