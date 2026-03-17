"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ExternalLink } from "lucide-react";
// Importing brand-specific icons
import { SiGoogle, SiCoursera, SiHackerrank, SiPython, SiSqlite, SiCss3 } from "react-icons/si";

const certificates = [
  {
    title: "Python Crash Course",
    issuer: "Google",
    partner: "Coursera",
    date: "22nd April 2024",
    // We use a combination or the main brand icon
    icon: <SiGoogle className="w-5 h-5" />,
    brandColor: "group-hover:text-blue-500",
    link: "https://www.coursera.org/account/accomplishments/certificate/CTHXMTAKAFKT",
    description: "Foundational concepts of Python programming, syntax, and data structures."
  },
  {
    title: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "24 Jun 2024",
    icon: <SiHackerrank className="w-5 h-5" />,
    brandColor: "group-hover:text-green-500",
    link: "https://www.hackerrank.com/certificates/36b2cd5d4dfc",
    description: "Proficiency in simple queries, relational database logic, and aggregators."
  },
  {
    title: "CSS (Basic) Certificate",
    issuer: "HackerRank",
    date: "08 Dec 2024",
    icon: <SiHackerrank className="w-5 h-5" />,
    brandColor: "group-hover:text-green-500",
    link: "https://www.hackerrank.com/certificates/fb11cbbd3c44",
    description: "Covers CSS Cascading, Inheritance, text styling, and modern layout box modeling."
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/50 p-8 transition-all duration-500 hover:border-white/20"
    >
      {/* Interactive Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 font-sans">
        <div className="flex items-center justify-between mb-8">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 text-zinc-400 shadow-2xl transition-all duration-300 group-hover:border-white/30 group-hover:scale-110 ${cert.brandColor}`}>
            {cert.icon}
          </div>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
          </motion.a>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              {cert.issuer}
            </span>
            {cert.partner && (
              <>
                <span className="text-zinc-700">•</span>
                <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                  {cert.partner}
                </span>
              </>
            )}
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
            {cert.title}
          </h3>
          <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed font-normal">
            {cert.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Verified
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-600">
          {cert.date}
        </span>
      </div>
    </motion.div>
  );
};

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-32 bg-black overflow-hidden border-t border-zinc-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 font-sans">
        <div className="flex flex-col items-start mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Certificates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}