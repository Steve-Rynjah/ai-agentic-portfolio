"use client";

import { motion } from "framer-motion";
import { Mail, GitBranch, ExternalLink, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "steveaustinrynjah@gmail.com",
    href: "mailto:steveaustinrynjah@gmail.com",
    description: "Best for project inquiries",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#6366F1",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/steveaustinrynjah",
    href: "https://github.com/steveaustinrynjah",
    description: "Open source & personal projects",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "#10B981",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "linkedin.com/in/steveaustinrynjah",
    href: "https://linkedin.com/in/steveaustinrynjah",
    description: "Professional network",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    color: "#3B82F6",
  },
];

export default function Contact() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-8 pb-36 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <p className="text-[11px] text-zinc-400 tracking-widest uppercase mb-2">
            Get in Touch
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black">Contact</h1>
          <p className="text-sm text-zinc-500 mt-2 max-w-sm leading-relaxed">
            Open to new opportunities, collaborations, and interesting conversations.
          </p>
        </motion.div>

        {/* Availability badge — glass pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full w-fit mb-8"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.88)",
            boxShadow:
              "0 4px 16px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
          <span className="text-xs text-zinc-600 font-semibold">
            Available for freelance &amp; full-time
          </span>
        </motion.div>

        {/* Contact cards */}
        <div className="space-y-4">
          {links.map(({ icon: Icon, label, value, href, description, gradient, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.09 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.70)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.88)",
                boxShadow:
                  "0 6px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)",
              }}
            >
              {/* Icon with gradient background */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: gradient }}
              >
                <Icon size={18} className="text-white" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-black">{label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
                <p
                  className="text-xs mt-1 font-medium truncate hidden md:block transition-opacity"
                  style={{ color, opacity: 0.8 }}
                >
                  {value}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ background: color + "18" }}
              >
                <ArrowUpRight size={15} style={{ color }} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-xs text-zinc-300 mt-10 text-center"
        >
          Usually responds within 24 hours
        </motion.p>
      </div>
    </div>
  );
}
