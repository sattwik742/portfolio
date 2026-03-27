"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
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
      <section id="contact" className="py-24 px-4 bg-black min-h-[60vh] flex items-center justify-center font-space-grotesk">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 border border-white/10 rounded-none bg-zinc-950 max-w-md w-full"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-black" size={40} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter uppercase">
            Confirmed
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Your message has been received. Expect a response shortly.
          </p>
          <motion.button
            whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
            onClick={() => window.location.reload()}
            className="mt-10 w-full py-4 text-white border border-white transition-colors font-bold uppercase tracking-widest text-sm"
          >
            Send Another
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-black scroll-mt-20 font-space-grotesk">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Info */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-none">
                Get In Touch
              </h2>

              <p className="text-zinc-500 text-xl mb-12 max-w-md leading-relaxed">
                Let's build something monochrome and magnificent.
              </p>

              <div className="space-y-8 mb-12">
                <ContactDetail
                  icon={<Mail size={20} />}
                  title="Email"
                  detail="sattwik211@gmail.com"
                  href="mailto:sattwik211@gmail.com"
                />
                <ContactDetail
                  icon={<MapPin size={20} />}
                  title="Location"
                  detail="Bhubaneswar, India"
                />
              </div>

              <div className="flex gap-4">
                <SocialIcon icon={<Github size={22} />} href="https://github.com/sattwik742" />
                <SocialIcon icon={<Linkedin size={22} />} href="https://www.linkedin.com/in/sattwik2025" />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-zinc-950 border border-white/10 p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 gap-10">
                  <div className="relative group">
                    <label htmlFor="name" className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 block transition-colors group-focus-within:text-white">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="NAME"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-zinc-800 focus:border-white outline-none transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <label htmlFor="email" className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 block transition-colors group-focus-within:text-white">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="EMAIL@DOMAIN.COM"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-zinc-800 focus:border-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="message" className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 block transition-colors group-focus-within:text-white">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="DESCRIBE YOUR PROJECT"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-zinc-800 focus:border-white outline-none transition-all resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-2" />
                </div>

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-white text-black font-bold py-6 uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-zinc-200 transition-colors"
                >
                  {state.submitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight size={18} />
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
      <div className="w-12 h-12 flex items-center justify-center border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">{title}</p>
        <p className="text-white text-lg font-medium">{detail}</p>
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
      whileHover={{ y: -2 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:border-white transition-all"
    >
      {icon}
    </motion.a>
  );
}