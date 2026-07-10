import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiTerminal, HiX } from "react-icons/hi";
import { profile, skills, projects } from "../data/portfolioData";

type Line = { type: "in" | "out"; text: string };

const helpText = [
  "Available commands:",
  "  help       - show this list",
  "  about      - who is Methul?",
  "  projects   - list featured projects",
  "  skills     - list technical skills",
  "  contact    - get contact info",
  "  resume     - download / view resume",
  "  theme      - list available themes",
  "  clear      - clear the terminal",
];

export default function CommandTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "Welcome to Methul's portfolio terminal. Type 'help' to get started." },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`") {
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    let out: string[] = [];
    switch (c) {
      case "help":
        out = helpText;
        break;
      case "about":
        out = [`${profile.firstName} ${profile.lastName} — AI Engineer, Full Stack Developer & MLOps Learner.`, `Based in ${profile.location}.`];
        break;
      case "projects":
        out = projects.map((p) => `• ${p.title} — ${p.tagline}`);
        break;
      case "skills":
        out = [skills.map((s) => s.name).join(", ")];
        break;
      case "contact":
        out = [`Email: ${profile.email}`, `GitHub: ${profile.github}`, `LinkedIn: ${profile.linkedin}`];
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "resume":
        out = ["Opening resume in the Resume section..."];
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "theme":
        out = ["Available themes: dark, cyberpunk, midnight, red, purple. Use the theme switcher in the navbar."];
        break;
      case "clear":
        setLines([]);
        return;
      case "":
        return;
      case "sudo":
        out = ["Nice try. You already have full access to this portfolio 😄"];
        break;
      default:
        out = [`command not found: ${c}. Type 'help' for a list of commands.`];
    }
    setLines((prev) => [...prev, { type: "in", text: cmd }, ...out.map((t) => ({ type: "out" as const, text: t }))]);
  };

  return (
    <>
      <button
        data-cursor-hover
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full glass glow-border text-lg text-[var(--accent2)] shadow-lg"
        title="Open command terminal ( ` )"
      >
        <HiTerminal />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 left-4 z-50 w-[92vw] max-w-md rounded-2xl border border-emerald-500/30 bg-black/90 font-mono text-xs text-emerald-400 shadow-2xl sm:left-6"
          >
            <div className="flex items-center justify-between rounded-t-2xl border-b border-emerald-500/20 bg-black/60 px-4 py-2">
              <span className="flex items-center gap-2 text-emerald-300">
                <HiTerminal /> methul@portfolio: ~
              </span>
              <button onClick={() => setOpen(false)} className="text-emerald-300 hover:text-white">
                <HiX />
              </button>
            </div>
            <div className="h-64 overflow-y-auto px-4 py-3">
              {lines.map((l, i) => (
                <p key={i} className={l.type === "in" ? "text-fuchsia-400" : "whitespace-pre-wrap text-emerald-400"}>
                  {l.type === "in" ? `$ ${l.text}` : l.text}
                </p>
              ))}
              <div ref={bottomRef} />
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
              className="flex items-center gap-2 border-t border-emerald-500/20 px-4 py-3"
            >
              <span className="text-fuchsia-400">$</span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-emerald-300 outline-none placeholder:text-emerald-700"
                placeholder="type a command..."
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
