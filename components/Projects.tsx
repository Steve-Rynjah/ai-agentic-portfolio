"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects.json";

const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
];

function initials(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function FeaturedCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ scale: 1.025 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group cursor-pointer rounded-2xl overflow-hidden"
    >
      <a href={project.link} className="block">
        <div
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.88)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
        >
          {/* Thumbnail */}
          <div
            className="h-44 relative overflow-hidden"
            style={{ background: gradient }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 35%, rgba(255,255,255,0.35) 0%, transparent 65%)",
              }}
            />
            {/* Large watermark initials */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-black text-white/20 select-none tracking-tighter">
                {initials(project.title)}
              </span>
            </div>
            {/* Year badge */}
            <div className="absolute top-4 right-4">
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white"
                style={{ background: "rgba(0,0,0,0.22)", backdropFilter: "blur(8px)" }}
              >
                {project.year}
              </span>
            </div>
            {/* Hover arrow */}
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
            >
              <ArrowUpRight size={14} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-sm font-bold text-black mb-2 leading-snug group-hover:text-zinc-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-500 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-8 pb-36 max-w-4xl mx-auto">
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
            {projects.length} projects &middot; {featured.length} featured
          </p>
        </motion.div>

        {/* Featured — 3D glass cards with thumbnail */}
        {featured.length > 0 && (
          <div className="mb-8">
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-4">Featured</p>
            <div className="grid md:grid-cols-2 gap-4">
              {featured.map((project, i) => (
                <FeaturedCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Rest — compact glass list */}
        {rest.length > 0 && (
          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-widest mb-4">More</p>
            <div className="space-y-3">
              {rest.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.14 + i * 0.06 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="group flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.68)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.85)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Mini thumbnail */}
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                    style={{
                      background: GRADIENTS[(featured.length + i) % GRADIENTS.length],
                    }}
                  >
                    <span className="text-[11px] font-black text-white/70 select-none">
                      {initials(project.title).slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-black truncate group-hover:text-zinc-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-zinc-300">{project.year}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-zinc-300 group-hover:text-black transition-colors"
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
