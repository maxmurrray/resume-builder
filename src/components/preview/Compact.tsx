import { ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
}

export default function Compact({ data }: Props) {
  const { header, sectionOrder } = data;

  function renderSection(key: string) {
    switch (key) {
      case "header":
        return (
          <div key="header" className="mb-3">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-[20px] font-bold tracking-tight leading-tight">
                  {header.name || "Your Name"}
                </h1>
                <p className="text-[10px] text-[#6e6e73]">
                  {header.title}
                </p>
              </div>
              <div className="text-right text-[8px] text-[#6e6e73] space-y-0.5">
                {header.email && <p>{header.email}</p>}
                {header.phone && <p>{header.phone}</p>}
                {header.location && <p>{header.location}</p>}
                {header.linkedin && <p>{header.linkedin}</p>}
                {header.portfolio && <p>{header.portfolio}</p>}
              </div>
            </div>
            <div className="mt-1.5 h-px bg-[#d2d2d7]" />
          </div>
        );

      case "summary":
        if (!data.summary) return null;
        return (
          <div key="summary" className="mb-2.5">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0071e3] mb-1">
              Summary
            </h2>
            <p className="text-[8px] leading-[1.5] text-[#424245]">
              {data.summary}
            </p>
          </div>
        );

      case "experience":
        if (data.experience.length === 0) return null;
        return (
          <div key="experience" className="mb-2.5">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0071e3] mb-1">
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-[9px] font-semibold text-[#1d1d1f]">
                    {exp.role || "Role"}{" "}
                    <span className="font-normal text-[#6e6e73]">
                      at {exp.company || "Company"}
                    </span>
                  </span>
                  <span className="text-[7px] text-[#86868b] shrink-0 ml-2">
                    {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
                    {exp.location ? ` | ${exp.location}` : ""}
                  </span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul className="mt-0.5 space-y-0">
                    {exp.bullets
                      .filter((b) => b.trim())
                      .map((bullet, bi) => (
                        <li
                          key={bi}
                          className="text-[8px] leading-[1.4] text-[#424245] pl-2 relative before:content-['-'] before:absolute before:left-0 before:text-[#86868b]"
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
          <div key="education" className="mb-2.5">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0071e3] mb-1">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-1 last:mb-0 flex justify-between items-baseline">
                <span className="text-[9px] text-[#1d1d1f]">
                  <span className="font-semibold">{edu.degree || "Degree"}</span>
                  {" — "}
                  {edu.school || "School"}
                </span>
                <span className="text-[7px] text-[#86868b] shrink-0 ml-2">
                  {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
                </span>
              </div>
            ))}
          </div>
        );

      case "skills":
        if (data.skills.length === 0) return null;
        return (
          <div key="skills" className="mb-2.5">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0071e3] mb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-1 gap-y-0.5">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[8px] px-1.5 py-px bg-[#f5f5f7] rounded text-[#424245]"
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
          <div key="projects" className="mb-2.5">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#0071e3] mb-1">
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-1 last:mb-0">
                <span className="text-[9px] font-semibold text-[#1d1d1f]">
                  {proj.name || "Project"}
                </span>
                {proj.url && (
                  <span className="text-[7px] text-[#0071e3] ml-1">
                    {proj.url}
                  </span>
                )}
                <p className="text-[8px] leading-[1.4] text-[#424245]">
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
    <div className="p-6 font-[Inter,system-ui,sans-serif]">
      {sectionOrder.map((key) => renderSection(key))}
    </div>
  );
}
