import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiTerminal } from "react-icons/hi";

const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

export default function EasterEggs() {
  const [helloVisible, setHelloVisible] = useState(false);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    let typedBuffer = "";
    let konamiProgress = 0;

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping = ["INPUT", "TEXTAREA"].includes(target.tagName);

      // konami code tracking (works everywhere)
      if (e.key === konamiSequence[konamiProgress]) {
        konamiProgress += 1;
        if (konamiProgress === konamiSequence.length) {
          setDevMode((v) => !v);
          konamiProgress = 0;
        }
      } else {
        konamiProgress = e.key === konamiSequence[0] ? 1 : 0;
      }

      if (isTyping) return;
      if (e.key.length === 1) {
        typedBuffer = (typedBuffer + e.key).slice(-10).toLowerCase();
        if (typedBuffer.includes("hello")) {
          setHelloVisible(true);
          typedBuffer = "";
          setTimeout(() => setHelloVisible(false), 5000);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {helloVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[95] w-[92vw] max-w-md rounded-2xl border border-emerald-500/40 bg-black/95 p-4 font-mono text-xs text-emerald-400 shadow-2xl"
          >
            <p className="flex items-center gap-2 text-emerald-300">
              <HiTerminal /> secret_terminal.sh
            </p>
            <p className="mt-2">$ hello</p>
            <p className="mt-1 text-fuchsia-400">Welcome Recruiter :) Thanks for exploring — Methul is excited to work with you.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {devMode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none fixed inset-0 z-[93] bg-[repeating-linear-gradient(0deg,rgba(0,255,150,0.05)_0px,rgba(0,255,150,0.05)_1px,transparent_1px,transparent_3px)] mix-blend-screen"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 z-[96] -translate-x-1/2 rounded-full border border-emerald-400/50 bg-black/80 px-5 py-2 font-mono text-xs text-emerald-300 shadow-lg"
            >
              🕹️ Developer Mode Activated — Konami code accepted!
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
