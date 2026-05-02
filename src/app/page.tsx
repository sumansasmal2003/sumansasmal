"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Code2, Users, Layers, Camera, Leaf } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroParticles from "@/components/HeroParticles";
import LeadershipParticles from "@/components/LeadershipParticles";
import SweetAIParticles from "@/components/SweetAIParticles";
import EnglishMasteryParticles from "@/components/EnglishMasteryParticles";
import TechArsenalParticles from "@/components/TechArsenalParticles";
import CameraParticles from "@/components/CameraParticles";
import LeafParticles from "@/components/LeafParticles";
import FooterParticles from "@/components/FooterParticles";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Hero Animations
    tl.fromTo(".hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 });
    tl.fromTo(".hero-text-line", { y: "110%", rotate: 2 }, { y: "0%", rotate: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }, "-=0.4");
    tl.fromTo([".hero-desc", ".hero-btns"], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }, "-=0.8");

    // Scroll-Triggered Section Headers
    gsap.utils.toArray<HTMLElement>(".section-header").forEach((header) => {
      gsap.fromTo(header,
        { y: "110%" },
        { y: "0%", duration: 1, ease: "power4.out", scrollTrigger: { trigger: header.parentElement, start: "top 85%" } }
      );
    });

    // Staggered Cards (Skills & Projects)
    gsap.utils.toArray<HTMLElement>(".stagger-grid").forEach((grid) => {
      gsap.fromTo(grid.children,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 85%" } }
      );
    });

    // Grand Footer Parallax
    gsap.fromTo(".footer-text",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: ".grand-footer", start: "top 90%", scrub: 1 } }
    );

  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col w-full overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100vh] flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24 pb-12 w-full">
        <HeroParticles />
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-charcoal-800 border border-charcoal-700 text-xs sm:text-sm text-zinc-300 w-fit shadow-lg shadow-black/20">
          <Terminal size={14} className="text-accent" />
          <span>Available for new opportunities</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] font-bold tracking-tighter text-white mb-6 leading-[1.05] sm:leading-[1.1]">
          <div className="overflow-hidden py-1"><div className="hero-text-line">Hi, I'm Suman.</div></div>
          <div className="overflow-hidden py-1"><div className="hero-text-line text-zinc-500">I engineer web</div></div>
          <div className="overflow-hidden py-1"><div className="hero-text-line text-zinc-500">experiences.</div></div>
        </h1>

        <p className="hero-desc max-w-2xl text-base sm:text-xl text-zinc-400 mb-10 leading-relaxed font-medium">
          I'm currently a Team Lead at IHSUK Tech, driving project success through effective coordination and modern frontend architectures.
        </p>

        <div className="hero-btns flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Link href="/projects" className="flex w-full sm:w-auto justify-center items-center gap-2 bg-white text-charcoal-900 px-8 py-4 rounded-full font-bold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-300">
            View My Work <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="w-full sm:w-auto text-center px-8 py-4 rounded-full font-bold text-zinc-300 border border-charcoal-700 hover:bg-charcoal-800 hover:text-white transition-all duration-300">
            Contact Me
          </Link>
        </div>
      </section>

      {/* 2. ABOUT & LEADERSHIP SECTION */}
      <section className="relative overflow-hidden py-24 sm:py-32 px-6 bg-charcoal-800/20 border-y border-charcoal-800">
        <LeadershipParticles />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="overflow-hidden pb-2 mb-6">
              <h2 className="section-header text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Leadership &<br/>Execution.</h2>
            </div>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6 font-medium">
              With a B.Tech in Computer Science from the College of Engineering and Management, my foundation is built on solid engineering principles.
            </p>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-medium">
              As a Team Lead, I specialize in mediating team conflicts, establishing achievable timelines, and fostering a collaborative environment to hit milestones efficiently.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-8 lg:pt-12">
            <div className="flex gap-5 items-start p-6 rounded-2xl bg-charcoal-800/50 border border-charcoal-700/50 hover:bg-charcoal-800 transition-colors">
              <div className="bg-charcoal-900 p-4 rounded-xl shadow-inner border border-charcoal-700">
                <Users className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Team Lead @ IHSUK Tech</h3>
                <p className="text-zinc-400 font-medium">June 2025 - Present</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORK SECTION */}
      <section className="py-24 sm:py-40 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
          <div className="p-3 bg-charcoal-800 rounded-xl border border-charcoal-700">
            <Layers className="text-accent" size={32} />
          </div>
          <div className="overflow-hidden py-2">
            <h2 className="section-header text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">Recent Innovations</h2>
          </div>
        </div>

        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sweet AI */}
          <a href="https://sweetaiofficial.vercel.app/" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden block p-8 rounded-3xl bg-gradient-to-br from-charcoal-800 to-charcoal-900 border border-charcoal-700 hover:border-accent/50 transition-all group">

            {/* INJECT THE SWEET AI PARTICLES HERE */}
            <SweetAIParticles />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-white drop-shadow-md">Sweet AI</h3>
                <ArrowRight className="text-zinc-400 group-hover:text-fuchsia-400 -rotate-45 transition-colors drop-shadow-md" size={28} />
              </div>
              <p className="text-zinc-300 text-lg mb-8 leading-relaxed font-medium drop-shadow-md">
                An intelligent, modern AI application designed to provide seamless workflows and powerful generative capabilities.
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-4 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-sm border border-charcoal-700 text-sm font-medium text-zinc-300">Next.js</span>
                <span className="px-4 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-sm border border-charcoal-700 text-sm font-medium text-zinc-300">Self made AI using Python</span>
              </div>
            </div>
          </a>

          {/* English Mastery Pro */}
          <a href="https://englishmasterypro.vercel.app" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden block p-8 rounded-3xl bg-gradient-to-br from-charcoal-800 to-charcoal-900 border border-charcoal-700 hover:border-accent/50 transition-all group">

            {/* INJECT THE ENGLISH MASTERY PARTICLES HERE */}
            <EnglishMasteryParticles />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-white drop-shadow-md">English Mastery</h3>
                <ArrowRight className="text-zinc-400 group-hover:text-emerald-400 -rotate-45 transition-colors drop-shadow-md" size={28} />
              </div>
              <p className="text-zinc-300 text-lg mb-8 leading-relaxed font-medium drop-shadow-md">
                An interactive platform for learning English, featuring class-wise textual study, grammar lessons, and AI integration for real-time practice.
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-4 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-sm border border-charcoal-700 text-sm font-medium text-zinc-300">React</span>
                <span className="px-4 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-sm border border-charcoal-700 text-sm font-medium text-zinc-300">AI Integration</span>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/projects" className="text-zinc-400 hover:text-white font-semibold flex items-center gap-2 transition-colors">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4. TECHNICAL ARSENAL */}
      <section className="relative overflow-hidden py-24 px-6 bg-charcoal-800/20 border-y border-charcoal-800">

        {/* INJECT THE ATOMIC PARTICLES HERE */}
        <TechArsenalParticles />

        <div className="relative z-10 max-w-6xl mx-auto pointer-events-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16 pointer-events-auto w-fit">
            <div className="p-3 bg-charcoal-800 rounded-xl border border-charcoal-700 shadow-xl">
              <Code2 className="text-accent" size={32} />
            </div>
            <div className="overflow-hidden py-2">
              <h2 className="section-header text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">Technical Arsenal</h2>
            </div>
          </div>

          <div className="stagger-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pointer-events-auto">
            <div className="p-8 rounded-3xl bg-charcoal-800/80 backdrop-blur-sm border border-charcoal-700 hover:bg-charcoal-800 hover:border-zinc-500 transition-colors group shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors drop-shadow-md">Frontend Mastery</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">Deep expertise in building highly interactive interfaces using <span className="text-white">ReactJS, Next.js, and TailwindCSS</span>.</p>
            </div>
            <div className="p-8 rounded-3xl bg-charcoal-800/80 backdrop-blur-sm border border-charcoal-700 hover:bg-charcoal-800 hover:border-zinc-500 transition-colors group shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors drop-shadow-md">Backend Capabilities</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">Proficiency in <span className="text-white">Node.js</span> and <span className="text-white">MongoDB</span> for server-side logic and API integrations.</p>
            </div>
            <div className="p-8 rounded-3xl bg-charcoal-800/80 backdrop-blur-sm border border-charcoal-700 hover:bg-charcoal-800 hover:border-zinc-500 transition-colors group shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors drop-shadow-md">Core Stack</h3>
              <p className="text-zinc-400 leading-relaxed text-lg">Strong foundation in <span className="text-white">JavaScript, HTML5, CSS3</span>, with knowledge of Java and Python.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEYOND THE TERMINAL */}
      <section className="py-24 sm:py-40 px-6 max-w-6xl mx-auto">
        <div className="overflow-hidden py-2 mb-16 text-center">
          <h2 className="section-header text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">Beyond the Terminal</h2>
          <p className="text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">What fuels my creativity when I step away from the keyboard.</p>
        </div>

        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Photography Card */}
          <div className="relative overflow-hidden flex gap-6 items-start p-8 rounded-3xl bg-charcoal-800/40 border border-charcoal-700 hover:border-zinc-500 transition-colors group">
            <CameraParticles />
            <div className="relative z-10 flex gap-6 w-full pointer-events-none">
              <Camera className="text-zinc-400 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">Composition & Frame</h3>
                <p className="text-zinc-400 text-lg leading-relaxed drop-shadow-md">Translating an eye for UI/UX into the physical world through self-portrait photography and visual documentation.</p>
              </div>
            </div>
          </div>

          {/* Gardening Card */}
          <div className="relative overflow-hidden flex gap-6 items-start p-8 rounded-3xl bg-charcoal-800/40 border border-charcoal-700 hover:border-zinc-500 transition-colors group">
            <LeafParticles />
            <div className="relative z-10 flex gap-6 w-full pointer-events-none">
              <Leaf className="text-zinc-400 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">Cultivating Patience</h3>
                <p className="text-zinc-400 text-lg leading-relaxed drop-shadow-md">Finding focus and tranquility offline through gardening, specifically cultivating diverse rose and hibiscus varieties.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. GRAND FOOTER */}
      <section className="grand-footer relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-charcoal-950 border-t border-charcoal-800 px-6 py-20">

        {/* Massive Background Dev Particles */}
        <FooterParticles />

        <h2 className="footer-text relative z-10 text-[12vw] sm:text-[10vw] font-black tracking-tighter text-white select-none text-center leading-none mb-12 mix-blend-overlay opacity-80 pointer-events-none">
          LET'S BUILD
        </h2>

        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <p className="text-xl sm:text-2xl text-zinc-300 font-medium mb-8 text-center max-w-lg">
            Ready to architect something exceptional together?
          </p>
          {/* Re-enable pointer events just for the button */}
          <Link
            href='/contact'
            className="pointer-events-auto bg-charcoal-800 text-white border border-charcoal-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-charcoal-700 hover:border-cyan-400 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start a Conversation
          </Link>
        </div>
      </section>

    </div>
  );
}
