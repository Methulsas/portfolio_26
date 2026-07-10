import { motion } from "framer-motion";
import { HiOutlineDocumentText, HiArrowRight } from "react-icons/hi";
import { blogPosts } from "../data/portfolioData";
import { SectionHeading } from "./About";

export default function Blog() {
  return (
    <section id="blog" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Sharing the journey" title="Blog" />
      <p className="mx-auto mt-4 max-w-lg text-center text-sm text-[var(--text-muted)]">
        Articles coming soon as I document what I learn — a great way for recruiters to see how I think.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, idx) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            data-cursor-hover
            className="glass flex flex-col rounded-2xl p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-xl text-[var(--accent2)]">
              <HiOutlineDocumentText />
            </div>
            <h3 className="mt-4 text-base font-semibold text-[var(--text)]">{post.title}</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>{post.date}</span>
              <span className="flex items-center gap-1 text-[var(--accent2)]">
                Read <HiArrowRight />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
