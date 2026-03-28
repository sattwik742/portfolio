"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  // Core position values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for that premium "heavy" feel
  const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
  const quickSpring = { stiffness: 1000, damping: 50 };
  
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);
  const dotX = useSpring(mouseX, quickSpring);
  const dotY = useSpring(mouseY, quickSpring);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const target = e.target as HTMLElement;

    // Check for magnetic elements (buttons, links, or elements with data-magnetic)
    const interactiveEl = target.closest("button, a, [data-magnetic]") as HTMLElement;

    if (interactiveEl) {
      const rect = interactiveEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from mouse to center of element
      const distance = Math.hypot(clientX - centerX, clientY - centerY);

      // If close enough, "snap" the cursor values to the center
      if (distance < 60) {
        mouseX.set(centerX);
        mouseY.set(centerY);
        setMagneticTarget(interactiveEl);
        setIsHovered(true);
        return;
      }
    }

    // Default behavior
    mouseX.set(clientX);
    mouseY.set(clientY);
    setMagneticTarget(null);
    setIsHovered(!!interactiveEl);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Magnetic Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (magneticTarget ? magneticTarget.offsetWidth + 20 : 60) : 32,
          height: isHovered ? (magneticTarget ? magneticTarget.offsetHeight + 10 : 60) : 32,
          borderRadius: magneticTarget ? "12px" : "999px",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
        }}
        className="absolute border border-white mix-blend-difference flex items-center justify-center transition-[width,height,border-radius] duration-300 ease-out"
      />

      {/* Precision Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.5 : isHovered ? 1.5 : 1,
          opacity: magneticTarget ? 0 : 1, // Hide dot when snapped to button center
        }}
        className="absolute w-1.5 h-1.5 bg-white rounded-full mix-blend-difference"
      />
    </div>
  );
}