"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  FilePlus, 
  Layout, 
  History, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  Sparkles
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

type SidebarProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "New Page", href: "/generator", icon: FilePlus },
  { name: "Template", href: "#", icon: Layout },
  { name: "Riwayat", href: "#", icon: History },
  { name: "Pengaturan", href: "#", icon: Settings },
];

export function Sidebar({ user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A]/80 backdrop-blur-xl border-r border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-[#04D9FF]/20 text-[#04D9FF]">
          <Sparkles size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">AI Generator</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-[#04D9FF]/10 text-[#04D9FF]" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon 
                size={20} 
                className={isActive ? "text-[#04D9FF]" : "group-hover:text-[#04D9FF]"} 
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="h-10 w-10 rounded-full bg-[#04D9FF]/20 border border-[#04D9FF]/50 overflow-hidden flex items-center justify-center">
            {user.image ? (
              <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
            ) : (
              <span className="text-[#04D9FF] font-bold">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name || "User"}</p>
            <p className="text-xs text-zinc-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[#0F172A]/80 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#04D9FF]/20 text-[#04D9FF]">
            <Sparkles size={18} />
          </div>
          <span className="font-bold text-white">AI Generator</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[280px] fixed inset-y-0 left-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for desktop sidebar */}
      <div className="hidden lg:block w-[280px] flex-shrink-0" />
    </>
  );
}
