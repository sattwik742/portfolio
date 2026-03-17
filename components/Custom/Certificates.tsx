"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ExternalLink, Award, ShieldCheck } from "lucide-react";
import { SiGoogle, SiHackerrank, SiCss } from "react-icons/si";

const certificates = [
  {
    title: "Python Crash Course",
    issuer: "Google",
    partner: "Coursera",
    date: "April 2024",
    icon: <SiGoogle className="w-5 h-5" />,
    accent: "#4285F4",
    link: "https://www.coursera.org/account/accomplishments/certificate/CTHXMTAKAFKT",
    description: "Deep dive into Python syntax, data structures, and automation scripts."
  },
  {
    title: "SQL (Basic) Mastery",
    issuer: "HackerRank",
    date: "June 2024",
    icon: <SiHackerrank className="w-5 h-5" />,
    accent: "#2EC866",
    link: "https://www.hackerrank.com/certificates/36b2cd5d4dfc",
    description: "Expertise in complex queries, relational logic, and database aggregation."
  },
  {
    title: "Modern CSS Architecture",
    issuer: "HackerRank",
    date: "Dec 2024",
    icon: <SiCss className="w-5 h-5" />,
    accent: "#264de4",
    link: "https://www.hackerrank.com/certificates/fb11cbbd3c44",
    description: "Advanced layout modeling including Grid, Flexbox, and Inheritance."
  }
];

const CertificateCard = ({ cert }: { cert: typeof certificates[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-md p-8 transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/40"
    >
      {/* Dynamic Lighting Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${cert.accent}15,
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div 
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-zinc-400 group-hover:scale-110 group-hover:text-white transition-all duration-500 shadow-2xl"
            style={{ boxShadow: `0 0 20px ${cert.accent}10` }}
          >
            {cert.icon}
          </div>
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <ExternalLink size={18} />
          </motion.a>
        </div>

        <div className="space-y-4 font-sans">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
              {cert.issuer}
            </span>
            <div className="h-px w-8 bg-white/10" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
              {cert.date}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-tight">
            {cert.title}
          </h3>
          
          <p className="text-sm text-zinc-500 leading-relaxed font-[family-name:var(--font-outfit)]">
            {cert.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 group/verify">
          <ShieldCheck size={14} className="text-emerald-500 group-hover:animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
            Verified Credential
          </span>
        </div>
        <Award size={14} className="text-zinc-700" />
      </div>
    </motion.div>
  );
};

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-40 bg-black overflow-hidden scroll-mt-20">
      {/* Background Spatial Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">
            Achievements
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white font-[family-name:var(--font-space-grotesk)] leading-[0.85]">
            Professional <br /> <span className="text-zinc-800">Validation.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertificateCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}