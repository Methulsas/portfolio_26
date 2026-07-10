import { motion } from "framer-motion";
import { skills, techStack } from "../data/portfolioData";
import { SectionHeading } from "./About";
import {
  SiPython,
  SiDjango,
  SiReact,
  SiDocker,
  SiGit,
  SiLinux,
  SiTensorflow,
  SiPostgresql,
  SiKubernetes,
  SiPytorch,
  SiGithub,
  SiFastapi,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

const iconMap: Record<string, React.ReactNode> = {
  Python: <SiPython />,
  Django: <SiDjango />,
  React: <SiReact />,
  Docker: <SiDocker />,
  Git: <SiGit />,
  Linux: <SiLinux />,
  TensorFlow: <SiTensorflow />,
  PostgreSQL: <SiPostgresql />,
  AWS: <FaAws />,
  Kubernetes: <SiKubernetes />,
  PyTorch: <SiPytorch />,
  GitHub: <SiGithub />,
  FastAPI: <SiFastapi />,
  "VS Code": <VscVscode />,
};

function ProgressRing({ level }: { level: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;
  return (
    <svg width="90" height="90" className="-rotate-90">
      <circle cx="45" cy="45" r={radius} strokeWidth="6" fill="none" className="stroke-white/10" />
      <motion.circle
        cx="45"
        cy="45"
        r={radius}
        strokeWidth="6"
        fill="none"
        stroke="url(#ringGradient)"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent2)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="What I work with" title="Skills" />

      <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.06 }}
            whileHover={{ rotate: [-1, 1.5], scale: 1.05 }}
            data-cursor-hover
            className="glass group relative flex flex-col items-center rounded-2xl p-5 text-center transition-shadow hover:glow-border"
          >
            <div className="relative flex h-[90px] w-[90px] items-center justify-center">
              <ProgressRing level={skill.level} />
              <span className="absolute text-2xl text-[var(--accent2)] transition-transform duration-300 group-hover:scale-125">
                {iconMap[skill.name]}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-[var(--text)]">{skill.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{skill.level}%</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <SectionHeading eyebrow="Building intelligent systems" title="AI Tech Stack" />
      </div>
      <div className="mt-12 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-9">
        {techStack.map((name, idx) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -6 }}
            data-cursor-hover
            className="glass flex flex-col items-center gap-2 rounded-2xl p-4 transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(var(--glow),0.5)]"
          >
            <span className="text-3xl text-[var(--accent2)] drop-shadow-[0_0_10px_rgba(var(--glow),0.8)]">
              {iconMap[name]}
            </span>
            <span className="text-[11px] font-medium text-[var(--text-muted)]">{name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
