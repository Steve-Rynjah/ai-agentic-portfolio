"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

interface Props {
  onChatModeChange?: (isChatMode: boolean) => void;
}

export default function AskSteve({ onChatModeChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isChatMode = messages.length > 0;

  // Notify parent when chat mode changes
  useEffect(() => {
    onChatModeChange?.(isChatMode);
  }, [isChatMode, onChatModeChange]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "No response received." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setMessages([]);
  }

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {!isChatMode ? (
          /* ─── HERO STATE ─── */
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-36"
          >
            {/* Logo icon */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08 }}
              className="mb-5"
            >
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto shadow-lg">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="text-base text-zinc-500 mb-1.5"
            >
              Hey, I&apos;m Steve Austin 👋
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.16 }}
              className="text-5xl md:text-[64px] font-black text-black tracking-tight leading-none mb-10"
            >
              Full-Stack Engineer
            </motion.h1>

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 20 }}
              className="mb-10"
            >
              <div className="w-36 h-36 rounded-full overflow-hidden bg-gradient-to-br from-zinc-100 via-zinc-50 to-white shadow-xl border border-zinc-100 flex items-center justify-center">
                <span
                  className="text-[80px] leading-none select-none"
                  style={{ marginTop: 8 }}
                >
                  🧑🏻‍💻
                </span>
              </div>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.26 }}
              className="w-full max-w-[520px]"
            >
              <div
                className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-white"
                style={{
                  border: "1.5px solid #E5E5E5",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-zinc-400 text-black"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  style={{ background: "#3B82F6" }}
                >
                  <ArrowRight size={16} className="text-white" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ─── CHAT STATE ─── */
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Compact header */}
            <div
              className="px-5 py-3.5 flex items-center gap-3 shrink-0"
              style={{ borderBottom: "1px solid #F0F0F0" }}
            >
              <button
                onClick={handleBack}
                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-black transition-colors rounded-full hover:bg-zinc-50"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center text-xl shadow-sm border border-zinc-100 shrink-0">
                🧑🏻‍💻
              </div>
              <div>
                <p className="text-sm font-semibold text-black leading-tight">Steve Austin</p>
                <p className="text-[11px] text-zinc-400 leading-tight flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                  AI Assistant · Online
                </p>
              </div>
            </div>

            {/* Messages — scrollable, no extra bottom padding needed */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "user" ? (
                      <div
                        className="max-w-[72%] px-4 py-2.5 text-sm text-white leading-relaxed rounded-2xl rounded-br-sm"
                        style={{ background: "#18181B" }}
                      >
                        {msg.content}
                      </div>
                    ) : (
                      <div className="max-w-[85%] flex gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center text-base shrink-0 mt-0.5 border border-zinc-100">
                          🧑🏻‍💻
                        </div>
                        <div
                          className="px-4 py-2.5 text-sm text-black leading-relaxed rounded-2xl rounded-bl-sm"
                          style={{ background: "#F5F5F5" }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center text-base shrink-0 border border-zinc-100">
                      🧑🏻‍💻
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl rounded-bl-sm"
                      style={{ background: "#F5F5F5" }}
                    >
                      <div className="flex gap-1 items-center h-4">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "#D4D4D4" }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Chat input — in flow at bottom (no tabs to clear) */}
            <div
              className="shrink-0 px-5 py-3"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderTop: "1px solid #F0F0F0",
              }}
            >
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white max-w-2xl mx-auto"
                style={{
                  border: "1.5px solid #E5E5E5",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm outline-none bg-transparent placeholder:text-zinc-400 text-black"
                  autoFocus
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  whileTap={{ scale: 0.93 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  style={{ background: "#3B82F6" }}
                >
                  <ArrowRight size={15} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
