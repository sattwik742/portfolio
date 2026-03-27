"use client";

import React, { useRef, useEffect, useState } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    degree: "Master of Computer Applications (MCA)",
    institution: "KIIT School of Computer Applications",
    duration: "2025 - Ongoing",
    location: "Bhubaneswar, Odisha",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    modules: ["Design and Analysis of Algorithms", "Professional Communication", "AI & ML", "Advanced Java", "Data Analytics"]
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "RCC Institute of Information Technology",
    duration: "2022 - 2025",
    location: "Kolkata, West Bengal",
    image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg",
    modules: ["Data Structures", "DBMS", "Computer Networks", "UNIX Operating System"]
  },
  {
    degree: "Higher Secondary (12th Grade)",
    institution: "Baranagar Narendranath Vidyamandir",
    duration: "2019 - 2021",
    location: "Kolkata, West Bengal",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop",
    modules: ["Mathematics", "Biology", "Physics", "Chemistry"]
  }
];

const EducationCard = ({ 
  edu, 
  index, 
  scrollYProgress 
}: { 
  edu: EducationItem, 
  index: number, 
  scrollYProgress: any 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  // Individual dot trigger: Lights up when the scroll reaches its position
  const dotScale = useTransform(
    scrollYProgress,
    [index * 0.3, index * 0.3 + 0.1],
    [0.5, 1]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [index * 0.3, index * 0.3 + 0.1],
    [0.2, 1]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imgRef.current && cardRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-center justify-between mb-32",
      index % 2 === 0 ? "md:flex-row-reverse" : ""
    )}>
      {/* Animated Dot on the Line */}
      <motion.div 
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-1/2 w-5 h-5 bg-white rounded-full -translate-x-1/2 z-30 hidden md:flex items-center justify-center border-[4px] border-black shadow-[0_0_20px_rgba(255,255,255,0.8)]"
      >
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
      </motion.div>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative z-10 w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/5 bg-zinc-950 p-1 transition-all duration-500 hover:border-white/20 md:w-[45%]"
      >
        <div className="relative overflow-hidden rounded-[28px] bg-zinc-900/40">
          {/* Parallax Image Background */}
          <div
            ref={imgRef}
            className="absolute inset-0 -top-[30%] h-[160%] w-full bg-cover bg-center opacity-10 grayscale transition-all duration-1000 group-hover:opacity-25 group-hover:grayscale-0"
            style={{ backgroundImage: `url(${edu.image})` }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/90 to-zinc-950" />

          <div className="relative z-20 p-8 md:p-10">
            <div className="mb-12 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl transition-transform group-hover:rotate-[360deg] duration-700">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)" }}
                className="rounded-full border border-white/5 p-2 transition-colors"
              >
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </motion.div>
            </div>

            <h3 className="mb-3 text-2xl md:text-3xl font-black tracking-tighter text-white leading-tight">
              {edu.degree}
            </h3>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              {edu.institution}
            </p>

            <div className="flex flex-wrap gap-3 font-bold uppercase tracking-widest text-zinc-400 text-[9px]">
              <span className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-full border border-white/5">
                <Calendar className="h-3 w-3 text-white" /> {edu.duration}
              </span>
              <span className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-full border border-white/5">
                <MapPin className="h-3 w-3 text-white" /> {edu.location}
              </span>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-10 space-y-4 border-t border-white/5 pt-8">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-zinc-600" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Core Specializations</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {edu.modules.map((module, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 font-bold text-zinc-400 text-[10px] uppercase tracking-wider group/item"
                        >
                          <CheckCircle2 className="h-3 w-3 text-zinc-700 transition-colors group-hover/item:text-white" />
                          {module}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Spacer for Desktop Timeline */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  );
};

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 15,
    restDelta: 0.001
  });

  return (
    <section 
      id="education" 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden bg-black py-40 text-white font-[family-name:var(--font-space-grotesk)]"
    >
      {/* Background Subtle Grid - Matches Skills Section */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-8 leading-[0.8]">
              Education
            </h2>
          </motion.div>
        </header>

        <div className="relative">
          {/* SVG Lining Animation */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 md:block">
            {/* Static Background Line */}
            <div className="h-full w-full bg-zinc-900/50" />
            
            {/* Animated SVG Path for the Line */}
            <svg className="absolute top-0 left-0 h-full w-[2px] -translate-x-[0.5px]">
              <motion.line
                x1="0" y1="0" x2="0" y2="100%"
                stroke="white"
                strokeWidth="2"
                style={{ pathLength }}
                strokeDasharray="0 1"
              />
            </svg>
          </div>

          <div className="relative z-10">
            {educationData.map((edu, i) => (
              <EducationCard
                key={i}
                edu={edu}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}