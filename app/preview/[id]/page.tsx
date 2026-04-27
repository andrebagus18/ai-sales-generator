import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getOwnedSalesPageById } from "@/lib/sales-pages";
import { TemplateRenderer } from "@/components/templates/template-renderer";
import { PublicAIContent } from "@/components/templates/types";

type PreviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DraftPreviewPage({ params }: PreviewPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const page = await getOwnedSalesPageById(id, session.user.id);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <div className="sticky top-0 z-40 border-b bg-amber-50 px-6 py-3 text-center text-sm font-medium text-amber-800">
        Private preview mode. Only you can see this page.
      </div>
      <TemplateRenderer
        templateType={page.templateType}
        productName={page.productName}
        targetMarket={page.targetMarket}
        aiContent={page.aiContent as PublicAIContent}
      />
    </div>
  );
}
