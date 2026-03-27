"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Projects() {
    // Animation variants for the "loading" bars
    const barVariants = {
        initial: { scaleY: 0.3, opacity: 0.2 },
        animate: {
            scaleY: 1,
            opacity: 1,
            transition: {
                repeat: Infinity,
                repeatType: "reverse" as const,
                duration: 0.8,
                ease: "easeInOut",
            },
        },
    };

    return (
        <section id="projects" className="py-32 px-6 bg-black font-space-grotesk overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20 border-l border-white pl-6">
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                        Projects
                    </h2>
                </div>

                {/* Coming Soon Canvas */}
                <div className="relative h-[60vh] w-full border border-white/10 flex flex-col items-center justify-center bg-zinc-950/50 group">

                    {/* Background Grid Pattern (Subtle) */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', size: '40px 40px' }}
                    />
                    {/* Main Text Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center z-10"
                    >
                        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase mb-4">
                            Coming Soon
                        </h3>
                    </motion.div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />

                    {/* Scanning Line Animation */}
                    <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-px bg-white/10 z-0"
                    />
                </div>
            </div>
        </section>
    );
}