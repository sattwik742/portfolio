import Navbar from "@/components/Custom/Navbar";
import Hero from "@/components/Custom/Hero";
import Education from "@/components/Custom/Education";
import Skills from "@/components/Custom/Skills";
import Certificates from "@/components/Custom/Certificates";
import Projects from "@/components/Custom/Project";
import Footer from "@/components/Custom/Footer";
import Contact from "@/components/Custom/Contact";


export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Education />
      <Skills />
      <Certificates />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}