"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { 
  Layout, 
  Database, 
  Terminal, 
  Cpu, 
  Sparkles,
} from "lucide-react";

const getIconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

// Floating element component for the background
const FloatingObject = ({ delay, duration, size, top, left, color }: any) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-20, 20, -20] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
        backgroundColor: color,
      }}
    />
  );
};

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5" />,
    description: "Architecting visual logic and fluid user interfaces.",
    skills: [
      { name: "HTML5", slug: "html5" },
      { name: "CSS", slug: "css" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "React", slug: "react" }
    ],
    accent: "from-blue-500/20 to-cyan-500/20",
    glow: "#0070f3",
    className: "lg:col-span-2 lg:row-span-1"
  },
  {
    title: "Backend & Cloud",
    icon: <Database className="w-5 h-5" />,
    description: "Building resilient server architectures and data pipelines.",
    skills: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Express", slug: "express" },
      { name: "Firebase", slug: "firebase" }
    ],
    accent: "from-purple-500/20 to-pink-500/20",
    glow: "#7928ca",
    className: "lg:col-span-1 lg:row-span-2"
  },
  {
    title: "Systems & DevOps",
    icon: <Terminal className="w-5 h-5" />,
    description: "Environment automation and version integrity.",
    skills: [
      { name: "Git", slug: "git" },
      { name: "Ubuntu", slug: "ubuntu" },
      { name: "Arch", slug: "archlinux" },
      { name: "Vim", slug: "vim"}
    ],
    accent: "from-pink-500/20 to-rose-500/20",
    glow: "#ff0080",
    className: "lg:col-span-1 lg:row-span-1"
  },
  {
    title: "Core Stack",
    icon: <Cpu className="w-5 h-5" />,
    description: "Deep-level algorithms and relational systems.",
    skills: [
      { name: "Java", slug: "openjdk" },
      { name: "SQL", slug: "mysql" }
    ],
    accent: "from-orange-500/20 to-yellow-500/20",
    glow: "#f5a623",
    className: "lg:col-span-2 lg:row-span-1"
  }
];

const SkillCard = ({ category }: { category: typeof skillCategories[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      400px circle at ${useTransform(mouseX, (v) => v + (cardRef.current?.offsetWidth || 0) / 2)}px 
      ${useTransform(mouseY, (v) => v + (cardRef.current?.offsetHeight || 0) / 2)}px,
      ${category.glow}15,
      transparent 80%
    )
  `;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 transition-all duration-500 hover:border-white/20 ${category.className}`}
    >
      <motion.div className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: spotlight }} />

      <div className="relative z-10 flex flex-col h-full pointer-events-none" style={{ transform: "translateZ(50px)" }}>
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.accent} border border-white/10 flex items-center justify-center text-white shadow-2xl`}>
              {category.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tighter text-white font-[family-name:var(--font-space-grotesk)]">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 font-[family-name:var(--font-outfit)] leading-relaxed max-w-[240px]">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pointer-events-auto">
          {category.skills.map((skill) => (
            <motion.div 
              key={skill.name} 
              whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-crosshair group/item"
            >
              <img src={getIconUrl(skill.slug)} alt={skill.name} className="w-5 h-5 opacity-40 grayscale group-hover/item:opacity-100 group-hover/item:grayscale-0 transition-all duration-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover/item:text-white transition-colors">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  
  // Parallax movement for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section ref={sectionRef} id="skills" className="relative py-40 bg-black overflow-hidden scroll-mt-20">
      {/* Parallax Floating Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <FloatingObject size="300px" top="10%" left="5%" color="#3b82f6" duration={8} delay={0} />
          <FloatingObject size="250px" top="60%" left="80%" color="#a855f7" duration={10} delay={1} />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute inset-0">
          <FloatingObject size="200px" top="40%" left="40%" color="#ec4899" duration={12} delay={2} />
          <FloatingObject size="350px" top="80%" left="15%" color="#f59e0b" duration={15} delay={0.5} />
        </motion.div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4 text-emerald-500 font-bold tracking-[0.3em] uppercase text-[10px]">
              <div className="h-1 w-8 bg-emerald-500" />
              Expertise
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white font-[family-name:var(--font-space-grotesk)] leading-[0.85]">
              My Digital <br /> <span className="text-zinc-700">Toolbox.</span>
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-zinc-500 text-lg font-[family-name:var(--font-outfit)] max-w-sm text-right leading-relaxed">
            A collection of modern tools and technologies I use to turn complex problems into elegant solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-[minmax(350px,auto)] gap-8 perspective-1000">
          {skillCategories.map((cat, index) => (
            <SkillCard key={index} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}