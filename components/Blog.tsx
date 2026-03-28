"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import posts from "@/data/blog.json";

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

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="h-full"
            >
              <BorderGlow
                borderRadius={16}
                backgroundColor="#FFFFFF"
                glowColor="280 80 65"
                glowIntensity={1.4}
                colors={['#f472b6', '#818cf8', '#06b6d4']}
                fillOpacity={0.35}
                className="group cursor-pointer h-full"
              >
                {/* Thumbnail image */}
                <div className="h-44 w-full overflow-hidden relative bg-zinc-100 rounded-t-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-[#E5E5E5] text-zinc-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-black mb-2 leading-snug group-hover:text-zinc-500 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-5">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>{post.date}</span>
                      <span className="text-zinc-200">·</span>
                      <span>{post.readTime} read</span>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#E5E5E5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black">
                      <ArrowUpRight size={13} className="text-white" />
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
