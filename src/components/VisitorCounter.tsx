"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getVisitorCount, incrementVisitorCount } from "@/actions/visitor";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const initCounter = async () => {
      // 1. STRICT DOMAIN CHECK
      const isProduction = window.location.hostname === "sumansasmal.vercel.app";

      if (isProduction) {
        // 2. CHECK LOCAL STORAGE FOR DEDUPLICATION
        const hasVisited = localStorage.getItem("hasVisited");

        if (!hasVisited) {
          // New visitor on production -> Increment
          const newCount = await incrementVisitorCount();
          setCount(newCount);
          localStorage.setItem("hasVisited", "true");
        } else {
          // Returning visitor on production -> Just fetch the current count
          const currentCount = await getVisitorCount();
          setCount(currentCount);
        }
      } else {
        // Localhost or Preview Deployments -> Just fetch, DO NOT increment
        const currentCount = await getVisitorCount();
        setCount(currentCount);
      }
    };

    initCounter();
  }, []);

  // Prevent hydration mismatch and hide component until count loads
  if (count === null) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-charcoal-900 border border-charcoal-800 text-zinc-400 text-sm font-medium shadow-inner transition-colors hover:border-charcoal-700">
      <div className="relative flex items-center justify-center">
        {/* Glowing dot effect behind the icon */}
        <div className="absolute w-3 h-3 bg-cyan-400 rounded-full blur-[6px] opacity-60 animate-pulse" />
        <Users size={16} className="text-cyan-400 relative z-10" />
      </div>
      <span>
        <span className="text-white font-bold tracking-wide">{count.toLocaleString()}</span> Total Visitors
      </span>
    </div>
  );
}
