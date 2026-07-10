import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiLocationMarker, HiPaperAirplane, HiCheckCircle } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { profile } from "../data/portfolioData";
import { SectionHeading } from "./About";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 2600);
  };

  const socials = [
    { icon: <HiMail />, label: profile.email, href: `mailto:${profile.email}` },
    { icon: <FaLinkedin />, label: "LinkedIn", href: profile.linkedin },
    { icon: <FaGithub />, label: "GitHub", href: profile.github },
    { icon: <FaInstagram />, label: "Instagram", href: profile.instagram },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading eyebrow="Let's build something" title="Contact Section" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass glow-border mt-14 grid grid-cols-1 gap-10 rounded-3xl p-8 sm:p-10 md:grid-cols-2"
      >
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)]">Get in touch</h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Have an idea, an opportunity, or just want to say hi? My inbox is always open.
          </p>

          <div className="mt-6 space-y-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-white/5 px-4 py-3 text-sm text-[var(--text)] transition-colors hover:border-[var(--accent)]/60 hover:bg-white/10"
              >
                <span className="text-lg text-[var(--accent2)]">{s.icon}</span>
                {s.label}
              </a>
            ))}
            <div className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-white/5 px-4 py-3 text-sm text-[var(--text)]">
              <span className="text-lg text-[var(--accent2)]">
                <HiLocationMarker />
              </span>
              {profile.location}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-xl border border-[var(--card-border)] bg-white/5 px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
          />
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your email"
            className="w-full rounded-xl border border-[var(--card-border)] bg-white/5 px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
          />
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your message"
            className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-white/5 px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            data-cursor-hover
            disabled={sent}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-80"
          >
            {sent ? (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <HiCheckCircle /> Message Sent!
              </motion.span>
            ) : (
              <>
                Send Message
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                  <HiPaperAirplane className="rotate-45" />
                </motion.span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
