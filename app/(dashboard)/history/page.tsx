import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageCard } from "@/components/dashboard/page-card";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const pages = await prisma.salesPage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      productName: true,
      isPublished: true,
      createdAt: true,
      originalDescription: true,
      thumbnailUrl: true,
    },
  });

  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Generation History</h1>
        <p className="text-zinc-400">Review all your previously generated sales pages.</p>
      </div>

      {pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">No history yet</h3>
          <p className="text-zinc-400 max-w-sm mb-8">
            You haven't generated any pages yet. Head over to the generator to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <PageCard key={page.id} {...page} />
          ))}
        </div>
      )}
    </div>
  );
}
