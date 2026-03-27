"use client";

import { motion } from "framer-motion";
import milestones from "@/data/milestones.json";

export default function Milestones() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 py-8 pb-36 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-2">
            Journey
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Milestones
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            Key moments across {milestones.length} years of building
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[52px] top-1 bottom-4 w-px bg-[#E5E5E5]" />

          <div className="space-y-0">
            {milestones.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex gap-0"
              >
                {/* Year + dot */}
                <div className="w-[68px] shrink-0 flex items-start justify-end gap-3 pt-1 pr-4">
                  <span className="text-xs font-medium text-zinc-400 whitespace-nowrap">
                    {m.year}
                  </span>
                  <div
                    className={`mt-[3px] w-2.5 h-2.5 rounded-full border-2 shrink-0 z-10 bg-white ${
                      m.highlight
                        ? "border-black bg-black"
                        : "border-[#E5E5E5]"
                    }`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pl-5 pb-10 ${
                    i === milestones.length - 1 ? "pb-0" : ""
                  }`}
                >
                  <div
                    className={`border border-[#E5E5E5] p-4 transition-colors ${
                      m.highlight ? "border-zinc-300 bg-zinc-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-black">
                        {m.title}
                      </h3>
                      {m.highlight && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-black text-white">
                          Key
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
