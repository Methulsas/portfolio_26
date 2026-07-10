import { motion } from "framer-motion";
import { HiDownload, HiEye } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { profile, liveStats } from "../data/portfolioData";
import { SectionHeading } from "./About";
import StatCounter from "./StatCounter";

export default function Resume() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Let's talk business" title="Resume" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass glow-border mt-14 rounded-3xl p-10 text-center"
      >
        <p className="mx-auto max-w-xl text-sm text-[var(--text-muted)] sm:text-base">
          Want the full story on paper? Grab my CV or view it right here in the browser.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={profile.resumeUrl}
            download
            data-cursor-hover
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[rgba(var(--glow),0.4)] transition-transform hover:scale-105"
          >
            <HiDownload size={18} /> Download CV
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-8 py-3.5 text-sm font-bold text-[var(--text)] transition-colors hover:bg-white/5"
          >
            <HiEye size={18} /> View Resume
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-8 py-3.5 text-sm font-bold text-[#0A66C2] transition-colors hover:bg-white/5"
          >
            <FaLinkedin size={18} /> LinkedIn
          </a>
        </div>
      </motion.div>

      <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {liveStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <p className="font-display text-3xl font-black text-gradient">
              <StatCounter value={s.value} />
              {s.suffix}
            </p>
            <p className="mt-2 text-xs tracking-wide text-[var(--text-muted)] uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
