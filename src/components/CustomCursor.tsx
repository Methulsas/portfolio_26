import { useEffect, useRef, useState } from "react";

type Trail = { x: number; y: number; id: number };

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isTouch, setIsTouch] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsTouch(true);
      return;
    }
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      idRef.current += 1;
      if (idRef.current % 3 === 0) {
        setTrails((prev) => [...prev.slice(-10), { x: mx, y: my, id: idRef.current }]);
      }
    };

    const onDown = () => ringRef.current?.classList.add("scale-75", "bg-[var(--accent)]/30");
    const onUp = () => ringRef.current?.classList.remove("scale-75", "bg-[var(--accent)]/30");

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a,button,[data-cursor-hover]")) {
        ringRef.current?.classList.add("scale-150", "border-[var(--accent2)]");
      } else {
        ringRef.current?.classList.remove("scale-150", "border-[var(--accent2)]");
      }
    };

    let raf: number;
    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  useEffect(() => {
    if (trails.length === 0) return;
    const t = setTimeout(() => setTrails((prev) => prev.slice(1)), 350);
    return () => clearTimeout(t);
  }, [trails]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden sm:block">
      {trails.map((t, i) => (
        <div
          key={t.id}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent2)]"
          style={{ left: t.x, top: t.y, opacity: (i + 1) / trails.length * 0.5 }}
        />
      ))}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--accent2)] shadow-[0_0_10px_2px_rgba(var(--glow),0.9)]"
      />
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-[var(--accent)]/70 transition-[transform,background-color,border-color] duration-150 ease-out"
      />
    </div>
  );
}
