"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    title: "E-Commerce OS",
    description: "A high-performance storefront with real-time inventory and server-side filtering.",
    tech: ["Next.js", "TypeScript", "Prisma"],
    link: "#",
    github: "#",
  }
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (tweak the divisor to change intensity)
    const rX = (mouseY - height / 2) / -15;
    const rY = (mouseX - width / 2) / 15;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      style={{ perspective: "1000px" }}
      className="group"
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex flex-col justify-between h-[450px] border border-zinc-800 bg-zinc-950/50 p-8 transition-colors duration-500 group-hover:border-zinc-400 group-hover:bg-zinc-900/30"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          <header className="flex justify-between items-start mb-12">
            <motion.div 
              style={{ translateZ: "50px" }}
              className="h-12 w-12 border border-zinc-800 flex items-center justify-center bg-zinc-950 text-white group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300"
            >
              <Code2 size={22} />
            </motion.div>
            
            <div className="flex gap-4">
              <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
          </header>

          <motion.h3 
            style={{ translateZ: "60px" }}
            className="text-3xl font-bold tracking-tighter text-white mb-4"
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            style={{ translateZ: "40px" }}
            className="text-sm text-zinc-400 mb-8 leading-relaxed max-w-[260px]"
          >
            {project.description}
          </motion.p>

          <div className="mt-auto flex flex-wrap gap-3 pt-6 border-t border-zinc-800/50">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-black border-t border-zinc-900 overflow-visible font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-[10px] font-mono tracking-[0.6em] text-zinc-500 uppercase block mb-4">Selected Works</span>
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white leading-[0.8] transition-all">
              Product <br />
              <span className="text-zinc-900 hover:text-zinc-800 transition-colors duration-700">Gallery</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-[10px] font-mono max-w-[180px] uppercase tracking-widest leading-relaxed">
            Architecting digital interfaces with industrial precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}