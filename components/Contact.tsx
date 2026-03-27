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
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/steveaustinrynjah",
    href: "https://github.com/steveaustinrynjah",
    description: "Open source & personal projects",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "linkedin.com/in/steveaustinrynjah",
    href: "https://linkedin.com/in/steveaustinrynjah",
    description: "Professional network",
  },
];

export default function Contact() {
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
            Get in Touch
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Contact
          </h1>
          <p className="text-sm text-zinc-500 mt-2 max-w-sm leading-relaxed">
            Open to new opportunities, collaborations, and interesting
            conversations.
          </p>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-2 px-4 py-3 border border-[#E5E5E5] bg-zinc-50 mb-6 w-fit"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full" />
          <span className="text-xs text-zinc-600 font-medium">
            Available for freelance &amp; full-time
          </span>
        </motion.div>

        {/* Links */}
        <div className="divide-y divide-[#E5E5E5] border border-[#E5E5E5]">
          {links.map(({ icon: Icon, label, value, href, description }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
              className="group flex items-center justify-between px-5 py-5 bg-white hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center shrink-0">
                  <Icon
                    size={16}
                    className="text-zinc-400 group-hover:text-black transition-colors"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{label}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors hidden md:block">
                  {value}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-zinc-200 group-hover:text-black transition-colors"
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Outro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-xs text-zinc-300 mt-8 text-center"
        >
          Usually responds within 24 hours
        </motion.p>
      </div>
    </div>
  );
}
