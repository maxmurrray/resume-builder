import { ResumeData } from "@/lib/types";
import ModernMinimal from "./ModernMinimal";
import Classic from "./Classic";
import Compact from "./Compact";

interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  switch (data.template) {
    case "classic":
      return <Classic data={data} />;
    case "compact":
      return <Compact data={data} />;
    case "modern":
    default:
      return <ModernMinimal data={data} />;
  }
}
