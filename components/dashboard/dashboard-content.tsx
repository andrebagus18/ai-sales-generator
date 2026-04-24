"use client";

import { useMemo, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { PageActions } from "@/components/dashboard/page-actions";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";

type DashboardPageItem = {
  id: string;
  productName: string;
  isPublished: boolean;
  createdAt: string;
};

type DashboardContentProps = {
  pages: DashboardPageItem[];
};

export function DashboardContent({ pages }: DashboardContentProps) {
  const [search, setSearch] = useState("");

  const filteredPages = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) {
      return pages;
    }

    return pages.filter((page) => page.productName.toLowerCase().includes(value));
  }, [pages, search]);

  return (
    <>
      <DashboardNavbar
        search={search}
        onSearchChange={setSearch}
        historyItems={[...pages]
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .slice(0, 12)}
      />

      {filteredPages.length === 0 ? (
        <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
          <FilePlus2 size={44} className="mb-3 text-zinc-300" />
          <p className="text-lg text-zinc-200">No pages found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPages.map((page) => (
            <div key={page.id} className="rounded-xl border border-white/10 bg-[#202020] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-white">{page.productName}</h2>
                  <p className="text-sm text-zinc-300">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        page.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-zinc-200 text-zinc-700"
                      }`}
                    >
                      {page.isPublished ? "Published" : "Draft"}
                    </span>{" "}
                    • {new Date(page.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <PageActions id={page.id} isPublished={page.isPublished} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

