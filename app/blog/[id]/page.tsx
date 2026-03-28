"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useBlogPost } from "@/lib/hooks/useBlogPost";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function DetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 animate-pulse">
      <div className="h-4 w-16 bg-zinc-100 rounded-full mb-10" />
      <div className="h-64 w-full bg-zinc-100 rounded-2xl mb-8" />
      <div className="flex gap-2 mb-5">
        <div className="h-5 w-16 bg-zinc-100 rounded-full" />
        <div className="h-5 w-20 bg-zinc-100 rounded-full" />
      </div>
      <div className="h-7 w-3/4 bg-zinc-100 rounded-full mb-4" />
      <div className="h-3 w-32 bg-zinc-100 rounded-full mb-8" />
      <div className="space-y-2.5">
        <div className="h-3 w-full bg-zinc-100 rounded-full" />
        <div className="h-3 w-full bg-zinc-100 rounded-full" />
        <div className="h-3 w-5/6 bg-zinc-100 rounded-full" />
        <div className="h-3 w-4/5 bg-zinc-100 rounded-full" />
      </div>
    </div>
  );
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: post, isLoading } = useBlogPost(id);

  return (
    <div className="h-screen overflow-y-auto bg-white">
      {isLoading && <DetailSkeleton />}

      {!isLoading && post && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mx-auto px-6 py-10"
        >
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-black transition-colors mb-10 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          {/* Hero image */}
          {post.image_urls?.[0] && (
            <div className="w-full h-64 rounded-2xl overflow-hidden mb-8 bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image_urls[0]}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border border-[#E5E5E5] text-zinc-500 font-medium"
              >
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-black leading-snug mb-3">
            {post.title}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
            <Calendar size={12} />
            {formatDate(post.created_at)}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E5E5E5] mb-8" />

          {/* Body */}
          <p className="text-sm text-zinc-600 leading-relaxed">{post.description}</p>

          {/* Additional images */}
          {post.image_urls?.length > 1 && (
            <div className="mt-10 grid grid-cols-2 gap-4">
              {post.image_urls.slice(1).map((url, i) => (
                <div key={i} className="w-full h-48 rounded-xl overflow-hidden bg-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
