"use client";

import { Calendar, ExternalLink, Copy, Globe, Trash2, MoreVertical } from "lucide-react";
import { PageActions } from "./page-actions";
import { motion } from "framer-motion";

type PageCardProps = {
  id: string;
  productName: string;
  originalDescription: string;
  isPublished: boolean;
  createdAt: string;
};

export function PageCard({ id, productName, originalDescription, isPublished, createdAt }: PageCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-[#04D9FF]/50 hover:shadow-[0_0_20px_rgba(4,217,255,0.15)]"
    >
      {/* Thumbnail Placeholder */}
      <div className="aspect-video w-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#04D9FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="text-center z-10">
          <Globe size={40} className="mx-auto mb-2 text-[#04D9FF]/40 group-hover:text-[#04D9FF] transition-colors duration-300" />
          <p className="text-[10px] uppercase tracking-widest text-[#04D9FF]/40 font-bold">Sales Page</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            isPublished 
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
              : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
          }`}>
            {isPublished ? "Published" : "Draft"}
          </span>
          <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-medium">
            <Calendar size={12} />
            {formattedDate}
          </div>
        </div>

        <h3 className="mb-1 text-lg font-bold text-white group-hover:text-[#04D9FF] transition-colors duration-200 line-clamp-1">
          {productName}
        </h3>
        <p className="mb-6 text-sm text-zinc-400 line-clamp-2">
          {originalDescription}
        </p>

        {/* Actions */}
        <div className="mt-auto border-t border-white/5 pt-4">
          <PageActions id={id} isPublished={isPublished} />
        </div>
      </div>
    </motion.div>
  );
}
