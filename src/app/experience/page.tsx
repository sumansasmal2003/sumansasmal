"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  {
    title: "Team Lead",
    organization: "IHSUK Tech",
    location: "Bareilly, India",
    date: "June 2025 - Present",
    type: "work",
    icon: Briefcase,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]",
    description: "Facilitated team meetings to clarify project goals and establish clear, achievable timelines. Coordinated daily tasks to enhance workflow efficiency and productivity. Mediated team conflicts through open discussions, fostering a collaborative and positive work environment."
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    organization: "College of Engineering and Management",
    location: "Kolaghat, India",
    date: "Graduated January 2025",
    type: "education",
    icon: GraduationCap,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-400/10",
    border: "border-fuchsia-400/30",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(232,121,249,0.3)]",
    description: "Built a comprehensive foundation in software engineering principles, algorithm design, and modern web architectures, translating academic theory into robust, scalable applications."
  },
  {
    title: "Diploma in Electrical Engineering",
    organization: "Contai Polytechnic",
    location: "Contai, India",
    date: "Graduated January 2022",
    type: "education",
    icon: Award,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.3)]",
    description: "Developed core engineering problem-solving skills and a deep understanding of electrical systems, laying the logical groundwork for transitioning into complex software development."
  }
];

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Header Entrance
    gsap.fromTo(".header-elem",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    );

    // 2. The Central Line Draw Animation
    gsap.fromTo(".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        }
      }
    );

    // 3. Staggered Item Reveals (Responsive)
    let mm = gsap.matchMedia();

    // DESKTOP: Slide in from alternating sides
    mm.add("(min-width: 1024px)", () => {
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
        const xOffset = i % 2 === 0 ? 100 : -100; // Alternating slide
        gsap.fromTo(item,
          { x: xOffset, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            }
          }
        );
      });

      // Animate the center nodes popping in
      gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((node) => {
        gsap.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: node,
              start: "top 75%",
            }
          }
        );
      });
    });

    // MOBILE/TABLET: Slide up vertically
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.timeline-node').forEach((node) => {
        gsap.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
            }
          }
        );
      });
    });

    return () => mm.revert();

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-charcoal-900 min-h-screen pt-32 pb-40 overflow-x-hidden">

      {/* Header Section */}
      <div className="px-6 max-w-7xl mx-auto mb-20 lg:mb-32">
        <Link href="/" className="header-elem inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="header-elem text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6">
          The Journey.
        </h1>
        <p className="header-elem max-w-2xl text-xl text-zinc-400 font-medium leading-relaxed">
          My professional timeline, bridging the gap between hardware engineering foundations and modern frontend leadership.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="timeline-container relative max-w-5xl mx-auto px-6">

        {/* The Central Line */}
        {/* Absolute positioning shifts it to the left on mobile, and perfectly centers it on desktop */}
        <div className="absolute left-[39px] lg:left-1/2 top-0 bottom-0 w-px bg-charcoal-700 lg:-translate-x-1/2 z-0">
          <div className="timeline-line w-full h-full bg-gradient-to-b from-cyan-500 via-fuchsia-500 to-emerald-500 origin-top opacity-50" />
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col gap-16 lg:gap-32 w-full">
          {timelineData.map((data, index) => {
            const Icon = data.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative flex flex-col lg:flex-row items-start lg:items-center w-full z-10">

                {/* The Floating Node (Icon) */}
                <div className={`timeline-node absolute left-[15px] lg:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-charcoal-900 border-2 ${data.border} shadow-lg z-20`}>
                  <Icon size={20} className={data.color} />
                </div>

                {/* Content Card Layout (Alternating on Desktop) */}
                <div className={`timeline-item group w-full lg:w-1/2 pl-20 lg:pl-0 ${isEven ? 'lg:pr-24 lg:text-right' : 'lg:pl-24 lg:ml-auto'}`}>

                  <div className={`p-8 rounded-3xl bg-charcoal-800/80 backdrop-blur-md border border-charcoal-700 transition-all duration-500 shadow-2xl ${data.glow} ${data.border}`}>

                    {/* Date Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${data.bg} border ${data.border} mb-6 ${isEven && 'lg:ml-auto'}`}>
                      <Calendar size={14} className={data.color} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${data.color}`}>
                        {data.date}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                      {data.title}
                    </h2>

                    <h3 className="text-lg text-zinc-400 font-medium mb-6">
                      {data.organization} <span className="opacity-50">|</span> {data.location}
                    </h3>

                    <p className="text-zinc-400 leading-relaxed text-base sm:text-lg">
                      {data.description}
                    </p>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
