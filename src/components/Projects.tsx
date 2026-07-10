import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiExternalLink, HiX } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { projects, type Project } from "../data/portfolioData";
import { SectionHeading } from "./About";

const tabs = ["Overview", "Tech Stack", "Features", "Screenshots", "Architecture", "Challenges", "Lessons Learned"] as const;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
      >
        <div className="relative h-52 w-full" style={{ background: project.cover }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-black/20 to-transparent" />
          <button
            onClick={onClose}
            data-cursor-hover
            className="absolute top-4 right-4 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
          >
            <HiX size={20} />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">{project.title}</h3>
            <p className="mt-1 text-sm text-white/80">{project.tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 px-6 pt-5">
          <a
            href={project.liveUrl}
            data-cursor-hover
            className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-semibold text-white hover:scale-105 transition-transform"
          >
            <HiExternalLink /> Live Demo
          </a>
          <a
            href={project.githubUrl}
            data-cursor-hover
            className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-5 py-2 text-xs font-semibold text-[var(--text)] hover:bg-white/5"
          >
            <FaGithub /> GitHub
          </a>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto border-b border-white/10 px-6 pb-2 text-xs">
          {tabs.map((t) => (
            <button
              key={t}
              data-cursor-hover
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full px-3 py-1.5 font-medium transition-colors ${
                tab === t ? "bg-[var(--accent)]/20 text-[var(--accent2)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="min-h-[180px] p-6 text-sm leading-relaxed text-[var(--text-muted)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "Overview" && <p>{project.tagline} This is a full case study covering the tech stack, features, architecture and lessons learned while building it — just like a Netflix detail page for code.</p>}
              {tab === "Tech Stack" && (
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span key={t} className="rounded-full border border-[var(--card-border)] bg-white/5 px-3 py-1 text-xs text-[var(--text)]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {tab === "Features" && (
                <ul className="list-inside list-disc space-y-2">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
              {tab === "Screenshots" && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.screenshots.map((s, i) => (
                    <div key={i} className="h-28 rounded-xl" style={{ background: s }} />
                  ))}
                </div>
              )}
              {tab === "Architecture" && <p>{project.architecture}</p>}
              {tab === "Challenges" && <p>{project.challenges}</p>}
              {tab === "Lessons Learned" && <p>{project.lessons}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Selected work" title="Featured Projects" />
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            data-cursor-hover
            onClick={() => setActive(p)}
            className="group cursor-pointer overflow-hidden rounded-2xl glass"
          >
            <div className="relative h-44 w-full overflow-hidden" style={{ background: p.cover }}>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-5 py-2 text-xs font-bold text-black">View Case Study</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[var(--text)]">{p.title}</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-[var(--text-muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
