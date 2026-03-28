"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github } from "lucide-react";
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

  // Background blur effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open (Crucial for Android/iOS)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

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
    <nav className="fixed top-0 inset-x-0 z-60 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`w-full max-w-6xl flex items-center justify-between px-5 py-3 transition-all duration-500 rounded-full border pointer-events-auto ${
          scrolled || isOpen 
            ? "bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl" 
            : "bg-transparent border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group text-white z-70">
          <span className="font-bold tracking-tighter text-xl font-space-grotesk">SATTWIK</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ name, href }) => (
            <Link 
              key={name} 
              href={href} 
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors font-outfit"
            >
              {name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 z-70">
          <GitHubButton className="hidden sm:flex px-5 py-2 text-sm" />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay with Snappy Physics & Swipe-to-Close */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ 
              type: "spring", 
              damping: 40,   // High damping for a "Heavy" feel
              stiffness: 400, // High stiffness for "Snappy" response
              mass: 1        
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.05} // High resistance for that native feel
            onDragEnd={(_, info) => {
              if (info.offset.y < -80 || info.velocity.y < -400) {
                setIsOpen(false);
              }
            }}
            className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[-1] flex flex-col items-center justify-center p-6 md:hidden pointer-events-auto touch-none"
          >
            {/* Visual Drag Handle for Android UI */}
            <div className="absolute top-20 w-16 h-1 bg-white/20 rounded-full opacity-50" />
            
            <div className="flex flex-col items-center gap-8 w-full">
              {NAV_LINKS.map(({ name, href }, i) => (
                <motion.div 
                  key={name} 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.04 + 0.1, ease: "easeOut" }}
                  className="w-full text-center"
                >
                  <Link 
                    href={href} 
                    onClick={() => setIsOpen(false)} 
                    /* Removed text-4xl/3xl for better Android scaling */
                    className="font-bold text-white active:scale-95 transition-transform font-outfit block py-2"
                  >
                    {name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-4"
              >
                <GitHubButton className="px-12 py-4 text-lg shadow-2xl shadow-white/5" />
              </motion.div>
            </div>

            <p className="absolute bottom-12 text-zinc-500 text-[9px] font-bold tracking-[0.4em] uppercase opacity-40">
              Swipe up to Dismiss
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}