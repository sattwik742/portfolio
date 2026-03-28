"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  useTransform
} from "framer-motion";
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  image: string;
  modules: string[];
}

const educationData: EducationItem[] = [
  {
    degree: "Master of Computer Applications",
    institution: "KIIT School of Computer Applications",
    duration: "2025 — 2027",
    location: "Bhubaneswar, Odisha",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    modules: ["Algorithms", "AI & ML", "Advanced Java", "Data Analytics"],
  },
  {
    degree: "Bachelor of Computer Applications",
    institution: "RCC Institute of Information Technology",
    duration: "2022 — 2025",
    location: "Kolkata, West Bengal",
    image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg",
    modules: ["Data Structures", "DBMS", "Computer Networks", "UNIX OS"],
  },
  {
    degree: "Higher Secondary Education",
    institution: "Baranagar Narendranath Vidyamandir",
    duration: "2019 — 2021",
    location: "Kolkata, West Bengal",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop",
    modules: ["Mathematics", "Physics", "Chemistry", "Biology"],
  }
];

const EducationCard = ({ edu, index }: { edu: EducationItem, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-24 last:mb-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-0 md:left-[-30.5px] top-10 z-20 hidden md:block">
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? "#fff" : "#09090b",
            borderColor: isHovered ? "#fff" : "rgba(255,255,255,0.2)"
          }}
          className="h-2 w-2 rounded-full border transition-all duration-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 items-start">
        <div className="space-y-3 pt-2">
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            className="flex items-center gap-2 text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px]"
          >
            <Calendar className="h-3.5 w-3.5" />
            {edu.duration}
          </motion.div>
          <div className="flex items-center gap-2 text-zinc-600 font-semibold text-[9px] uppercase tracking-widest">
            <MapPin className="h-3.5 w-3.5" />
            {edu.location}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-4xl border border-white/5 bg-zinc-950/40 backdrop-blur-xl transition-all duration-700 hover:border-white/20">
          <motion.div
            animate={{
              opacity: isHovered ? 0.2 : 0.04,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(${edu.image})` }}
          />

          <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-zinc-950/95 to-transparent" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="space-y-5 flex-1">

                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white leading-none">
                  {edu.degree}
                </h3>

                <p className="text-zinc-500 text-lg font-medium tracking-tight">
                  {edu.institution}
                </p>
              </div>

              <motion.div
                animate={{
                  y: isHovered ? -4 : 0,
                  x: isHovered ? 4 : 0,
                  opacity: isHovered ? 1 : 0.2
                }}
                className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white"
              >
                <ArrowUpRight className="h-6 w-6" />
              </motion.div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-4 w-4 text-zinc-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Curriculum focus</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {edu.modules.map((module, i) => (
                  <span
                    key={i}
                    className="px-5 py-2 rounded-full bg-zinc-900/50 border border-white/5 text-[11px] font-medium text-zinc-400 tracking-wide transition-all hover:bg-white hover:text-black hover:scale-105"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25
  });

  // Opacity for the sticky progress bar so it fades in/out
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      id="education"
      ref={containerRef}
      className={cn(
        "relative w-full bg-[#050505] py-24 md:py-48 text-white overflow-hidden font-sans",
        spaceGrotesk.variable
      )}
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      {/* Mobile-only Top Progress Bar */}
      <motion.div
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-zinc-900 md:hidden"
      >
        <motion.div
          className="h-full bg-white origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.div>

      <div className="absolute inset-0 z-0 opacity-[0.03] mask-[radial-gradient(ellipse_at_center,black,transparent)] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <div className="mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-6"
          >
            <div className="flex items-center gap-4">
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-[ -0.04em] leading-[0.9]">
              Education
            </h2>
          </motion.div>
        </div>

        <div className="relative">
          {/* Main Vertical Timeline */}
          <div className="absolute left-0 md:-left-6.75 top-0 bottom-0 w-px bg-zinc-900 hidden md:block">
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-500 via-white to-transparent"
            />
          </div>

          <div className="relative">
            {educationData.map((edu, i) => (
              <EducationCard key={i} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Deep Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-125 h-125 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-125 h-125 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}