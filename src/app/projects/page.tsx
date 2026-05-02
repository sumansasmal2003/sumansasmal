"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Sweet AI",
    year: "2026",
    role: "Full Stack Engineer",
    description: "An intelligent, modern AI application designed to provide seamless workflows and powerful generative capabilities.",
    tech: ["Next.js", "Python", "OpenAI"],
    link: "https://sweetaiofficial.vercel.app/",
    accent: "text-fuchsia-400",
    bgAccent: "group-hover:bg-fuchsia-400/10",
    borderAccent: "group-hover:border-fuchsia-400/50"
  },
  {
    title: "English Mastery",
    year: "2026",
    role: "Frontend Architect",
    description: "Interactive platform featuring class-wise textual study, grammar lessons, and AI integration for real-time practice.",
    tech: ["React", "AI Integration", "Vercel"],
    link: "https://englishmasterypro.vercel.app",
    accent: "text-emerald-400",
    bgAccent: "group-hover:bg-emerald-400/10",
    borderAccent: "group-hover:border-emerald-400/50"
  },
  {
    title: "Rythmiq",
    year: "2026",
    role: "Frontend Developer",
    description: "A modern web application for streaming and discovering music, entirely implemented using Next.js.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://rythmiqog.vercel.app",
    accent: "text-orange-400",
    bgAccent: "group-hover:bg-orange-400/10",
    borderAccent: "group-hover:border-orange-400/50"
  },
  {
    title: "FloriculturePro",
    year: "2024-2025",
    role: "Full Stack Developer",
    description: "An exploration platform for flower cultivation techniques featuring a real-time Firebase database for storing details.",
    tech: ["ReactJS", "Firebase", "JSX"],
    link: "https://floriculturepro.netlify.app",
    accent: "text-green-400",
    bgAccent: "group-hover:bg-green-400/10",
    borderAccent: "group-hover:border-green-400/50"
  },
  {
    title: "BookMyDoctor",
    year: "2025-2026",
    role: "UI Engineer",
    description: "A modern and professional UI for an online doctor booking platform with highly responsive styling and interactive components.",
    tech: ["ReactJS", "TailwindCSS", "Vite"],
    link: "https://book-my-doctor.netlify.app",
    accent: "text-indigo-400",
    bgAccent: "group-hover:bg-indigo-400/10",
    borderAccent: "group-hover:border-indigo-400/50"
  }
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Entrance
    gsap.fromTo(".header-elem",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    );

    // Scroll Animations for each project row
    gsap.utils.toArray<HTMLElement>('.project-row').forEach((row) => {

      // Animate the divider line expanding
      const divider = row.querySelector('.project-divider');
      if (divider) {
        gsap.fromTo(divider,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            }
          }
        );
      }

      // Animate the content fading and sliding up
      const content = row.querySelectorAll('.reveal-elem');
      gsap.fromTo(content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-charcoal-900 min-h-screen pt-32 pb-40 overflow-x-hidden">

      {/* Header Section */}
      <div className="px-6 max-w-7xl mx-auto mb-20 lg:mb-32">
        <Link href="/" className="header-elem inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="header-elem text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6">
          The Archive.
        </h1>
        <p className="header-elem max-w-2xl text-xl text-zinc-400 font-medium leading-relaxed">
          A curated selection of applications, platforms, and digital experiences I've engineered over the years.
        </p>
      </div>

      {/* Editorial Split Layout Grid */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col w-full">
        {projects.map((project, index) => (
          <div key={index} className="project-row flex flex-col w-full group">

            {/* The Animated Divider Line */}
            <div className="project-divider w-full h-px bg-charcoal-700" />

            <div className="flex flex-col lg:flex-row py-16 sm:py-24 gap-12 lg:gap-24">

              {/* Left Side: Number & Title (35% width) */}
              <div className="lg:w-[35%] flex flex-col shrink-0">
                <div className="reveal-elem flex items-baseline gap-4 mb-4">
                  <span className="text-zinc-600 font-black text-2xl sm:text-3xl tracking-tighter">0{index + 1}</span>
                  <span className={`text-sm font-bold tracking-widest uppercase ${project.accent}`}>
                    {project.year}
                  </span>
                </div>
                <h2 className="reveal-elem text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                  {project.title}
                </h2>
              </div>

              {/* Right Side: Details & Action (65% width) */}
              <div className="lg:w-[65%] flex flex-col justify-center">

                {/* Role Header */}
                <div className="reveal-elem mb-8">
                  <span className="text-zinc-500 font-semibold mb-2 block tracking-wide text-sm uppercase">Role</span>
                  <p className="text-white text-xl sm:text-2xl font-medium">{project.role}</p>
                </div>

                {/* Description */}
                <p className="reveal-elem text-xl text-zinc-400 leading-relaxed font-medium mb-12 max-w-2xl">
                  {project.description}
                </p>

                {/* Tech & Button Row */}
                <div className="reveal-elem flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-8 border-t border-charcoal-800">

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Code2 size={20} className="text-zinc-500 mr-2 hidden sm:block" />
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-4 py-2 rounded-full bg-charcoal-800 border border-charcoal-700 text-sm font-medium text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Live Demo Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-8 py-4 rounded-full border border-charcoal-600 text-white font-bold transition-all duration-300 whitespace-nowrap shadow-lg ${project.bgAccent} ${project.borderAccent}`}
                  >
                    Live Demo <ExternalLink size={18} />
                  </a>

                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Final Bottom Border */}
        <div className="w-full h-px bg-charcoal-700" />
      </div>

    </div>
  );
}
