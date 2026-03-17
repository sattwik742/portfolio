"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { 
  Layout, 
  Database, 
  Terminal, 
  Cpu, 
  Sparkles 
} from "lucide-react";

const getIconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5 text-white" />,
    skills: [
      { name: "HTML5", slug: "html5" },
      { name: "CSS", slug: "css" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "React", slug: "react" }
    ],
    accent: "#0070f3" // Vercel Blue
  },
  {
    title: "Backend & Cloud",
    icon: <Database className="w-5 h-5 text-white" />,
    skills: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Express", slug: "express" },
      { name: "Firebase", slug: "firebase" }
    ],
    accent: "#7928ca" // Vercel Purple
  },
  {
    title: "Systems & DevOps",
    icon: <Terminal className="w-5 h-5 text-white" />,
    skills: [
      { name: "Git", slug: "git" },
      { name: "Ubntu", slug: "ubuntu" },
      { name: "Arch", slug: "archlinux" },
      { name: "Vim", slug: "vim"}
    ],
    accent: "#ff0080" // Vercel Pink
  },
  {
    title: "Core Fundamentals",
    icon: <Cpu className="w-5 h-5 text-white" />,
    skills: [
      { name: "Java", slug: "openjdk" },
      { name: "SQL", slug: "mysql" }
    ],
    accent: "#f5a623" // Vercel Orange
  }
];

const SkillCard = ({ category }: { category: typeof skillCategories[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse tracking for the radial gradient "light" effect
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900"
    >
      {/* The Next.js Spot Light effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${category.accent}15,
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700">
            {category.icon}
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-100 font-sans">
            {category.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {category.skills.map((skill) => (
            <div 
              key={skill.name} 
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/50 hover:border-zinc-700 transition-all group/icon"
            >
              <img 
                src={getIconUrl(skill.slug)} 
                alt={skill.name}
                className="w-6 h-6 mb-3 opacity-50 grayscale group-hover/icon:opacity-100 group-hover/icon:grayscale-0 transition-all duration-300"
              />
              <span className="text-[11px] font-medium font-mono text-zinc-500 group-hover/icon:text-zinc-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Next.js useMotionTemplate helper
import { useMotionTemplate } from "framer-motion";

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Refined Parallax
  const yContent = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} id="skills" className="relative py-32 bg-black overflow-hidden selection:bg-white selection:text-black">
      {/* Background Grid - Exactly like Vercel/Next.js */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-sans">
            Skills
          </h2>
        </div>

        <motion.div style={{ y: yContent }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillCategories.map((cat, index) => (
            <SkillCard key={index} category={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}