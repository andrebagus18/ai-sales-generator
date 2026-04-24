"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { History, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HistoryItem = {
  id: string;
  productName: string;
  createdAt: string;
  isPublished: boolean;
};

type DashboardNavbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  historyItems: HistoryItem[];
};

export function DashboardNavbar({ search, onSearchChange, historyItems }: DashboardNavbarProps) {
  const router = useRouter();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  async function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) {
      return;
    }

    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Ignore storage cleanup errors in restrictive environments.
    }

    await signOut({ redirect: false });
    router.replace("/login");
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-[#202020] p-3">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search pages..."
          className="min-w-[200px] flex-1 rounded-lg border border-white/10 bg-[#252525] px-4 py-2 text-sm text-white"
        />
        <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm"
        >
          <History size={16} />
          History
        </button>
        <Link
          href="/generator"
          className="rounded-lg border border-white/10 bg-[#252525] px-4 py-2 text-sm text-white transition hover:bg-[#333]"
        >
          New Page
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-red-400/40 px-4 py-2 text-sm text-red-300"
        >
          Logout
        </button>
      </div>

      <AnimatePresence>
        {isHistoryOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close history panel backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="fixed inset-0 z-40 bg-black/50"
            />
            <motion.aside
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-[#1f1f1f] p-5 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Sales Pages</h2>
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="rounded-md border border-white/10 p-2"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2">
                {historyItems.length === 0 ? (
                  <p className="text-sm text-zinc-300">No generated pages yet.</p>
                ) : (
                  historyItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/preview/${item.id}`}
                      onClick={() => setIsHistoryOpen(false)}
                      className="block rounded-lg border border-white/10 bg-[#252525] px-4 py-3 transition hover:bg-[#303030]"
                    >
                      <p className="font-medium text-white">{item.productName}</p>
                      <p className="mt-1 text-xs text-zinc-300">
                        {new Date(item.createdAt).toLocaleString()} • {item.isPublished ? "Published" : "Draft"}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

