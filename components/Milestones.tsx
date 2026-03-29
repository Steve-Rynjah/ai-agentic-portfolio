"use client";

import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, Building2, Folder, Zap, Trophy } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { useMilestones, Milestone } from "@/lib/hooks/useMilestones";

const statusStyles: Record<string, string> = {
  Mastered: "bg-black text-white",
  Proficient: "bg-zinc-100 text-zinc-700 border border-[#E5E5E5]",
  Learning: "bg-white text-zinc-400 border border-[#E5E5E5]",
  Completed: "bg-black text-white",
  "In Progress": "bg-zinc-100 text-zinc-600 border border-[#E5E5E5]",
};

const statusDot: Record<string, string> = {
  Mastered: "bg-black",
  Proficient: "bg-zinc-400",
  Learning: "bg-zinc-200",
  Completed: "bg-black",
  "In Progress": "bg-zinc-300",
};

function SkeletonCard() {
  return (
    <div className="px-8 py-7 h-full flex flex-col gap-5 animate-pulse">
      <div className="h-12 w-32 bg-zinc-100 rounded-md" />
      <div className="h-5 w-3/4 bg-zinc-100 rounded-md" />
      <div className="border-t border-[#E5E5E5]" />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-20 bg-zinc-100 rounded" />
        <div className="h-4 w-1/2 bg-zinc-100 rounded" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-20 bg-zinc-100 rounded-full" />
        ))}
      </div>
    </div>
  );
}

function MilestoneCard({ m, i, total }: { m: Milestone; i: number; total: number }) {
  return (
    <div className="px-7 py-6 h-full flex flex-col gap-5 overflow-y-auto">

      {/* Year + Designation */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-5xl font-black text-zinc-100 tracking-tighter select-none leading-none block">
            {m.year}
          </span>
          <h2 className="text-base font-bold text-black leading-snug mt-2">
            {m.designation}
          </h2>
        </div>
        <span className="text-[10px] font-mono text-zinc-300 tabular-nums shrink-0 mt-1">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="border-t border-[#E5E5E5]" />

      {/* Company History */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Building2 size={11} className="text-zinc-400" />
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
            Company
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {m.company_history.map((c, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-black font-medium">{c.company_name}</span>
              <span className="text-[11px] text-zinc-400 font-mono">
                {c.from} – {c.to}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Folder size={11} className="text-zinc-400" />
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
            Projects
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {m.projects.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[p.status] ?? "bg-zinc-200"}`}
                />
                <span className="text-sm text-zinc-700">{p.project_name}</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusStyles[p.status] ?? "bg-zinc-100 text-zinc-500"}`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Zap size={11} className="text-zinc-400" />
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
            Skills
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {m.skills.map((s, idx) => (
            <span
              key={idx}
              className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusStyles[s.status] ?? "bg-zinc-100 text-zinc-500 border border-[#E5E5E5]"}`}
            >
              {s.skill_name}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {m.achievements.length > 0 && (
        <div className="mt-auto">
          <div className="flex items-center gap-1.5 mb-2">
            <Trophy size={11} className="text-zinc-400" />
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
              Achievement
            </p>
          </div>
          {m.achievements.map((a, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-zinc-50 border border-[#E5E5E5]"
            >
              <p className="text-xs text-zinc-600 leading-relaxed">{a.description}</p>
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-black border border-black rounded-full px-2.5 py-1 hover:bg-black hover:text-white transition-colors"
                >
                  Verify <ExternalLink size={9} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Milestones() {
  const { data: milestones, isLoading, isError } = useMilestones();

  return (
    <div className="h-full flex flex-col" style={{ paddingBottom: "115px" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 pt-8 pb-2 shrink-0 w-full max-w-5xl mx-auto"
      >
        <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-1">Journey</p>
        <h1 className="text-3xl font-bold tracking-tight text-black">Milestones</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {milestones ? `${milestones.length} years of building` : "Loading career timeline..."}
        </p>

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

      {/* ScrollStack */}
      <div className="flex-1 min-h-0">
        {isLoading && (
          <div className="w-full max-w-5xl mx-auto h-full flex items-start pt-4 px-4">
            <div className="w-full rounded-2xl border border-[#E5E5E5] bg-white shadow-sm">
              <SkeletonCard />
            </div>
          </div>
        )}

        {isError && (
          <div className="w-full max-w-5xl mx-auto px-6 pt-6">
            <p className="text-sm text-zinc-400">Failed to load milestones. Please try again.</p>
          </div>
        )}

        {milestones && (
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
                <MilestoneCard m={m} i={i} total={milestones.length} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        )}
      </div>
    </div>
  );
}
