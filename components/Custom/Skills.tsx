"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate
} from "framer-motion";
import {
  Layout,
  Database,
  Terminal,
  Code2,
  Cloud,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";

// Optimized Icon Fetching - Using slugs that match simpleicons.org
const getIconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}/e5e7eb`;

const skillCategories = [
  {
    title: "Languages",
    icon: <Code2 className="w-5 h-5 text-white" />,
    // description: "The core syntax and logic that power every solution.",
    skills: [
      { name: "JavaScript", slug: "javascript" },
      { name: "Python", slug: "python" },
      { name: "Java", slug: "openJdk" },
    ],
    className: "lg:col-span-1",
  },
  {
    title: "Frontend",
    icon: <Layout className="w-5 h-5 text-white" />,
    // description: "Architecting visual logic and fluid user interfaces with modern frameworks.",
    skills: [
      { name: "HTML5", slug: "html5" },
      { name: "CSS", slug: "css" },
      { name: "Tailwind", slug: "tailwindcss" },
    ],
    className: "lg:col-span-2",
  },
  {
    title: "Backend",
    icon: <Server className="w-5 h-5 text-white" />,
    // description: "Building resilient server architectures and API services.",
    skills: [
      { name: "Node.js", slug: "nodedotjs" },
    ],
    className: "lg:col-span-1",
  },
  {
    title: "Database",
    icon: <Database className="w-5 h-5 text-white" />,
    // description: "Management of relational and non-relational data structures.",
    skills: [
      { name: "MongoDB", slug: "mongodb" },
      { name: "MySQL", slug: "mysql" },
    ],
    className: "lg:col-span-2",
  },
  {
    title: "Deployment",
    icon: <Cloud className="w-5 h-5 text-white" />,
    // description: "Scalable infrastructure and containerized orchestration.",
    skills: [
      { name: "Vercel", slug: "vercel" },
    ],
    className: "lg:col-span-2",
  },
  {
    title: "Systems",
    icon: <Terminal className="w-5 h-5 text-white" />,
    // description: "Environment automation and version integrity.",
    skills: [
      { name: "Git", slug: "git" },
      { name: "Linux", slug: "linux" },
      { name: "Bash", slug: "gnubash" },
    ],
    className: "lg:col-span-1",
  }
];

const BackgroundGradient = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0, 50%", "100% 50%", "0 50%"] },
  };
  return (
    <div className={cn("relative p-px group", containerClassName)}>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 rounded-3xl z-1 opacity-40 group-hover:opacity-100 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_0%,#404040,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#71717a,transparent),radial-gradient(circle_farthest-side_at_0_0%,#ffffff,#18181b)]"
        )}
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 rounded-3xl z-1",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_0%,#404040,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#71717a,transparent),radial-gradient(circle_farthest-side_at_0_0%,#ffffff,#18181b)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

const SkillCard = ({ category }: { category: typeof skillCategories[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  const maskImage = useMotionTemplate`radial-gradient(200px circle at ${useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])}, white, transparent)`;

  return (
    <BackgroundGradient containerClassName={category.className}>
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-[23px] bg-zinc-950 p-8"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl transition-transform group-hover:scale-110 duration-300">
              {category.icon}
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{category.title}</h3>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed mb-10 font-medium">
            {category.description}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/2 px-3 py-2 transition-all hover:bg-white/[0.1] hover:border-white/20"
            >
              <img
                src={getIconUrl(skill.slug)}
                alt={skill.name}
                className="h-4 w-4 brightness-200 grayscale opacity-70 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-black py-32 overflow-hidden font-[family-name:var(--font-space-grotesk)]"
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-[0.8]">
              Skills
            </h2>
            <p className="text-zinc-500 text-xl max-w-lg leading-relaxed font-medium">
              Technical proficiencies in building scalable systems and interactive interfaces.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <SkillCard key={i} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}