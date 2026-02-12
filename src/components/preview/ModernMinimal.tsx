import { ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
}

export default function ModernMinimal({ data }: Props) {
  const { header, sectionOrder } = data;

  function renderSection(key: string) {
    switch (key) {
      case "header":
        return (
          <div key="header" className="mb-5">
            <h1 className="text-[22px] font-bold tracking-tight leading-tight">
              {header.name || "Your Name"}
            </h1>
            <p className="text-[11px] text-[#6e6e73] mt-0.5">
              {[header.title, header.location].filter(Boolean).join(" | ")}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-0 mt-1 text-[9px] text-[#6e6e73]">
              {header.email && <span>{header.email}</span>}
              {header.phone && <span>{header.phone}</span>}
              {header.linkedin && <span>{header.linkedin}</span>}
              {header.portfolio && <span>{header.portfolio}</span>}
            </div>
          </div>
        );

      case "summary":
        if (!data.summary) return null;
        return (
          <div key="summary" className="mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1d1d1f] mb-1.5 pb-0.5 border-b border-[#e8e8ed]">
              Summary
            </h2>
            <p className="text-[9px] leading-[1.5] text-[#424245]">
              {data.summary}
            </p>
          </div>
        );

      case "experience":
        if (data.experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1d1d1f] mb-1.5 pb-0.5 border-b border-[#e8e8ed]">
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-2.5 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] font-semibold text-[#1d1d1f]">
                      {exp.role || "Role"}
                    </span>
                    <span className="text-[9px] text-[#6e6e73] ml-1">
                      at {exp.company || "Company"}
                    </span>
                  </div>
                  <span className="text-[8px] text-[#86868b] shrink-0 ml-2">
                    {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
                  </span>
                </div>
                {exp.location && (
                  <p className="text-[8px] text-[#86868b]">{exp.location}</p>
                )}
                {exp.bullets.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {exp.bullets
                      .filter((b) => b.trim())
                      .map((bullet, bi) => (
                        <li
                          key={bi}
                          className="text-[9px] leading-[1.5] text-[#424245] pl-2.5 relative before:content-[''] before:absolute before:left-0 before:top-[5px] before:w-[3px] before:h-[3px] before:rounded-full before:bg-[#d2d2d7]"
                        >
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );

      case "education":
        if (data.education.length === 0) return null;
        return (
          <div key="education" className="mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1d1d1f] mb-1.5 pb-0.5 border-b border-[#e8e8ed]">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-1.5 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] font-semibold text-[#1d1d1f]">
                      {edu.school || "School"}
                    </span>
                    {edu.location && (
                      <span className="text-[8px] text-[#86868b] ml-1">
                        {edu.location}
                      </span>
                    )}
                  </div>
                  <span className="text-[8px] text-[#86868b] shrink-0 ml-2">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
                  </span>
                </div>
                <p className="text-[9px] text-[#6e6e73]">
                  {edu.degree || "Degree"}
                </p>
              </div>
            ))}
          </div>
        );

      case "skills":
        if (data.skills.length === 0) return null;
        return (
          <div key="skills" className="mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1d1d1f] mb-1.5 pb-0.5 border-b border-[#e8e8ed]">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[8px] px-1.5 py-0.5 bg-[#f5f5f7] rounded text-[#424245]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );

      case "projects":
        if (data.projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1d1d1f] mb-1.5 pb-0.5 border-b border-[#e8e8ed]">
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-1.5 last:mb-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-semibold text-[#1d1d1f]">
                    {proj.name || "Project"}
                  </span>
                  {proj.url && (
                    <span className="text-[8px] text-[#0071e3]">
                      {proj.url}
                    </span>
                  )}
                </div>
                <p className="text-[9px] leading-[1.5] text-[#424245]">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="p-8 font-[Inter,system-ui,sans-serif]">
      {sectionOrder.map((key) => renderSection(key))}
    </div>
  );
}
