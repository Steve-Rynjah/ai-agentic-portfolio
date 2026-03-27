"use client";

import { motion } from "framer-motion";
import { Sparkles, FolderOpen, BookOpen, Flag, Mail, GitBranch, ExternalLink } from "lucide-react";
import type { Tab } from "@/lib/types";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: {
  tab: Tab;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}[] = [
  { tab: "ask", label: "Ask Steve?", icon: Sparkles, badge: "AI" },
  { tab: "projects", label: "Projects", icon: FolderOpen },
  { tab: "blog", label: "Blog", icon: BookOpen },
  { tab: "milestones", label: "Milestones", icon: Flag },
  { tab: "contact", label: "Contact", icon: Mail },
];

const socialLinks = [
  { icon: GitBranch, label: "GitHub", href: "https://github.com/steveaustinrynjah" },
  { icon: ExternalLink, label: "LinkedIn", href: "https://linkedin.com/in/steveaustinrynjah" },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-[200px] h-full flex flex-col border-r border-[#E5E5E5] shrink-0 bg-white">
      {/* Identity */}
      <div className="px-5 pt-6 pb-5 border-b border-[#E5E5E5]">
        <p className="text-sm font-semibold text-black tracking-tight leading-tight">
          Steve Austin
        </p>
        <p className="text-xs text-zinc-400 mt-0.5">Full-Stack Engineer</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ tab, label, icon: Icon, badge }) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="relative w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left rounded overflow-hidden group"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-black rounded"
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
              <Icon
                size={14}
                className={`relative z-10 shrink-0 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-black"
                }`}
              />
              <span
                className={`relative z-10 font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-zinc-600 group-hover:text-black"
                }`}
              >
                {label}
              </span>
              {badge && (
                <span
                  className={`relative z-10 ml-auto text-[10px] px-1.5 py-0.5 rounded-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#E5E5E5]">
        <div className="flex gap-2 mb-3">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="flex items-center justify-center w-7 h-7 text-zinc-400 hover:text-black border border-[#E5E5E5] hover:border-zinc-300 transition-colors"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
        <p className="text-[10px] text-zinc-300">© 2024 Steve Austin</p>
      </div>
    </aside>
  );
}
