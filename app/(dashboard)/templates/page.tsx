"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layout, ArrowRight, Zap, Shield, Split } from "lucide-react";

const templates = [
  {
    id: "dark-blue-tech",
    name: "Dark Blue Tech",
    description: "Modern, glowing, and high-tech. Perfect for AI and software products.",
    icon: Zap,
    color: "bg-blue-600",
    preview: "/dummy-image/thumb-1.png",
  },
  {
    id: "professional-clean",
    name: "Professional Clean",
    description: "Minimalist, trusted, and clean. Best for corporate and professional services.",
    icon: Shield,
    color: "bg-slate-900",
    preview: "/dummy-image/thumb-2.png",
  },
  {
    id: "modern-split",
    name: "Modern Split",
    description: "Bold, edgy, and high-contrast split layout for maximum impact.",
    icon: Split,
    color: "bg-blue-700",
    preview: "/dummy-image/thumb-3.png",
  },
];

export default function TemplatesPage() {
  return (
    <div className="px-6 py-10 lg:px-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Choose a Template</h1>
        <p className="text-zinc-400">Select a design theme to start generating your landing page.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-[#04D9FF]/30"
          >
            {/* Preview Image */}
            <div className="aspect-video w-full overflow-hidden border-b border-white/10 relative">
              <img 
                src={template.preview} 
                alt={template.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60" />
              <div className={`absolute bottom-4 left-4 p-2 rounded-xl ${template.color} text-white`}>
                <template.icon size={20} />
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                {template.description}
              </p>

              <Link
                href={`/generator?template=${template.id}`}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold transition-all hover:bg-[#04D9FF] hover:text-[#0F172A] hover:border-[#04D9FF] group-hover:shadow-[0_0_20px_rgba(4,217,255,0.2)]"
              >
                Use Template
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
