"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(0, { stiffness: 600, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 600, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };
    const hover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(!!(target.tagName === "A" || target.tagName === "BUTTON" || target.closest("button") || target.closest("a")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", hover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x: mouseX, y: mouseY }}
      animate={{ scale: isHovered ? 5 : 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    />
  );
}