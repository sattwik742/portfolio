"use client";

import React from "react";
import { FlipWords } from "../ui/flip-words";
import { Button } from "../ui/moving-border";
import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";

export default function Hero() {
  const words = ["Modern", "Scalable", "Dynamic"];

  const iconAnimation = {
    hover: { y: [0, -3, 0], transition: { duration: 0.6, repeat: Infinity } },
    hoverRight: { x: [0, 5, 0], transition: { duration: 0.6, repeat: Infinity } }
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-black mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <div className="relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-(family-name:--font-space-grotesk) tracking-tight">
            Hi, I'm <span className="text-white">Sattwik</span> <br />
            I build
            <FlipWords words={words} className="text-blue-500" /> <br />
            Websites
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-(family-name:--font-outfit) mt-4 mb-10">
           Aspiring Frontend Developer and current MCA student with a strong foundation in modern web technologies. I am seeking an entry-level role to apply my skills in Tailwind CSS, JavaScript, React.Js to real-world projects. As a motivated beginner, I am dedicated to continuous technical growth and contributing to innovative, user-focused web solutions.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="https://drive.google.com/file/d/1UzQrVGlFyhOCtw6ZWJBFTf2PXG_XA_QS/view?usp=sharing" download="Sattwik.pdf">
              <Button
                duration={3000}
                className="font-bold font-(family-name:--font-outfit) flex items-center gap-2 bg-black/40 backdrop-blur-xl text-white"
              >
                <motion.span variants={iconAnimation} whileHover="hover">
                  <Download size={18} />
                </motion.span>
                Download Resume
              </Button>
            </a>
            
            <motion.a 
              href="#contact"
              whileHover="hover"
              className="group px-10 py-4 text-white font-bold hover:text-zinc-300 transition-colors font-(family-name:--font-outfit) flex items-center gap-2 cursor-pointer"
            >
              Contact Me
              <motion.span variants={iconAnimation} whileHover="hoverRight">
                <Send size={18} className="rotate-[-10deg] group-hover:rotate-0 transition-transform" />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}