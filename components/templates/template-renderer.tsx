import { TemplateProps } from "./types";
import DarkBlueTechTemplate from "./dark-blue-tech";
import ProfessionalCleanTemplate from "./professional-clean";
import ModernSplitTemplate from "./modern-split";

type TemplateRendererProps = TemplateProps & {
  templateType: string;
};

export function TemplateRenderer({
  templateType,
  productName,
  targetMarket,
  aiContent,
}: TemplateRendererProps) {
  switch (templateType) {
    case "dark-blue-tech":
      return (
        <DarkBlueTechTemplate
          productName={productName}
          targetMarket={targetMarket}
          aiContent={aiContent}
        />
      );
    case "modern-split":
      return (
        <ModernSplitTemplate
          productName={productName}
          targetMarket={targetMarket}
          aiContent={aiContent}
        />
      );
    case "professional-clean":
    default:
      return (
        <ProfessionalCleanTemplate
          productName={productName}
          targetMarket={targetMarket}
          aiContent={aiContent}
        />
      );
  }
}
