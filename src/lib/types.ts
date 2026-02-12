export interface HeaderData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
}

export type TemplateName = "modern" | "classic" | "compact";

export type SectionKey =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects";

export interface ResumeData {
  header: HeaderData;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  sectionOrder: SectionKey[];
  template: TemplateName;
}
