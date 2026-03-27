"use client";

import { FlipWords } from "../ui/flip-words";
import { Button } from "../ui/moving-border";
import { motion, Variants } from "framer-motion";
import { Download, Send, ChevronDown } from "lucide-react";

export default function Hero() {
  const words = ["Modern", "Scalable", "Dynamic", "Seamless"];

  const iconVariants: Variants = {
    bounce: {
      y: [0, -4, 0],
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
    },
    hover: {
      x: 5,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4 font-outfit">

      {/* Cinematic Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Ultra-Slow Fluid Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] h-150 w-150 rounded-full bg-white/2 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[10%] -right-[5%] h-175 w-175 rounded-full bg-white/3 blur-[140px]"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl font-space-grotesk">
            Hi, I&apos;m <span className="text-zinc-400">Sattwik</span> <br />
            <span className="text-zinc-600">I build </span>
            <FlipWords words={words} duration={2000} className="text-white" /> Websites
          </h1>
          <p className="mx-auto mt-4 mb-10 max-w-md text-xs leading-relaxed text-zinc-500 md:text-sm md:leading-loose opacity-80">
            Aspiring Frontend Developer and current MCA student with a strong foundation in modern web technologies.
            I am seeking an entry-level role to apply my skills in React.js, Tailwind CSS, and JavaScript to real-world projects.
            As a motivated beginner, I am dedicated to continuous technical growth and contributing to innovative, user-focused web solutions.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <Button
              as="a"
              href="https://drive.google.com/file/d/1kDrWqC-eNdShjnUbIRNJi5uD8D2WWtPa/view?usp=sharing"
              duration={3000}
              className="flex items-center gap-2 border-white/10 bg-white text-black font-bold hover:bg-zinc-200 transition-all px-8 text-sm"
            >
              <motion.span variants={iconVariants} animate="bounce">
                <Download size={16} />
              </motion.span>
              Resume.pdf
            </Button>

            <motion.a
              href="#contact"
              whileHover="hover"
              className="group flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase transition-colors hover:text-white"
            >
              Start a Conversation
              <motion.span variants={iconVariants}>
                <Send size={12} className="group-hover:text-white" />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}