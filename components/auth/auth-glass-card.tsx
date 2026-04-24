"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AuthGlassCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthGlassCard({ eyebrow, title, subtitle, children }: AuthGlassCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="glass-card w-full rounded-2xl p-8"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-indigo-200/90">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-2 text-sm text-indigo-100/70">{subtitle}</p>
      {children}
    </motion.section>
  );
}

