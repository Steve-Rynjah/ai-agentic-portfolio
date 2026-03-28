"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import projects from "@/data/projects.json";

function initials(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Projects() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-8 pb-36 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-2">Work</p>
          <h1 className="text-3xl font-bold tracking-tight text-black">Selected Projects</h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            {projects.length} projects &middot; {projects.filter((p) => p.featured).length} featured
          </p>
        </motion.div>

        {/* Project list */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: i * 0.07 }}
            >
              <BorderGlow
                borderRadius={16}
                backgroundColor="#FFFFFF"
                glowColor="210 85 65"
                glowIntensity={1.4}
                colors={['#06b6d4', '#818cf8', '#f472b6']}
                fillOpacity={0.35}
              >
                <a
                  href={project.link}
                  className="group flex items-center gap-5 p-5 min-h-[88px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Icon / Thumbnail */}
                  <div className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center bg-black">
                    <span className="text-lg font-black text-white tracking-tighter select-none">
                      {initials(project.title)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="text-sm font-bold text-black leading-snug group-hover:text-zinc-500 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        <span className="text-xs text-zinc-300">{project.year}</span>
                        <ArrowUpRight
                          size={14}
                          className="text-zinc-300 group-hover:text-black transition-colors"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full border border-[#E5E5E5] text-zinc-400 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
