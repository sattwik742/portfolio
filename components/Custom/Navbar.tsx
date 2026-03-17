"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Code2, Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Blog", href: "/Blog" }
];

const GITHUB_URL = "https://github.com/sattwik742";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const GitHubButton = ({ className = "" }) => (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 bg-white text-black rounded-full font-bold transition-all active:scale-95 hover:bg-zinc-200 ${className}`}
    >
      <Github size={18} /> <span>GitHub</span>
    </a>
  );

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`w-full max-w-6xl flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-full border pointer-events-auto ${
          scrolled ? "bg-black/60 backdrop-blur-2xl border-white/10 shadow-2xl" : "bg-transparent border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group text-white">
          <Code2 size={24} className="transition-transform group-hover:rotate-12" />
          <span className="font-bold tracking-tighter text-xl font-[family-name:var(--font-space-grotesk)]">SATTWIK</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {NAV_LINKS.map(({ name, href }) => (
            <Link key={name} href={href} className="px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors font-[family-name:var(--font-outfit)]">
              {name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <GitHubButton className="hidden sm:flex px-5 py-2 text-sm" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[-1] flex flex-col items-center justify-center gap-8 md:hidden pointer-events-auto"
          >
            {NAV_LINKS.map(({ name, href }, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={href} onClick={() => setIsOpen(false)} className="text-4xl font-bold text-white hover:text-zinc-400 transition-colors font-[family-name:var(--font-outfit)]">
                  {name}
                </Link>
              </motion.div>
            ))}
            <GitHubButton className="mt-4 px-8 py-3 text-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}