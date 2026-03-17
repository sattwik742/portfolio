"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Code2, Menu, X, Github } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Handle hiding navbar on scroll down, showing on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Close mobile menu if user scrolls down
    } else {
      setHidden(false);
    }
  });

  // Handle background blur/opacity on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Certificates", href: "#certificates" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" }, // Sufficiently hide the shadow too
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
    >
      <div
        className={`w-full max-w-6xl flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-full border ${
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-white/10 shadow-2xl"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <Code2 size={24} className="text-white transition-transform group-hover:rotate-12" />
          <span className="font-bold tracking-tighter text-xl text-white font-[family-name:var(--font-space-grotesk)]">
            SATTWIK
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors font-[family-name:var(--font-outfit)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sattwik742"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-bold bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 transition-all active:scale-95 font-[family-name:var(--font-outfit)]"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-1 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[-1] flex flex-col items-center justify-center gap-8 md:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold text-white hover:text-zinc-400 transition-colors font-[family-name:var(--font-outfit)]"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              href="https://github.com/sattwik742"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold"
            >
              <Github size={20} />
              GitHub
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}