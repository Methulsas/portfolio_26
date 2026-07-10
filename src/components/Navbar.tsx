import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + window.innerHeight * 0.3;
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(link.id);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2"
    >
      <div
        className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass shadow-lg shadow-black/20" : "border border-transparent bg-transparent"
        }`}
      >
        <button
          data-cursor-hover
          onClick={() => goTo("home")}
          className="font-display text-sm font-bold tracking-widest text-gradient sm:text-base"
        >
          MS.DEV
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              data-cursor-hover
              onClick={() => goTo(l.id)}
              className={`relative rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors xl:text-sm ${
                active === l.id ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-[var(--accent)]/20"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>
          <button
            data-cursor-hover
            className="rounded-full p-2 text-[var(--text)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className={`rounded-xl px-4 py-2.5 text-left text-sm ${
                active === l.id ? "bg-[var(--accent)]/20 text-[var(--text)]" : "text-[var(--text-muted)]"
              }`}
            >
              {l.label}
            </button>
          ))}
          <div className="px-2 pt-2">
            <ThemeSwitcher />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
