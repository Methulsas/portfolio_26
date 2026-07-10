import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiMusicNote } from "react-icons/hi";

// Generates a small ambient lofi-style pad using the Web Audio API so the
// "play music" experience works without shipping an external audio file.
export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const intervalRef = useRef<number | null>(null);

  const stop = () => {
    nodesRef.current.forEach(({ osc, gain }) => {
      gain.gain.setTargetAtTime(0, ctxRef.current!.currentTime, 0.2);
      osc.stop(ctxRef.current!.currentTime + 0.5);
    });
    nodesRef.current = [];
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setPlaying(false);
  };

  const play = () => {
    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;
    const chords = [220, 261.6, 329.6, 392];

    chords.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq / 2;
      gain.gain.value = 0;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      gain.gain.setTargetAtTime(0.02 + i * 0.005, ctx.currentTime, 1.2);
      nodesRef.current.push({ osc, gain });
    });

    // gentle vinyl-crackle-ish pulse using filtered noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.02;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.015;
    noise.connect(noiseGain).connect(ctx.destination);
    noise.start();
    nodesRef.current.push({ osc: noise as unknown as OscillatorNode, gain: noiseGain });

    setPlaying(true);
  };

  const toggle = () => {
    if (playing) stop();
    else play();
  };

  return (
    <button
      data-cursor-hover
      onClick={toggle}
      className="fixed top-24 right-5 z-40 flex items-center gap-2 rounded-full glass glow-border px-4 py-2.5 text-xs font-semibold text-[var(--text)] shadow-lg sm:right-6"
      title="Toggle ambient lofi music"
    >
      <motion.span
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 3, ease: "linear" }}
        className="text-[var(--accent2)]"
      >
        <HiMusicNote />
      </motion.span>
      {playing ? "Playing Lofi ♪" : "Play Lofi"}
    </button>
  );
}
