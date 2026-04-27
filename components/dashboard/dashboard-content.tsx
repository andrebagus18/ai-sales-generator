"use client";

import { useState, useMemo } from "react";
import { FilePlus2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PageCard } from "./page-card";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type DashboardPageItem = {
  id: string;
  productName: string;
  originalDescription: string;
  isPublished: boolean;
  createdAt: string;
  thumbnailUrl?: string | null;
};

type DashboardContentProps = {
  user: {
    name?: string | null;
  };
  pages: DashboardPageItem[];
};

export function DashboardContent({ user, pages }: DashboardContentProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Fits 2 rows on desktop (3 cols), 3 rows on tablet (2 cols), 6 rows on mobile (1 col)

  const filteredPages = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return pages;
    return pages.filter((page) =>
      page.productName.toLowerCase().includes(value) ||
      page.originalDescription.toLowerCase().includes(value)
    );
  }, [pages, search]);

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const currentItems = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-[#04D9FF]">{user.name || "User"}</span>!✨
          </h1>
          <p className="text-zinc-400">Manage and monitor your AI-generated sales pages.</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#04D9FF] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-[300px] bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#04D9FF]/50 focus:ring-1 focus:ring-[#04D9FF]/50 transition-all"
          />
        </div>
      </div>

      {/* Grid Content */}
      {filteredPages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl text-center">
          <div className="p-4 rounded-full bg-[#04D9FF]/10 text-[#04D9FF] mb-4">
            <FilePlus2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No pages found</h3>
          <p className="text-zinc-400 max-w-sm mb-8">
            You haven't created any pages yet. Start building your first one with our AI generator!
          </p>
          <Link
            href="/generator"
            className="px-6 py-3 bg-[#04D9FF] text-[#0F172A] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(4,217,255,0.4)]"
          >
            Create Your First Page
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {currentItems.map((page, index) => (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PageCard {...page} priority={index < 2} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg border transition-all ${currentPage === page
                        ? "bg-[#04D9FF]/10 border-[#04D9FF] text-[#04D9FF] font-bold"
                        : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
