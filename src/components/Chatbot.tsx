import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiSparkles, HiX, HiPaperAirplane } from "react-icons/hi";
import { chatbotKnowledge, profile } from "../data/portfolioData";

type Msg = { from: "bot" | "user"; text: string };

const suggestions = [
  "Tell me about Methul.",
  "What projects has he built?",
  "What skills does he have?",
  "Download his CV.",
];

function getAnswer(question: string): string {
  const q = question.toLowerCase();
  for (const entry of chatbotKnowledge) {
    if (entry.keywords.some((k) => q.includes(k))) return entry.answer;
  }
  return `I'm not totally sure about that yet, but you can explore the portfolio sections or reach ${profile.firstName} directly at ${profile.email}!`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm Methul's AI assistant 🤖 Ask me anything about his work." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const answer = getAnswer(text);
      setMessages((m) => [...m, { from: "bot", text: answer }]);
      setTyping(false);
      if (text.toLowerCase().includes("cv") || text.toLowerCase().includes("resume")) {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 700 + Math.random() * 500);
  };

  return (
    <div className="fixed right-5 bottom-5 z-40 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="glass glow-border mb-4 flex h-[28rem] w-[88vw] max-w-sm flex-col overflow-hidden rounded-3xl"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[var(--accent)]/30 to-[var(--accent2)]/20 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                <HiSparkles className="text-[var(--accent2)]" /> Ask Methul AI
              </div>
              <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                <HiX />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed sm:text-sm ${
                    m.from === "bot"
                      ? "bg-white/8 text-[var(--text)]"
                      : "ml-auto bg-[var(--accent)]/80 text-white"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {typing && (
                <div className="flex w-fit items-center gap-1 rounded-2xl bg-white/8 px-3.5 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--accent2)]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  data-cursor-hover
                  onClick={() => send(s)}
                  className="rounded-full border border-[var(--card-border)] px-2.5 py-1 text-[10px] text-[var(--text-muted)] hover:bg-white/5"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-full bg-white/5 px-4 py-2 text-xs text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] sm:text-sm"
              />
              <button
                type="submit"
                data-cursor-hover
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-white"
              >
                <HiPaperAirplane className="rotate-45" size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        data-cursor-hover
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-[rgba(var(--glow),0.5)]"
      >
        <HiSparkles size={18} />
        <span className="hidden sm:inline">Ask Methul AI</span>
      </motion.button>
    </div>
  );
}
