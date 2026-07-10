import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { themes, useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        data-cursor-hover
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-[var(--card-border)] bg-white/5 px-3 py-1.5 text-xs text-[var(--text)]"
      >
        <HiOutlineColorSwatch />
        <span className="hidden md:inline">Theme</span>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: themes.find((t) => t.id === theme)?.swatch }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="glass absolute right-0 mt-2 w-44 rounded-xl p-2"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                data-cursor-hover
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                  theme === t.id ? "bg-white/10 text-[var(--text)]" : "text-[var(--text-muted)] hover:bg-white/5"
                }`}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t.swatch }} />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
