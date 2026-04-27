import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedSalesPageById } from "@/lib/sales-pages";
import { TemplateRenderer } from "@/components/templates/template-renderer";
import { PublicAIContent } from "@/components/templates/types";

type PublicPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PublicPageProps): Promise<Metadata> {
  const { id } = await params;
  const page = await getPublishedSalesPageById(id);

  if (!page) {
    return {
      title: "Sales page not found",
      description: "The requested sales page does not exist.",
    };
  }

  const aiContent = page.aiContent as PublicAIContent;
  return {
    title: `${page.productName} | AI Sales Page`,
    description: aiContent.subheadline ?? `Landing page for ${page.productName}`,
  };
}

export default async function PublicSalesPage({ params }: PublicPageProps) {
  const { id } = await params;
  const page = await getPublishedSalesPageById(id);

  if (!page) {
    notFound();
  }

  return (
    <TemplateRenderer
      templateType={page.templateType}
      productName={page.productName}
      targetMarket={page.targetMarket}
      aiContent={page.aiContent as PublicAIContent}
    />
  );
}

