"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import { GraduationCap, Calendar, MapPin, ChevronDown, BookOpen, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const educationData = [
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
    modules: ["Data Structures", "DBMS", "Computer Networks", "UNIX Operating System",]
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

const CustomCursor = ({ isHovering }: { isHovering: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  const x = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/40 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center -ml-6 -mt-6"
      animate={{ 
        scale: isHovering ? 1.5 : 0.8, 
        backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
      }}
    >
      {isHovering && <BookOpen className="w-4 h-4 text-black" />}
    </motion.div>
  );
};

const EducationCard = ({ edu, index, setGlobalHover }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 20,
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
    <div className={`relative flex flex-col md:flex-row items-center justify-between mb-32 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
      {/* Timeline Node */}
      <div className="absolute left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 z-20 hidden md:block border-4 border-black" />

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        onMouseEnter={() => setGlobalHover(true)}
        onMouseLeave={() => setGlobalHover(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-[46%] relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm group cursor-none transition-colors duration-500 hover:border-white/30 z-10"
      >
        {/* Parallax Image Background */}
        <div 
          ref={imgRef} 
          className="absolute inset-0 w-full h-[140%] -top-[20%] opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000 bg-cover bg-center pointer-events-none" 
          style={{ backgroundImage: `url(${edu.image})` }} 
        />
        
        {/* Gradient Overlay - Fixed syntax */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

        <div className="relative p-8 md:p-10 z-20">
          <div className="flex justify-between items-start mb-12">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="p-2 rounded-full bg-white/5 border border-white/5">
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </motion.div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{edu.degree}</h3>
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-6">{edu.institution}</p>

          <div className="flex gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {edu.duration}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {edu.location}</span>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="overflow-hidden"
              >
                <div className="pt-8 mt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {edu.modules.map((module: string, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-[10px] text-zinc-300 font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-white/40" />
                      {module}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <div className="hidden md:block w-[46%]" />
    </div>
  );
};

export default function Education() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start center", "end center"] 
  });
  
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-40 bg-black text-white relative w-full overflow-hidden min-h-screen">
      <CustomCursor isHovering={isHovering} />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="mb-32 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Education
          </motion.h2>
          <p className="text-zinc-500 mt-2 text-sm">My academic timeline and core specializations.</p>
        </header>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div 
            style={{ scaleY }} 
            className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 origin-top -translate-x-1/2 hidden md:block z-0" 
          />
          
          <div className="relative z-10">
            {educationData.map((edu, i) => (
              <EducationCard 
                key={i} 
                edu={edu} 
                index={i} 
                setGlobalHover={setIsHovering} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}