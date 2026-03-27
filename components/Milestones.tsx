"use client";

import { motion } from "framer-motion";
import milestones from "@/data/milestones.json";

const ACCENT_COLORS = ["#6366F1", "#10B981", "#F59E0B", "#F43F5E", "#8B5CF6"];

export default function Milestones() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-8 pb-36 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-2">Journey</p>
          <h1 className="text-3xl font-bold tracking-tight text-black">Milestones</h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            Key moments across {milestones.length} years of building
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient connecting line */}
          <div
            className="absolute left-[21px] top-3 bottom-3 w-0.5 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(16,185,129,0.4), rgba(244,63,94,0.4))",
            }}
          />

          <div className="space-y-5">
            {milestones.map((m, i) => {
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex gap-5"
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center shrink-0 pt-5">
                    <div
                      className="w-[18px] h-[18px] rounded-full border-2 z-10 shrink-0"
                      style={{
                        borderColor: color,
                        background: m.highlight ? color : "white",
                        boxShadow: m.highlight ? `0 0 14px ${color}70` : "none",
                      }}
                    />
                  </div>

                  {/* Glass card */}
                  <motion.div
                    whileHover={{ scale: 1.015, y: -2 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="flex-1 rounded-2xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.70)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: `1px solid ${
                        m.highlight ? color + "35" : "rgba(255,255,255,0.88)"
                      }`,
                      boxShadow: m.highlight
                        ? `0 8px 32px ${color}18, inset 0 1px 0 rgba(255,255,255,0.95)`
                        : "0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)",
                    }}
                  >
                    {/* Year + badge row */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{ color }}
                      >
                        {m.year}
                      </span>
                      {m.highlight && (
                        <span
                          className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold"
                          style={{ background: color + "18", color }}
                        >
                          Key Milestone
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-black mb-1.5">{m.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{m.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
