"use client";

import { motion } from "framer-motion";
import { Sparkles, Briefcase, BookOpen, Route, User } from "lucide-react";
import type { Tab } from "@/lib/types";

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: {
  id: Tab;
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  activeColor: string;
}[] = [
  { id: "ask",        label: "Home",     Icon: Sparkles,  activeColor: "#6366F1" },
  { id: "projects",   label: "Projects", Icon: Briefcase, activeColor: "#10B981" },
  { id: "blog",       label: "Blog",     Icon: BookOpen,  activeColor: "#8B5CF6" },
  { id: "milestones", label: "Journey",  Icon: Route,     activeColor: "#F43F5E" },
  { id: "contact",    label: "Contact",  Icon: User,      activeColor: "#F59E0B" },
];

export default function BottomTabs({ activeTab, onTabChange }: Props) {
  return (
    // Outer glass pill container
    <div
      className="flex gap-1.5 p-1.5 rounded-[28px]"
      style={{
        background: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(32px) saturate(200%)",
        WebkitBackdropFilter: "blur(32px) saturate(200%)",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        boxShadow:
          "0 16px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      {tabs.map(({ id, label, Icon, activeColor }) => {
        const isActive = activeTab === id;
        return (
          <motion.button
            key={id}
            onClick={() => onTabChange(id)}
            whileTap={{ scale: 0.91 }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="relative flex flex-col items-center gap-1.5 px-[18px] py-3 rounded-[22px] min-w-[70px] cursor-pointer overflow-hidden"
            style={{
              background: isActive
                ? "rgba(255, 255, 255, 0.72)"
                : "transparent",
              backdropFilter: isActive
                ? "blur(20px) saturate(180%)"
                : "none",
              WebkitBackdropFilter: isActive
                ? "blur(20px) saturate(180%)"
                : "none",
              border: isActive
                ? "1px solid rgba(255, 255, 255, 0.75)"
                : "1px solid transparent",
              boxShadow: isActive
                ? "0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)"
                : "none",
              transition: "background 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",
            }}
          >
            {/* Active glow spot behind icon */}
            {isActive && (
              <motion.div
                layoutId="tab-glow"
                className="absolute inset-0 rounded-[22px] opacity-15"
                style={{ background: `radial-gradient(circle at 50% 50%, ${activeColor}, transparent 70%)` }}
                transition={{ duration: 0.25 }}
              />
            )}

            <Icon
              size={21}
              strokeWidth={isActive ? 2.2 : 1.7}
              color={isActive ? activeColor : "rgba(120,120,130,0.7)"}
            />
            <span
              className="text-[11px] font-semibold leading-none tracking-tight"
              style={{
                color: isActive ? "#18181B" : "rgba(120,120,130,0.75)",
                transition: "color 0.2s ease",
              }}
            >
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
