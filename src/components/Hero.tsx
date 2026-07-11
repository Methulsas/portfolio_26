import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/portfolioData";
import { HiArrowDown } from "react-icons/hi";

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -120]);
  const imgY = useTransform(scrollY, [0, 800], [0, 90]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* 3D gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="animate-gradient absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />
        <motion.div
          className="animate-gradient absolute top-40 -right-32 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent2), transparent 70%)" }}
        />
        <motion.div
          className="animate-gradient absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent3), transparent 70%)" }}
        />
        {/* small glowing dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: "var(--accent2)",
              boxShadow: "0 0 8px 2px rgba(var(--glow),0.8)",
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-5">
        <motion.div style={{ y, opacity }} className="md:col-span-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-3 inline-block rounded-full border border-[var(--card-border)] bg-white/5 px-4 py-1 text-xs tracking-widest text-[var(--text-muted)]"
          >
            WELCOME TO MY PORTFOLIO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="font-display text-5xl leading-[1.05] font-black tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="block text-gradient">{profile.firstName}</span>
            <span className="block text-[var(--text)]">{profile.lastName}</span>
          </motion.h1>

          <div className="mt-6 h-8 font-mono text-lg text-[var(--accent2)] sm:text-xl">
            <motion.span key={roleIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              &gt; {profile.roles[roleIdx]}
            </motion.span>
            <span className="animate-blink">_</span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-lg text-sm leading-relaxed text-[var(--text-muted)] sm:text-base"
          >
            I design and build intelligent software — from full-stack web apps to
            production-ready ML pipelines. Currently sharpening my MLOps skills to bridge
            the gap between models and real users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              data-cursor-hover
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative overflow-hidden rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(var(--glow),0.4)] transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore <HiArrowDown className="transition-transform group-hover:translate-y-1" />
              </span>
            </button>
            <button
              data-cursor-hover
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border border-[var(--card-border)] px-8 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:bg-white/5"
            >
              Say Hi
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mx-auto md:col-span-2"
        >
          <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96">
            <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-[var(--accent)]/40" />
            <div
              className="absolute inset-6 rounded-full opacity-70 blur-2xl"
              style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
            />
            <img
              src="images/1780196431012_1_-removebg-preview.png"
              alt="Methul Sasrutha"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_40px_rgba(var(--glow),0.5)]"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-muted)]"
      >
        <HiArrowDown size={22} />
      </motion.div>
    </section>
  );
}
