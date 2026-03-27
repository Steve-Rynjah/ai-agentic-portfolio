"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MouseGlow from "@/components/MouseGlow";
import BottomTabs from "@/components/BottomTabs";
import AskSteve from "@/components/AskSteve";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Milestones from "@/components/Milestones";
import Contact from "@/components/Contact";
import type { Tab } from "@/lib/types";

function TabContent({
  tab,
  onChatModeChange,
}: {
  tab: Tab;
  onChatModeChange: (v: boolean) => void;
}) {
  switch (tab) {
    case "ask":        return <AskSteve onChatModeChange={onChatModeChange} />;
    case "projects":   return <Projects />;
    case "blog":       return <Blog />;
    case "milestones": return <Milestones />;
    case "contact":    return <Contact />;
  }
}

const BG_TEXT: Record<Tab, string> = {
  ask:        "Steve Austin",
  projects:   "Projects",
  blog:       "Blog",
  milestones: "Journey",
  contact:    "Contact",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("ask");
  const [isChatMode, setIsChatMode] = useState(false);

  const inChat = activeTab === "ask" && isChatMode;

  return (
    <div className="h-full relative bg-white overflow-hidden">
      {/* ── Jellyfish canvas (z-5, behind everything) */}
      <MouseGlow />

      {/* ── Dynamic background watermark text — hidden in chat mode */}
      {!inChat && (
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none select-none flex justify-center overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeTab}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-black leading-none whitespace-nowrap"
              style={{
                fontSize: "clamp(80px, 17vw, 220px)",
                color: "rgba(0,0,0,0.045)",
                letterSpacing: "-0.02em",
              }}
            >
              {BG_TEXT[activeTab]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* ── Tab content (z-10) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          <TabContent tab={activeTab} onChatModeChange={setIsChatMode} />
        </motion.div>
      </AnimatePresence>

      {/* ── Floating glass bottom tabs — hidden in chat mode */}
      {!inChat && (
        <div
          className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none"
          style={{ zIndex: 40 }}
        >
          <div className="pointer-events-auto">
            <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      )}
    </div>
  );
}
