"use client";

import React from "react";
import { FlipWords } from "../ui/flip-words";
import { Button } from "../ui/moving-border";
import { motion, Variants } from "framer-motion";
// Removed the unused 'Sparkles' import
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
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 font-outfit">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f620,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl font-[(--font-space-grotesk)]">
            {/* Fixed Tailwind typo: bg-linear-to-b -> bg-gradient-to-b */}
            Hi, I&apos;m <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text text-transparent">Sattwik</span> <br />
            <span className="text-zinc-200">I build </span>
            <FlipWords words={words} className="text-blue-500" /> Websites <br />
          </h1>

          <p className="mx-auto mt-6 mb-12 max-w-xl text-base leading-relaxed text-zinc-400 md:text-xl">
            Aspiring Frontend Developer and current MCA student with a strong foundation in modern web technologies. I am seeking an entry-level role to apply my skills in React.js, Tailwind CSS, and JavaScript to real-world projects. As a motivated beginner, I am dedicated to continuous technical growth and contributing to innovative, user-focused web solutions.
          </p>

          {/* Action Hub */}
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {/* Fixed HTML Nesting: Used 'as="a"' on the Button to avoid wrapping a <button> in an <a> tag */}
            <Button
              as="a"
              href="https://drive.google.com/file/d/1UzQrVGlFyhOCtw6ZWJBFTf2PXG_XA_QS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              duration={3500}
              className="flex items-center gap-2 border-white/10 bg-white/5 font-semibold text-white backdrop-blur-2xl hover:bg-white/10"
            >
              <motion.span variants={iconVariants} animate="bounce">
                <Download size={18} />
              </motion.span>
              Resume.pdf
            </Button>

            <motion.a
              href="#contact"
              whileHover="hover"
              className="group flex items-center gap-2 text-sm font-bold tracking-widest text-zinc-400 uppercase transition-colors hover:text-white"
            >
              Start a Conversation
              <motion.span variants={iconVariants}>
                <Send size={16} className="-rotate-12 group-hover:text-blue-400" />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 flex flex-col items-center gap-3 text-zinc-600"
      >
        {/* Fixed Tailwind typo: bg-linear-to-b -> bg-gradient-to-b */}
        <div className="h-12 w-px bg-gradient-to-b from-blue-500/50 to-transparent" />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}