"use client";

import { ResumeData, SectionKey } from "@/lib/types";
import SectionAccordion from "../editor/SectionAccordion";
import HeaderEditor from "../editor/HeaderEditor";
import SummaryEditor from "../editor/SummaryEditor";
import ExperienceEditor from "../editor/ExperienceEditor";
import EducationEditor from "../editor/EducationEditor";
import SkillsEditor from "../editor/SkillsEditor";
import ProjectsEditor from "../editor/ProjectsEditor";

interface Props {
  data: ResumeData;
  updateData: (updater: (prev: ResumeData) => ResumeData) => void;
  reorderSection: (key: SectionKey, dir: "up" | "down") => void;
}

const SECTION_LABELS: Record<SectionKey, string> = {
  header: "Header",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
};

export default function EditorPane({
  data,
  updateData,
  reorderSection,
}: Props) {
  const movableSections = data.sectionOrder.filter((s) => s !== "header");

  function renderSection(key: SectionKey) {
    switch (key) {
      case "header":
        return (
          <SectionAccordion
            key="header"
            sectionKey="header"
            title={SECTION_LABELS.header}
            canMoveUp={false}
            canMoveDown={false}
          >
            <HeaderEditor
              header={data.header}
              onChange={(header) =>
                updateData((prev) => ({ ...prev, header }))
              }
            />
          </SectionAccordion>
        );
      case "summary":
        return (
          <SectionAccordion
            key="summary"
            sectionKey="summary"
            title={SECTION_LABELS.summary}
            onMoveUp={() => reorderSection("summary", "up")}
            onMoveDown={() => reorderSection("summary", "down")}
            canMoveUp={movableSections.indexOf("summary") > 0}
            canMoveDown={
              movableSections.indexOf("summary") < movableSections.length - 1
            }
          >
            <SummaryEditor
              summary={data.summary}
              onChange={(summary) =>
                updateData((prev) => ({ ...prev, summary }))
              }
            />
          </SectionAccordion>
        );
      case "experience":
        return (
          <SectionAccordion
            key="experience"
            sectionKey="experience"
            title={SECTION_LABELS.experience}
            onMoveUp={() => reorderSection("experience", "up")}
            onMoveDown={() => reorderSection("experience", "down")}
            canMoveUp={movableSections.indexOf("experience") > 0}
            canMoveDown={
              movableSections.indexOf("experience") <
              movableSections.length - 1
            }
          >
            <ExperienceEditor
              items={data.experience}
              onChange={(experience) =>
                updateData((prev) => ({ ...prev, experience }))
              }
            />
          </SectionAccordion>
        );
      case "education":
        return (
          <SectionAccordion
            key="education"
            sectionKey="education"
            title={SECTION_LABELS.education}
            onMoveUp={() => reorderSection("education", "up")}
            onMoveDown={() => reorderSection("education", "down")}
            canMoveUp={movableSections.indexOf("education") > 0}
            canMoveDown={
              movableSections.indexOf("education") <
              movableSections.length - 1
            }
          >
            <EducationEditor
              items={data.education}
              onChange={(education) =>
                updateData((prev) => ({ ...prev, education }))
              }
            />
          </SectionAccordion>
        );
      case "skills":
        return (
          <SectionAccordion
            key="skills"
            sectionKey="skills"
            title={SECTION_LABELS.skills}
            onMoveUp={() => reorderSection("skills", "up")}
            onMoveDown={() => reorderSection("skills", "down")}
            canMoveUp={movableSections.indexOf("skills") > 0}
            canMoveDown={
              movableSections.indexOf("skills") < movableSections.length - 1
            }
          >
            <SkillsEditor
              skills={data.skills}
              onChange={(skills) =>
                updateData((prev) => ({ ...prev, skills }))
              }
            />
          </SectionAccordion>
        );
      case "projects":
        return (
          <SectionAccordion
            key="projects"
            sectionKey="projects"
            title={SECTION_LABELS.projects}
            onMoveUp={() => reorderSection("projects", "up")}
            onMoveDown={() => reorderSection("projects", "down")}
            canMoveUp={movableSections.indexOf("projects") > 0}
            canMoveDown={
              movableSections.indexOf("projects") <
              movableSections.length - 1
            }
          >
            <ProjectsEditor
              items={data.projects}
              onChange={(projects) =>
                updateData((prev) => ({ ...prev, projects }))
              }
            />
          </SectionAccordion>
        );
      default:
        return null;
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-surface">
      {data.sectionOrder.map((key) => renderSection(key))}
    </div>
  );
}
