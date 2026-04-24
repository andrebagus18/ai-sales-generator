"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    if (!isDeleteModalOpen) {
      return;
    }

    cancelButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDeleteModalOpen(false);
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (focusable.length === 0) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isDeleteModalOpen]);

  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <a href={`/preview/${id}`} className="rounded-md border border-white/10 px-3 py-1 transition hover:bg-zinc-700">
          Preview
        </a>
        <button
          onClick={onCopyPublicLink}
          disabled={!isPublished}
          className="rounded-md border border-white/10 px-3 py-1 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          title={isPublished ? "Copy public link" : "Publish first to share publicly"}
        >
          Copy Link
        </button>
        <button
          onClick={onTogglePublish}
          disabled={isPending}
          className="rounded-md border border-white/10 px-3 py-1 transition hover:bg-zinc-700 disabled:opacity-60"
          type="button"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isPending}
          className="rounded-md border border-red-400/40 px-3 py-1 text-red-400 transition hover:bg-red-900/30 disabled:opacity-60"
          type="button"
        >
          Delete
        </button>
      </div>

      {isDeleteModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div ref={modalRef} className="w-full max-w-md rounded-2xl bg-[#202020] border border-white/10 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Delete sales page?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              This action is permanent. Your generated page and content will be removed.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                ref={cancelButtonRef}
                className="rounded-lg border border-white/10 px-4 py-2 transition hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDeleteConfirmed}
                disabled={isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {toastMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 text-sm text-white shadow-lg ${
              toastTone === "success" ? "bg-emerald-600" : "bg-red-600"
            }`}
          >
            {toastMessage}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

