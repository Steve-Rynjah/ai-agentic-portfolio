"use client";

import { motion } from "framer-motion";
import { Mail, GitBranch, ExternalLink, ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";

const GLOW_COLORS: [string, string, string][] = [
  ['#f472b6', '#818cf8', '#06b6d4'],
  ['#34d399', '#06b6d4', '#818cf8'],
  ['#818cf8', '#f472b6', '#34d399'],
];

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
          <p className="text-sm text-zinc-400 mt-2 max-w-sm leading-relaxed">
            Open to new opportunities, collaborations, and interesting conversations.
          </p>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full w-fit mb-8 border border-[#E5E5E5] bg-white"
        >
          <span className="w-2 h-2 rounded-full bg-black" />
          <span className="text-xs text-black font-semibold">
            Available for freelance &amp; full-time
          </span>
        </motion.div>

        {/* Contact cards */}
        <div className="space-y-4">
          {links.map(({ icon: Icon, label, value, href, description }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.09 }}
            >
              <BorderGlow
                borderRadius={16}
                backgroundColor="#FFFFFF"
                glowColor="270 80 65"
                glowIntensity={1.4}
                colors={GLOW_COLORS[i]}
                fillOpacity={0.35}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-black">
                    <Icon size={18} className="text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black">{label}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
                    <p className="text-xs mt-1 font-medium text-zinc-400 truncate hidden md:block">
                      {value}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black">
                    <ArrowUpRight size={15} className="text-white" />
                  </div>
                </a>
              </BorderGlow>
            </motion.div>
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
