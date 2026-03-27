"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import posts from "@/data/blog.json";

const GRADIENTS = [
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
];

function BlogCard({
  post,
  index,
}: {
  post: (typeof posts)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
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
          className="h-40 relative overflow-hidden"
          style={{ background: GRADIENTS[index % GRADIENTS.length] }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.40) 0%, transparent 60%)",
            }}
          />
          {/* Tags pinned to bottom-left of thumbnail */}
          <div className="absolute inset-x-0 bottom-0 p-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-white"
                style={{ background: "rgba(0,0,0,0.22)", backdropFilter: "blur(6px)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Hover arrow */}
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
          >
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-sm font-bold text-black mb-2 leading-snug group-hover:text-zinc-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>{post.date}</span>
            <span className="text-zinc-200">·</span>
            <span>{post.readTime} read</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Blog() {
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
          <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-2">Writing</p>
          <h1 className="text-3xl font-bold tracking-tight text-black">Blog</h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            {posts.length} articles on engineering, AI, and design
          </p>
        </motion.div>

        {/* 3D glass cards grid with thumbnail */}
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
