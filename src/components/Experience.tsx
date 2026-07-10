import { motion } from "framer-motion";
import { experienceRoadmap } from "../data/portfolioData";
import { SectionHeading } from "./About";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading eyebrow="The journey" title="Experience Roadmap" />

      <div className="relative mt-20">
        <div className="absolute top-6 left-0 right-0 mx-4 h-1 rounded-full bg-white/10 sm:mx-8" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="absolute top-6 left-0 right-0 mx-4 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-[var(--accent3)] sm:mx-8"
        />

        <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {experienceRoadmap.map((stage, idx) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                data-cursor-hover
                className={`z-10 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                  idx === experienceRoadmap.length - 1
                    ? "bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white shadow-[0_0_20px_rgba(var(--glow),0.8)]"
                    : "glass text-[var(--text)]"
                }`}
              >
                {idx + 1}
              </motion.div>
              <p className="mt-3 text-xs font-semibold text-[var(--text)] sm:text-sm">{stage}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
