import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX, HiBadgeCheck } from "react-icons/hi";
import { certificates } from "../data/portfolioData";
import { SectionHeading } from "./About";

export default function Certificates() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="certificates" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Proof of learning" title="Certificates" />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -8, rotate: -1 }}
            data-cursor-hover
            onClick={() => setOpen(idx)}
            className="glass group cursor-pointer rounded-2xl p-6 transition-shadow hover:glow-border"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white"
              style={{ background: cert.color }}
            >
              <HiBadgeCheck />
            </div>
            <h3 className="mt-4 text-base font-semibold text-[var(--text)]">{cert.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{cert.issuer}</p>
            <p className="mt-3 text-xs text-[var(--accent2)]">{cert.year}</p>
            <p className="mt-4 text-xs text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
              Click to view certificate →
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-lg rounded-3xl p-8 text-center"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-[var(--text)]"
              >
                <HiX />
              </button>
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-4xl text-white"
                style={{ background: certificates[open].color }}
              >
                <HiBadgeCheck />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[var(--text)]">
                {certificates[open].title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Issued by {certificates[open].issuer} · {certificates[open].year}
              </p>
              <div className="mt-6 rounded-xl border border-dashed border-[var(--card-border)] p-8 text-xs text-[var(--text-muted)]">
                Certificate preview placeholder — swap this with the real certificate image or PDF.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
