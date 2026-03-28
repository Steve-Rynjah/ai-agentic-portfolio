"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import milestones from "@/data/milestones.json";

export default function Milestones() {
  return (
    /* Outer: paddingBottom reserves space above the fixed BottomTabs (~110px) */
    <div className="h-full flex flex-col" style={{ paddingBottom: '115px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 pt-8 pb-2 shrink-0 w-full max-w-5xl mx-auto"
      >
        <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-1">Journey</p>
        <h1 className="text-3xl font-bold tracking-tight text-black">Milestones</h1>
        <p className="text-sm text-zinc-400 mt-1">{milestones.length} years of building</p>

        {/* Animated down-arrow scroll hint */}
        <motion.div
          className="mt-3 flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-zinc-300" strokeWidth={2} />
          </motion.div>
          <span className="text-[10px] text-zinc-300 tracking-widest uppercase font-medium">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>

      {/* ScrollStack — fills remaining height above the tab-bar padding */}
      <div className="flex-1 min-h-0">
        <ScrollStack
          className="w-full max-w-5xl mx-auto"
          stackPosition="2%"
          scaleEndPosition="1%"
          itemDistance={60}
          itemStackDistance={18}
          baseScale={0.9}
          itemScale={0.025}
        >
          {milestones.map((m, i) => (
            <ScrollStackItem key={m.id}>
              <div className="px-8 py-7 h-full flex flex-col gap-5">

                {/* Year watermark + highlight badge */}
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black text-zinc-100 tracking-tighter select-none leading-none">
                    {m.year}
                  </span>
                  {m.highlight && (
                    <span className="text-[10px] px-3 py-1 rounded-full bg-black text-white font-semibold tracking-wide">
                      Key Milestone
                    </span>
                  )}
                </div>

                {/* Title + Role */}
                <div>
                  <h2 className="text-xl font-bold text-black leading-snug mb-1">
                    {m.title}
                  </h2>
                  <p className="text-xs text-zinc-400 font-medium">
                    {(m as typeof m & { role: string }).role}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-[#E5E5E5]" />

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed">{m.description}</p>

                {/* Skills */}
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-2">
                    Skills Learned
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(m as typeof m & { skills: string[] }).skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-[#E5E5E5] bg-white text-zinc-500 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievement */}
                <div className="mt-auto">
                  <div className="flex gap-3 p-4 rounded-xl bg-zinc-50 border border-[#E5E5E5]">
                    <span className="text-base shrink-0 mt-0.5">★</span>
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                        Achievement
                      </p>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {(m as typeof m & { achievement: string }).achievement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Index */}
                <div className="flex justify-end">
                  <span className="text-[10px] text-zinc-200 font-mono tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
