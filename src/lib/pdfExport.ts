import { ResumeData } from "./types";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

// Letter size
const PAGE_W_IN = 8.5;
const PAGE_H_IN = 11;
const PAGE_W_PX = 816;
const PAGE_H_PX = 1056;

/**
 * Clones the resume preview into a full-size off-screen container,
 * captures it at high resolution, and downloads as PDF.
 */
export async function generatePdf(data: ResumeData): Promise<void> {
  const previewEl = document.querySelector("[data-resume-preview]") as HTMLElement | null;
  if (!previewEl) {
    throw new Error("Resume preview not found");
  }

  // Clone into a full-size off-screen container (no CSS transform scaling)
  const offscreen = document.createElement("div");
  offscreen.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: ${PAGE_W_PX}px;
    height: ${PAGE_H_PX}px;
    overflow: hidden;
    background: white;
    z-index: -1;
  `;
  offscreen.innerHTML = previewEl.innerHTML;

  // Copy all stylesheets so Tailwind classes work
  document.querySelectorAll("style").forEach((style) => {
    offscreen.prepend(style.cloneNode(true));
  });

  document.body.appendChild(offscreen);

  // Wait a frame for styles to apply
  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(offscreen, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: PAGE_W_PX,
    height: PAGE_H_PX,
  });

  document.body.removeChild(offscreen);

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "letter",
  });

  pdf.addImage(imgData, "PNG", 0, 0, PAGE_W_IN, PAGE_H_IN);

  const fileName = data.header.name
    ? `${data.header.name.replace(/\s+/g, "_")}_Resume.pdf`
    : "Resume.pdf";

  pdf.save(fileName);
}
