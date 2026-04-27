"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ExternalLink, 
  Copy, 
  Globe, 
  GlobeLock, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { deleteSalesPage, togglePublishSalesPage } from "@/app/actions/manage-sales-pages";

type PageActionsProps = {
  id: string;
  isPublished: boolean;
};

export function PageActions({ id, isPublished }: PageActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTone, setToastTone] = useState<"success" | "error">("success");
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function showToast(message: string, tone: "success" | "error" = "success") {
    setToastMessage(message);
    setToastTone(tone);
    window.setTimeout(() => setToastMessage(""), 2200);
  }

  async function onCopyPublicLink() {
    try {
      const url = `${window.location.origin}/p/${id}`;
      await navigator.clipboard.writeText(url);
      showToast("Public link copied to clipboard.");
    } catch {
      showToast("Unable to copy link.", "error");
    }
  }

  function onTogglePublish() {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("isPublished", String(isPublished));
      await togglePublishSalesPage(formData);
      showToast(isPublished ? "Page moved to draft." : "Page is now published.");
    });
  }

  function onDeleteConfirmed() {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", id);
      await deleteSalesPage(formData);
      setIsDeleteModalOpen(false);
      showToast("Sales page deleted.");
    });
  }

  useEffect(() => {
    if (!isDeleteModalOpen) return;
    cancelButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDeleteModalOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDeleteModalOpen]);

  const buttonBaseClass = "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition-all active:scale-95 disabled:opacity-50";

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`/preview/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonBaseClass} bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#04D9FF]/30`}
        >
          <ExternalLink size={14} className="text-[#04D9FF]" />
          Preview
        </a>
        
        <button
          onClick={onCopyPublicLink}
          disabled={!isPublished}
          className={`${buttonBaseClass} bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#04D9FF]/30 disabled:cursor-not-allowed`}
          type="button"
        >
          <Copy size={14} className={isPublished ? "text-[#04D9FF]" : "text-zinc-500"} />
          Link
        </button>

        <button
          onClick={onTogglePublish}
          disabled={isPending}
          className={`${buttonBaseClass} ${
            isPublished 
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
              : "bg-[#04D9FF]/10 border-[#04D9FF]/30 text-[#04D9FF] hover:bg-[#04D9FF]/20"
          }`}
          type="button"
        >
          {isPublished ? (
            <GlobeLock size={14} className="text-zinc-400" />
          ) : (
            <Globe size={14} className="text-[#04D9FF]" />
          )}
          {isPublished ? "Draft" : "Publish"}
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isPending}
          className={`${buttonBaseClass} bg-white/5 border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/30`}
          type="button"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              ref={modalRef}
              className="relative w-full max-w-sm rounded-3xl bg-[#0F172A] border border-white/10 p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-red-500/10 text-red-500">
                  <Trash2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Delete Page?</h3>
                <p className="text-zinc-400 text-sm mb-8">
                  This action cannot be undone. The page and all generated AI content will be permanently removed.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    ref={cancelButtonRef}
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onDeleteConfirmed}
                    disabled={isPending}
                    className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 transition-all disabled:opacity-50"
                  >
                    {isPending ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-[70] flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 shadow-2xl"
          >
            {toastTone === "success" ? (
              <CheckCircle2 size={20} className="text-emerald-400" />
            ) : (
              <AlertCircle size={20} className="text-red-400" />
            )}
            <span className="text-sm font-bold text-white whitespace-nowrap">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
