"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
}

export function Button({
  borderRadius = "1.75rem",
  children,
  duration = 2000,
  className,
  containerClassName,
  ...otherProps
}: ButtonProps) {
  return (
    <div
      className={`bg-transparent relative h-16 w-44 p-px overflow-hidden ${containerClassName}`}
      style={{ borderRadius }}
    >
      {/* The moving border container */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div 
            className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--blue-500)_40%,transparent_60%)]" 
          />
        </MovingBorder>
      </div>

      {/* The actual button content */}
      <button
        className={`relative bg-zinc-900/80 border border-white/10 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased ${className}`}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
        {...otherProps}
      >
        {children}
      </button>
    </div>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current ? pathRef.current.getPointAtLength(val).x : 0
  );
  const y = useTransform(progress, (val) =>
    pathRef.current ? pathRef.current.getPointAtLength(val).y : 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};