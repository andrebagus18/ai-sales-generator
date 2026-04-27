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
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      productName: true,
      isPublished: true,
      createdAt: true,
      originalDescription: true,
    },
  });

  return (
    <div className="px-6 py-10 lg:px-10">
      <DashboardContent 
        user={session.user} 
        pages={pages.map((page) => ({ ...page, createdAt: page.createdAt.toISOString() }))} 
      />
    </div>
  );
}

