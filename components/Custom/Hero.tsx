"use client";

import React from "react";
import { FlipWords } from "../ui/flip-words";
import { Button } from "../ui/moving-border";
import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";

export default function Hero() {
  const words = ["Modern", "Scalable", "Dynamic"];

  // Animation variants for the icons
  const iconVariants = {
    initial: { y: 0, x: 0 },
    bounce: { 
      y: [0, -4, 0], 
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" } 
    },
    slide: { 
      x: [0, 5, 0], 
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" } 
    }
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4">
      {/* Background Gradients & Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
            Hi, I&apos;m <span className="text-blue-500">Sattwik</span> <br />
            I build{" "}
            <FlipWords words={words} className="text-blue-500" /> <br />
            Websites
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-4 mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
            Aspiring Frontend Developer and current MCA student with a strong
            foundation in modern web technologies. I am seeking an entry-level
            role to apply my skills in **Tailwind CSS**, **JavaScript**, and **React.js** to
            real-world projects.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <a 
              href="https://drive.google.com/file/d/1UzQrVGlFyhOCtw6ZWJBFTf2PXG_XA_QS/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                duration={3000}
                className="flex items-center gap-2 border-slate-800 bg-black/40 font-bold text-white backdrop-blur-xl"
              >
                <motion.span variants={iconVariants} whileHover="bounce">
                  <Download size={18} />
                </motion.span>
                Download Resume
              </Button>
            </a>

            <motion.a
              href="#contact"
              initial="initial"
              whileHover="hover"
              className="group flex cursor-pointer items-center gap-2 font-bold text-white transition-colors hover:text-blue-400"
            >
              Contact Me
              <motion.span
                variants={{
                  hover: { x: 5, transition: { repeat: Infinity, duration: 0.6 } }
                }}
              >
                <Send
                  size={18}
                  className="-rotate-12 transition-transform group-hover:rotate-0"
                />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}