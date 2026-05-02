"use client";

import { useRef } from "react";
import Link from "next/link";
import { Activity } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Added react-icons
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import VisitorCounter from "@/components/VisitorCounter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Visitor Count Animation
    if (countRef.current) {
      // NOTE: Replace '12485' with your actual state variable once connected to a database
      const targetCount = 12485;

      gsap.to(countRef.current, {
        innerHTML: targetCount,
        duration: 3,
        ease: "power4.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
        onUpdate: function () {
          if (countRef.current) {
            const currentNum = Math.ceil(Number(this.targets()[0].innerHTML));
            countRef.current.innerHTML = currentNum.toLocaleString();
          }
        },
      });
    }
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="w-full bg-charcoal-950 border-t border-charcoal-800 pt-16 pb-8 px-6 mt-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 relative z-10">

        {/* Brand & Socials */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-3xl font-black tracking-tighter text-white">
            SUMAN
          </Link>
          <div className="flex gap-4">
            <a href="https://github.com/sumansasmal2003" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-charcoal-900 border border-charcoal-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/suman-sasmal-492773244/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-charcoal-900 border border-charcoal-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex gap-12 sm:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Navigation</h4>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">Home</Link>
            <Link href="/projects" className="text-zinc-400 hover:text-white transition-colors text-sm">Projects</Link>
            <Link href="/experience" className="text-zinc-400 hover:text-white transition-colors text-sm">Experience</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <a href="mailto:sasmalsuman04@gmail.com" className="text-zinc-400 hover:text-white transition-colors text-sm">Email</a>
            <a href="tel:+919933012328" className="text-zinc-400 hover:text-white transition-colors text-sm">Phone</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Visitor Count */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-charcoal-800/50 relative z-10">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Suman Sasmal. All rights reserved.
        </p>

        {/* The Animated Visitor Counter */}
        <div className="mt-4 md:mt-0">
        <VisitorCounter />
      </div>
      </div>
    </footer>
  );
}
