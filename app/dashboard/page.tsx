import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const pages = await prisma.salesPage.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      productName: true,
      isPublished: true,
      createdAt: true,
    },
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
      </div>
      <DashboardContent pages={pages.map((page) => ({ ...page, createdAt: page.createdAt.toISOString() }))} />
    </main>
  );
}

