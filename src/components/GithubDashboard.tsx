"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaCodeCommit, FaCode } from "react-icons/fa6";
import { Activity } from "lucide-react";
import { getGithubStats } from "@/actions/github";

export default function GithubDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getGithubStats().then(setStats);
  }, []);

  if (!stats) return null;

  const calendar = stats.contributionsCollection.contributionCalendar;
  const latestRepo = stats.recentEvents.nodes[0];
  const latestCommit = latestRepo?.refs?.nodes[0]?.target?.history?.nodes[0];

  const langMap: any = {};

  stats.repositories.nodes.forEach((repo: any) => {
    repo.languages.edges.forEach((edge: any) => {
      langMap[edge.node.name] = (langMap[edge.node.name] || 0) + edge.size;
    });
  });

  const topLangs = Object.entries(langMap)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 3);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <FaGithub className="text-cyan-400" size={32} />
          <h2 className="text-4xl font-bold text-white tracking-tighter">
            Code Activity.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Latest Commit Card */}
          <div className="lg:col-span-1 p-8 rounded-3xl bg-charcoal-800/50 border border-charcoal-700 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 mb-6 font-bold uppercase text-xs tracking-widest">
              <FaCodeCommit size={16} /> Latest Push
            </div>
            {latestCommit ? (
              <>
                <h3 className="text-xl font-bold text-white mb-2 truncate">
                  {latestRepo.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 italic line-clamp-2">
                  &ldquo;{latestCommit.message}&rdquo;
                </p>
                <div className="text-xs text-zinc-500 font-medium">
                  {new Date(latestCommit.committedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </>
            ) : (
              <p className="text-zinc-500 italic">No recent commits found.</p>
            )}
          </div>

          {/* Top Languages Card */}
          <div className="lg:col-span-1 p-8 rounded-3xl bg-charcoal-800/50 border border-charcoal-700 backdrop-blur-md">
            <div className="flex items-center gap-2 text-fuchsia-400 mb-6 font-bold uppercase text-xs tracking-widest">
              <FaCode size={16} /> Tech Mix
            </div>
            <div className="flex flex-col gap-4">
              {topLangs.map(([name]: any) => (
                <div key={name} className="flex items-center justify-between group">
                  <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">{name}</span>
                  <div className="h-1.5 w-24 bg-charcoal-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[70%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Overview Card (Expanded from just Contributions) */}
          <div className="lg:col-span-1 p-8 rounded-3xl bg-charcoal-800/50 border border-charcoal-700 backdrop-blur-md flex flex-col justify-center">
            <div className="flex items-center gap-2 text-emerald-400 mb-6 font-bold uppercase text-xs tracking-widest">
              <Activity size={16} /> Overview
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white mb-1">{calendar.totalContributions}</span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Commits</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white mb-1">{stats.repositories.totalCount}</span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Repos</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-3xl font-black text-white mb-1">{stats.followers.totalCount}</span>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Followers</span>
              </div>
            </div>
          </div>

          {/* Perfected Heatmap Visualization */}
          <div className="lg:col-span-3 p-8 rounded-3xl bg-charcoal-800/50 border border-charcoal-700 overflow-hidden relative">
            <div className="overflow-x-auto pb-4 pt-8 scrollbar-hide flex gap-1">

              {/* Left Axis: Day Labels */}
              <div className="flex flex-col gap-1 text-[10px] text-zinc-500 font-medium pr-2">
                <div className="h-3"></div> {/* Sun */}
                <div className="h-3 leading-3 flex items-center">Mon</div>
                <div className="h-3"></div> {/* Tue */}
                <div className="h-3 leading-3 flex items-center">Wed</div>
                <div className="h-3"></div> {/* Thu */}
                <div className="h-3 leading-3 flex items-center">Fri</div>
                <div className="h-3"></div> {/* Sat */}
              </div>

              {/* Heatmap Grid */}
              <div className="flex gap-1">
                {calendar.weeks.map((week: any, i: number) => {
                  const firstDayDate = new Date(week.contributionDays[0].date);
                  const monthName = firstDayDate.toLocaleString("default", { month: "short" });

                  // Determine if we should show the month label above this column
                  const prevFirstDay = i > 0 ? new Date(calendar.weeks[i - 1].contributionDays[0].date) : null;
                  const prevMonthName = prevFirstDay ? prevFirstDay.toLocaleString("default", { month: "short" }) : null;
                  const showMonth = i === 0 || monthName !== prevMonthName;

                  // If the year starts mid-week, we need to push the first week down to align days correctly
                  // h-3 (12px) + gap-1 (4px) = 16px offset per day
                  const isFirstWeek = i === 0;
                  const dayOfWeek = firstDayDate.getDay();
                  const marginTop = isFirstWeek ? `${dayOfWeek * 16}px` : "0px";

                  return (
                    <div key={i} className="flex flex-col gap-1 relative min-w-[12px]">
                      {/* Top Axis: Month Label */}
                      {showMonth && (
                        <div className="absolute -top-6 left-0 text-[10px] text-zinc-400 font-bold tracking-wider">
                          {monthName}
                        </div>
                      )}

                      <div style={{ marginTop }} className="flex flex-col gap-1">
                        {week.contributionDays.map((day: any, j: number) => {

                          // Custom Cyan Theme Scale based on contribution density
                          let bgColor = "#27272a"; // charcoal-800
                          if (day.contributionCount > 0 && day.contributionCount <= 2) bgColor = "#083344"; // cyan-950
                          else if (day.contributionCount > 2 && day.contributionCount <= 5) bgColor = "#0e7490"; // cyan-700
                          else if (day.contributionCount > 5 && day.contributionCount <= 8) bgColor = "#06b6d4"; // cyan-500
                          else if (day.contributionCount > 8) bgColor = "#22d3ee"; // cyan-400

                          return (
                            <div
                              key={j}
                              className="w-3 h-3 rounded-[2px] transition-all hover:ring-1 hover:ring-zinc-300 z-10"
                              style={{ backgroundColor: bgColor }}
                              title={`${day.contributionCount} commits on ${new Date(day.date).toDateString()}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Live GitHub Archive for {process.env.GITHUB_USERNAME || "SumanSasmal"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
