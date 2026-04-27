"use client";

import { Calendar, Globe } from "lucide-react";
import { PageActions } from "./page-actions";
import { motion } from "framer-motion";
import Image from "next/image";

type PageCardProps = {
  id: string;
  productName: string;
  originalDescription: string;
  isPublished: boolean;
  createdAt: string;
  thumbnailUrl?: string | null;
  priority?: boolean;
};

export function PageCard({ id, productName, originalDescription, isPublished, createdAt, thumbnailUrl, priority }: PageCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Use saved thumbnailUrl if available, otherwise pick a deterministic dummy image
  const thumbPath = thumbnailUrl || `/dummy-image/thumb-${(id.charCodeAt(0) % 3) + 1}.png`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-[#04D9FF]/50 hover:shadow-[0_0_20px_rgba(4,217,255,0.15)]"
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center overflow-hidden relative">
        <Image
          src={thumbPath}
          alt={productName}
          fill
          className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          {...(priority ? { fetchPriority: "high" } : {})}
        />
        <div className="absolute inset-0 bg-[#0F172A]/40 group-hover:bg-transparent transition-colors duration-300" />
        <div className="absolute top-3 left-3 z-10">
          <div className="p-1.5 rounded-lg bg-[#04D9FF]/20 backdrop-blur-md border border-[#04D9FF]/30 text-[#04D9FF]">
            <Globe size={14} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${isPublished
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
