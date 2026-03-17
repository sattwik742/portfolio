"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, CheckCircle2, Loader2 } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [state, handleSubmit] = useForm("xjgaaoeg");

  if (state.succeeded) {
    return (
      <section id="contact" className="py-20 px-4 bg-black min-h-[600px] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 border border-white/10 rounded-3xl bg-zinc-900/50 backdrop-blur-sm"
        >
          <CheckCircle2 className="text-green-500 mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)]">Message Sent!</h2>
          <p className="text-zinc-400 font-[family-name:var(--font-outfit)]">Thanks for reaching out!</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-all"
          >
            Send another
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    // Added scroll-mt-20 so the section has breathing room when scrolled to
    <section id="contact" className="py-20 px-4 md:px-6 bg-black scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-space-grotesk)]"
            >
              Get in Touch
            </motion.h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-md font-[family-name:var(--font-outfit)]">
              I'm currently open to new opportunities and collaborations.
            </p>

            <div className="space-y-6">
              <ContactDetail icon={<Mail size={20} />} title="Email" detail="sattwik211@gmail.com" />
              <ContactDetail icon={<MapPin size={20} />} title="Location" detail="Bhubaneswar, India" />
            </div>

            <div className="flex gap-4 mt-10">
              <SocialIcon icon={<Github size={20} />} href="https://github.com/sattwik742" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/sattwik2025" />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-zinc-400 text-sm font-medium ml-1">Full Name</label>
                <input 
                  id="name"
                  name="name"
                  required
                  placeholder="Sattwik Sinha Mahapatra"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-white/20 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-400 text-sm font-medium ml-1">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  name="email"
                  required
                  placeholder="sattwik@example.com"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-white/20 outline-none transition-all"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-400 text-sm font-medium ml-1">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="What's on your mind?"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-white/20 outline-none transition-all resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              <button 
                type="submit" 
                disabled={state.submitting}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {state.submitting ? <Loader2 className="animate-spin" size={20} /> : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-white">{icon}</div>
      <div>
        <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">{title}</p>
        <p className="text-white font-medium">{detail}</p>
      </div>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a href={href} target="_blank" className="p-3 bg-zinc-900 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-white/30 transition-all">
      {icon}
    </a>
  );
}