import { ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
}

export default function Classic({ data }: Props) {
  const { header, sectionOrder } = data;

  function renderSection(key: string) {
    switch (key) {
      case "header":
        return (
          <div key="header" className="text-center mb-5 pb-3 border-b-2 border-[#1d1d1f]">
            <h1 className="text-[24px] font-bold tracking-tight leading-tight uppercase">
              {header.name || "Your Name"}
            </h1>
            {header.title && (
              <p className="text-[11px] text-[#6e6e73] mt-1 tracking-wide">
                {header.title}
              </p>
            )}
            <div className="flex justify-center flex-wrap gap-x-2 gap-y-0 mt-1.5 text-[9px] text-[#6e6e73]">
              {header.location && <span>{header.location}</span>}
              {header.email && (
                <>
                  <span className="text-[#d2d2d7]">|</span>
                  <span>{header.email}</span>
                </>
              )}
              {header.phone && (
                <>
                  <span className="text-[#d2d2d7]">|</span>
                  <span>{header.phone}</span>
                </>
              )}
              {header.linkedin && (
                <>
                  <span className="text-[#d2d2d7]">|</span>
                  <span>{header.linkedin}</span>
                </>
              )}
              {header.portfolio && (
                <>
                  <span className="text-[#d2d2d7]">|</span>
                  <span>{header.portfolio}</span>
                </>
              )}
            </div>
          </div>
        );

      case "summary":
        if (!data.summary) return null;
        return (
          <div key="summary" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#1d1d1f] mb-1 pb-0.5 border-b border-[#1d1d1f]">
              Professional Summary
            </h2>
            <p className="text-[9px] leading-[1.6] text-[#424245]">
              {data.summary}
            </p>
          </div>
        );

      case "experience":
        if (data.experience.length === 0) return null;
        return (
          <div key="experience" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#1d1d1f] mb-1 pb-0.5 border-b border-[#1d1d1f]">
              Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-[#1d1d1f]">
                    {exp.company || "Company"}
                  </span>
                  <span className="text-[8px] text-[#6e6e73] shrink-0 ml-2">
                    {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] italic text-[#424245]">
                    {exp.role || "Role"}
                  </span>
                  {exp.location && (
                    <span className="text-[8px] text-[#86868b]">
                      {exp.location}
                    </span>
                  )}
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside pl-3">
                    {exp.bullets
                      .filter((b) => b.trim())
                      .map((bullet, bi) => (
                        <li
                          key={bi}
                          className="text-[9px] leading-[1.5] text-[#424245]"
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
            <h2 className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#1d1d1f] mb-1 pb-0.5 border-b border-[#1d1d1f]">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-1.5 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-[#1d1d1f]">
                    {edu.school || "School"}
                  </span>
                  <span className="text-[8px] text-[#6e6e73] shrink-0 ml-2">
                    {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] italic text-[#424245]">
                    {edu.degree || "Degree"}
                  </span>
                  {edu.location && (
                    <span className="text-[8px] text-[#86868b]">
                      {edu.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "skills":
        if (data.skills.length === 0) return null;
        return (
          <div key="skills" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#1d1d1f] mb-1 pb-0.5 border-b border-[#1d1d1f]">
              Skills
            </h2>
            <p className="text-[9px] leading-[1.6] text-[#424245]">
              {data.skills.join("  \u00B7  ")}
            </p>
          </div>
        );

      case "projects":
        if (data.projects.length === 0) return null;
        return (
          <div key="projects" className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#1d1d1f] mb-1 pb-0.5 border-b border-[#1d1d1f]">
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-1.5 last:mb-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-bold text-[#1d1d1f]">
                    {proj.name || "Project"}
                  </span>
                  {proj.url && (
                    <span className="text-[8px] text-[#6e6e73]">
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
