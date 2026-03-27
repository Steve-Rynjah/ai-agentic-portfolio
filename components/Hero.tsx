"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-14">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm text-zinc-400 tracking-widest uppercase mb-6">
            Full-Stack Engineer
          </p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black leading-none mb-8">
            Steve
            <br />
            <span className="text-zinc-300">Austin.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-500 leading-relaxed mb-12">
            I build scalable, production-ready web systems. Specializing in{" "}
            <span className="text-black font-medium">Next.js</span>,{" "}
            <span className="text-black font-medium">TypeScript</span>, and{" "}
            <span className="text-black font-medium">AI integrations</span>.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors"
            >
              View Work
            </a>
            <a
              href="#ask"
              className="px-6 py-3 border border-[#E5E5E5] text-sm font-medium rounded-full hover:border-black transition-colors"
            >
              Ask Steve AI
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-24 grid grid-cols-3 gap-8 border-t border-[#E5E5E5] pt-8"
        >
          {[
            { label: "Years Experience", value: "4+" },
            { label: "Projects Shipped", value: "20+" },
            { label: "Open Source Contributions", value: "12" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-zinc-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
