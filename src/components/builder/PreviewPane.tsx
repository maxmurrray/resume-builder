"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ResumeData } from "@/lib/types";
import ResumePreview from "../preview/ResumePreview";

interface Props {
  data: ResumeData;
}

// Letter size in px at 96 DPI: 8.5" x 11" = 816 x 1056
const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.15;

export default function PreviewPane({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState(0.5);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [overflow, setOverflow] = useState(false);

  const scale = baseScale * zoom;

  // Auto-fit base scale
  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const padding = 48;
      const scaleX = (width - padding) / PAGE_WIDTH;
      const scaleY = (height - padding) / PAGE_HEIGHT;
      setBaseScale(Math.min(scaleX, scaleY, 1));
    }

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Check overflow
  useEffect(() => {
    if (!paperRef.current) return;
    const contentHeight = paperRef.current.scrollHeight;
    setOverflow(contentHeight > PAGE_HEIGHT);
  }, [data]);

  // Mouse wheel zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function handleWheel(e: WheelEvent) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z - e.deltaY * 0.005)));
      }
    }
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Panning handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pan]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setPan({ x: panStart.current.panX + dx, y: panStart.current.panY + dy });
  }, [isPanning]);

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="h-full flex flex-col bg-bg">
      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-1 py-2 border-b border-border-light shrink-0">
        <button
          onClick={zoomOut}
          className="w-7 h-7 flex items-center justify-center rounded text-secondary hover:text-primary hover:bg-border-light transition-colors duration-150"
          title="Zoom out"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={resetView}
          className="min-w-[48px] h-7 px-1.5 rounded text-[11px] font-medium text-secondary hover:text-primary hover:bg-border-light transition-colors duration-150 tabular-nums"
          title="Reset zoom"
        >
          {zoomPercent}%
        </button>
        <button
          onClick={zoomIn}
          className="w-7 h-7 flex items-center justify-center rounded text-secondary hover:text-primary hover:bg-border-light transition-colors duration-150"
          title="Zoom in"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Preview area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="absolute inset-0 flex items-start justify-center py-6"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          <div className="relative" style={{ width: PAGE_WIDTH * scale, height: PAGE_HEIGHT * scale }}>
            {overflow && (
              <div className="absolute -top-5 left-0 right-0 text-center z-10">
                <span className="inline-block px-2.5 py-0.5 bg-[#fff3cd] text-[#856404] text-[10px] font-medium rounded-full">
                  Content exceeds one page
                </span>
              </div>
            )}
            <div
              ref={paperRef}
              className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] origin-top-left"
              style={{
                width: PAGE_WIDTH,
                height: PAGE_HEIGHT,
                transform: `scale(${scale})`,
                overflow: "hidden",
              }}
            >
              <div data-resume-preview>
                <ResumePreview data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
