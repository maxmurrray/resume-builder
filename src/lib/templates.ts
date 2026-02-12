import { TemplateName } from "./types";

export interface TemplateInfo {
  id: TemplateName;
  name: string;
  description: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean lines, generous whitespace, subtle dividers",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout, centered name, horizontal rules",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense layout, two-column skills, maximum content",
  },
];
