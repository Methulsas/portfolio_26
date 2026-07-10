import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const lines = [
  "Initializing Portfolio...",
  "Loading AI Models...",
  "Connecting GitHub...",
  "Compiling skills.json...",
  "Booting neural interface...",
  "Ready.",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setVisibleLines((prev) => [...prev, lines[i - 1]]);
      setProgress(Math.min(100, Math.round((i / lines.length) * 100)));
      if (i >= lines.length) {
        clearInterval(interval);
        setTimeout(() => setHide(true), 500);
        setTimeout(onDone, 1100);
      }
    }, 420);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="w-[90%] max-w-lg font-mono text-sm text-emerald-400 sm:text-base">
            <div className="mb-4 flex items-center gap-2 text-xs text-emerald-500/70">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2">methul@portfolio: ~</span>
            </div>
            <div className="min-h-[180px] space-y-2">
              {visibleLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-fuchsia-400">$</span> {line}
                  {idx === visibleLines.length - 1 && <span className="animate-blink">▌</span>}
                </motion.p>
              ))}
            </div>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-emerald-950">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 text-right text-xs text-emerald-500/70">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
