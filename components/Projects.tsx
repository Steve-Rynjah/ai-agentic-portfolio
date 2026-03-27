"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects.json";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-8 py-8 pb-36 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-2">
            Work
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Selected Projects
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            {projects.length} projects &middot; {featured.length} featured
          </p>
        </motion.div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-8">
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-3">
              Featured
            </p>
            <div className="grid md:grid-cols-2 gap-px border border-[#E5E5E5] bg-[#E5E5E5]">
              {featured.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="group flex flex-col justify-between p-6 bg-white hover:bg-zinc-50 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-sm font-semibold text-black group-hover:underline underline-offset-2 leading-snug">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        size={15}
                        className="text-zinc-200 group-hover:text-black transition-colors shrink-0 mt-0.5"
                      />
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 border border-[#E5E5E5] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-zinc-300 shrink-0 ml-3">
                      {project.year}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* All others */}
        {rest.length > 0 && (
          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-3">
              More
            </p>
            <div className="divide-y divide-[#E5E5E5] border border-[#E5E5E5]">
              {rest.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.12 + i * 0.05 }}
                  className="group flex items-center justify-between gap-6 px-5 py-4 bg-white hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-sm font-medium text-black group-hover:underline underline-offset-2 truncate">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed truncate">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden md:flex gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 border border-[#E5E5E5] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-zinc-300">{project.year}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-zinc-200 group-hover:text-black transition-colors"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
