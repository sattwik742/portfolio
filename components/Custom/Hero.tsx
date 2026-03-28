"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { FlipWords } from "../ui/flip-words";
import { Button } from "../ui/moving-border";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Download,
  MessageSquare,
  MapPin,
  Code2,
  Globe,
  Database,
  Cpu,
  Layout,
  Terminal,
  Layers
} from "lucide-react";

export default function Hero() {
  const words = ["Modern", "Scalable", "Dynamic", "Seamless"];
  const [time, setTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Tech stack with specific brand colors
  const techStack = [
    { name: "React", icon: <Layout size={18} />, color: "#61DAFB" },
    { name: "Next.js", icon: <Globe size={18} />, color: "#ffffff" },
    { name: "TypeScript", icon: <Code2 size={18} />, color: "#3178C6" },
    { name: "Node.js", icon: <Cpu size={18} />, color: "#339933" },
    { name: "MongoDB", icon: <Database size={18} />, color: "#47A248" },
    { name: "Tailwind", icon: <Layers size={18} />, color: "#06B6D4" },
    { name: "JavaScript", icon: <Terminal size={18} />, color: "#F7DF1E" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePos({ x: clientX - left, y: clientY - top });
  };

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="group/section relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 font-outfit"
    >
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/section:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 80%)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      />

      {/* TOP STATUS BAR */}
      <div className="absolute top-10 flex w-full justify-between px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 rounded-full border border-white/5 bg-white/3 px-4 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Odisha, IN</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden items-center gap-2 text-zinc-500 md:flex"
        >
          <MapPin size={12} className="text-blue-500" />
          <span className="text-[10px] font-bold tracking-widest uppercase">{time || "00:00 AM"} IST</span>
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center text-center"
      >
        <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl font-space-grotesk">
          Hi, I&apos;m <span className="text-zinc-400">Sattwik</span> <br />
          <span className="text-zinc-600">I build </span>
          <FlipWords words={words} duration={3000} className="text-white" />
          <span className="text-zinc-200"> Websites</span>
        </h1>

        <p className="mx-auto mb-10 max-w-md text-xs leading-relaxed text-zinc-500 md:text-sm">
          MCA student & <span className="text-zinc-300">Frontend Developer</span>.
          Crafting high-performance digital experiences with a focus on clean code and interactive motion.
        </p>

        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          <Button
            as="a"
            href="#"
            duration={3000}
            className="group/btn relative flex h-12 w-44 items-center justify-center gap-3 border-zinc-800 bg-zinc-950 text-zinc-200 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Download size={16} className="text-blue-500 transition-transform group-hover/btn:-translate-y-1" />
            Resume
          </Button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="group flex items-center gap-3 text-[10px] font-black tracking-[0.25em] text-zinc-500 uppercase transition-colors hover:text-white"
          >
            Contact Me
            <MessageSquare size={14} className="text-zinc-600 transition-transform group-hover:rotate-12 group-hover:text-blue-500" />
          </motion.a>
        </div>
      </motion.div>

      {/* COLORFUL TECH MARQUEE */}
      <div className="absolute bottom-16 w-full">
        <div className="relative flex overflow-hidden py-6 mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex min-w-full shrink-0 items-center justify-around gap-20 px-10"
          >
            {[...techStack, ...techStack].map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 grayscale transition-all duration-300 hover:grayscale-0"
              >
                <div style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 h-40 w-full bg-linear-to-t from-background to-transparent" />
    </section>
  );
}