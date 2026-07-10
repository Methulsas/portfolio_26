export default function Footer() {
  const stars = Array.from({ length: 50 });
  return (
    <footer className="relative overflow-hidden border-t border-white/5 py-10 text-center">
      <div className="pointer-events-none absolute inset-0">
        {stars.map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 px-6">
        <p className="font-display text-sm text-[var(--text-muted)]">
          Designed &amp; Developed by{" "}
          <span className="text-gradient font-bold">Methul Sasrutha</span>
        </p>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          © 2026 · Built with React, Tailwind CSS &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
