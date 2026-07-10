import { motion } from "framer-motion";
import { timeline } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Get to know me" title="About Me" />

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] via-[var(--accent2)] to-transparent sm:block" />

        {timeline.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className={`relative mb-10 flex flex-col sm:flex-row sm:items-center ${
              idx % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >
            <div className="absolute left-1/2 top-6 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[var(--accent2)] shadow-[0_0_12px_4px_rgba(var(--glow),0.6)] sm:block" />
            <div
              className={`glass glow-border w-full rounded-2xl p-6 sm:w-[46%] ${
                idx % 2 === 0 ? "" : ""
              }`}
              data-cursor-hover
            >
              <span className="font-display text-2xl font-bold text-gradient">{item.year}</span>
              <h3 className="mt-1 text-lg font-semibold text-[var(--text)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[var(--accent2)] uppercase">{eyebrow}</p>
      <h2 className="font-display text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" />
    </motion.div>
  );
}
