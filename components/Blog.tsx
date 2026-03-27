"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import posts from "@/data/blog.json";

export default function Blog() {
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
            Writing
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black">Blog</h1>
          <p className="text-sm text-zinc-400 mt-1.5">
            {posts.length} articles on engineering, AI, and design
          </p>
        </motion.div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 gap-px border border-[#E5E5E5] bg-[#E5E5E5]">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="group flex flex-col justify-between p-6 bg-white hover:bg-zinc-50 transition-all cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 border border-[#E5E5E5] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-200 group-hover:text-black transition-colors shrink-0"
                  />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2.5 leading-snug group-hover:underline underline-offset-2">
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-5 text-xs text-zinc-400">
                <span>{post.date}</span>
                <span className="text-zinc-200">·</span>
                <span>{post.readTime} read</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
