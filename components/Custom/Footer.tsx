"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, Code2 } from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Sattwik",
      links: [
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "GitHub", href: "https://github.com/sattwik742" },
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "Instagram", href: "https://instagram.com" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-black py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Logo and Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Building modern web experiences with cutting-edge technologies and minimal design.
            </p>
          </div>

          {/* Navigation Grids */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-sm font-[family-name:var(--font-outfit)]">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white text-sm transition-colors font-[family-name:var(--font-outfit)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright and Icons */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-xs font-[family-name:var(--font-outfit)]">
            © {new Date().getFullYear()} Sattwik. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a href="https://github.com/sattwik742" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sattwik2025" className="text-zinc-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/sattwik_23" className="text-zinc-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}