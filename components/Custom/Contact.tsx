"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, CheckCircle2, Loader2, Send, ArrowRight } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

interface ContactDetailProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
  href?: string;
}

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

export default function Contact() {
  const [state, handleSubmit] = useForm("xjgaaoeg");

  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 px-4 bg-black min-h-[800px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 text-center p-12 border border-emerald-500/20 rounded-[3rem] bg-zinc-900/40 backdrop-blur-3xl max-w-md w-full shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]"
        >
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <CheckCircle2 className="text-emerald-400" size={48} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter font-[family-name:var(--font-space-grotesk)]">
            Sent Successfully
          </h2>
          <p className="text-zinc-400 text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
            Your message has traveled through the ether. I'll get back to you shortly.
          </p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="mt-10 w-full py-4 text-emerald-400 border border-emerald-500/20 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-all font-bold tracking-tight"
          >
            Send another message
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-black scroll-mt-20 overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-purple-500/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for projects
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter font-[family-name:var(--font-space-grotesk)] leading-[0.9]">
                Let's make it <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-800">happen.</span>
              </h2>
              
              <p className="text-zinc-400 text-xl mb-12 max-w-md leading-relaxed font-[family-name:var(--font-outfit)]">
                Have an idea? Let's turn it into digital reality. I specialize in building high-performance web experiences.
              </p>

              <div className="space-y-6 mb-12">
                <ContactDetail 
                  icon={<Mail size={20} />} 
                  title="Direct Mail" 
                  detail="sattwik211@gmail.com" 
                  href="mailto:sattwik211@gmail.com" 
                />
                <ContactDetail 
                  icon={<MapPin size={20} />} 
                  title="Current Base" 
                  detail="Bhubaneswar, India" 
                />
              </div>

              <div className="flex gap-4">
                <SocialIcon icon={<Github size={22} />} href="https://github.com/sattwik742" />
                <SocialIcon icon={<Linkedin size={22} />} href="https://www.linkedin.com/in/sattwik2025" />
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Form Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-white/5 via-transparent to-white/5 rounded-[3rem] blur-2xl opacity-50" />
            
            <div className="relative bg-zinc-900/50 border border-white/10 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-zinc-400 text-xs font-bold uppercase tracking-widest ml-1">Name</label>
                    <input 
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:bg-white/10 focus:border-white/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-zinc-400 text-xs font-bold uppercase tracking-widest ml-1">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      name="email"
                      required
                      placeholder="hello@example.com"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:bg-white/10 focus:border-white/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-zinc-400 text-xs font-bold uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:bg-white/10 focus:border-white/20 outline-none transition-all resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400/80 text-xs mt-2 ml-1" />
                </div>

                <motion.button 
                  type="submit" 
                  disabled={state.submitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] group"
                >
                  {state.submitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({ icon, title, detail, href }: ContactDetailProps) {
  const content = (
    <div className="flex items-center gap-6 group">
      <div className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-white/5 rounded-2xl text-zinc-500 group-hover:text-white group-hover:border-white/20 group-hover:bg-zinc-800 transition-all duration-500 shadow-xl">
        {icon}
      </div>
      <div>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-black mb-1">{title}</p>
        <p className="text-zinc-200 text-lg font-medium group-hover:text-white transition-colors">{detail}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block w-fit">{content}</a>
  ) : (
    content
  );
}

function SocialIcon({ icon, href }: SocialIconProps) {
  return (
    <motion.a 
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-14 h-14 flex items-center justify-center bg-zinc-900/50 border border-white/5 rounded-2xl text-zinc-400 hover:text-white hover:border-white/20 hover:bg-zinc-800 transition-all shadow-lg backdrop-blur-md"
    >
      {icon}
    </motion.a>
  );
}