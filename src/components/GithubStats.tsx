import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { HiOutlineTerminal } from "react-icons/hi";
import { profile } from "../data/portfolioData";
import { SectionHeading } from "./About";

type GhData = {
  publicRepos: number;
  followers: number;
  stars: number;
  languages: string[];
  avatar: string;
  lastCommitRepo: string;
};

export default function GithubStats() {
  const [data, setData] = useState<GhData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${profile.githubUsername}`);
        const user = await userRes.json();
        const reposRes = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`
        );
        const repos = await reposRes.json();
        const repoList = Array.isArray(repos) ? repos : [];
        const stars = repoList.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
        const languages = Array.from(
          new Set(repoList.map((r: any) => r.language).filter(Boolean))
        ).slice(0, 6) as string[];

        setData({
          publicRepos: user.public_repos ?? 0,
          followers: user.followers ?? 0,
          stars,
          languages,
          avatar: user.avatar_url,
          lastCommitRepo: repoList[0]?.name ?? "—",
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    { label: "Public Repos", value: data?.publicRepos ?? "—" },
    { label: "Followers", value: data?.followers ?? "—" },
    { label: "Total Stars", value: data?.stars ?? "—" },
    { label: "Latest Repo", value: data?.lastCommitRepo ?? "—" },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <SectionHeading eyebrow="Live from GitHub" title="GitHub Activity" />
      <div className="mt-14 glass glow-border rounded-3xl p-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/5 p-3 text-3xl text-[var(--accent2)]">
              <FaGithub />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Auto-synced, no manual updates</p>
              <a
                href={profile.github}
                data-cursor-hover
                className="font-semibold text-[var(--text)] hover:text-[var(--accent2)]"
              >
                @{profile.githubUsername}
              </a>
            </div>
          </div>
          {loading && <span className="text-xs text-[var(--text-muted)]">Fetching live data…</span>}
          {error && <span className="text-xs text-red-400">Could not reach GitHub API — showing cached view.</span>}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[var(--card-border)] bg-white/5 p-5 text-center"
            >
              <p className="font-display text-2xl font-bold text-gradient">{s.value}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <HiOutlineTerminal /> Languages:
          </span>
          {(data?.languages ?? ["Python", "TypeScript", "JavaScript"]).map((l) => (
            <span key={l} className="rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs text-[var(--accent2)]">
              {l}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> Stars sync automatically</span>
          <span className="flex items-center gap-1"><FaCodeBranch className="text-emerald-400" /> Repos update live</span>
        </div>
      </div>
    </section>
  );
}
