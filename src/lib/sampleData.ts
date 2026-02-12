import { ResumeData } from "./types";

export const SAMPLE_RESUME: ResumeData = {
  header: {
    name: "Alexandra Chen",
    title: "Product Designer",
    location: "San Francisco, CA",
    email: "alex.chen@email.com",
    phone: "(415) 555-0142",
    linkedin: "linkedin.com/in/alexandrachen",
    portfolio: "alexchen.design",
  },
  summary:
    "Product designer with 6 years of experience crafting intuitive digital experiences for consumer and enterprise products. Passionate about design systems, accessibility, and bridging the gap between user needs and business goals.",
  experience: [
    {
      id: "exp-1",
      company: "Stripe",
      role: "Senior Product Designer",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      bullets: [
        "Led the redesign of the merchant dashboard, improving task completion rates by 34% across 2M+ users",
        "Built and maintained a component library used by 12 product teams, reducing design-to-dev handoff time by 40%",
        "Collaborated with engineering and data science to ship A/B tested payment flows that increased conversion by 8%",
      ],
    },
    {
      id: "exp-2",
      company: "Figma",
      role: "Product Designer",
      location: "San Francisco, CA",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      bullets: [
        "Designed core collaboration features including real-time cursors and commenting, used by 4M+ designers daily",
        "Created the FigJam brainstorming tool onboarding experience, achieving a 72% activation rate",
        "Partnered with research to conduct 50+ user interviews that shaped the plugin marketplace strategy",
      ],
    },
    {
      id: "exp-3",
      company: "Dropbox",
      role: "Junior Designer",
      location: "San Francisco, CA",
      startDate: "Aug 2017",
      endDate: "May 2019",
      bullets: [
        "Designed responsive marketing pages and product illustrations for the Dropbox Business launch",
        "Contributed to the Dropbox design system, documenting patterns and usage guidelines",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Rhode Island School of Design",
      degree: "BFA, Graphic Design",
      location: "Providence, RI",
      startDate: "2013",
      endDate: "2017",
    },
  ],
  skills: [
    "Figma",
    "Sketch",
    "Prototyping",
    "Design Systems",
    "User Research",
    "Accessibility",
    "HTML/CSS",
    "React",
    "Framer",
    "Data Visualization",
  ],
  projects: [
    {
      id: "proj-1",
      name: "DesignLint",
      description:
        "Open-source Figma plugin that automatically detects inconsistencies in design files. 15K+ installs.",
      url: "github.com/alexchen/designlint",
    },
  ],
  sectionOrder: [
    "header",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
  ],
  template: "modern",
};
