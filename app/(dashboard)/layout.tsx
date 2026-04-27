import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar user={session.user} />
      <main className="flex-1 overflow-y-auto lg:pl-0 pt-20 lg:pt-0">
        <div className="mx-auto h-full max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
