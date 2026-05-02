import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react"; // npm install lucide-react

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[80vh] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-charcoal-800 border border-charcoal-700 text-xs text-zinc-300 w-fit">
        <Terminal size={14} className="text-accent" />
        <span>Open to new opportunities</span>
      </div>

      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6">
        Hi, I'm Suman Sasmal. <br />
        <span className="text-zinc-500">I build dynamic web experiences.</span>
      </h1>

      <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed">
        I'm currently a Team Lead at IHSUK Tech, where I drive project success through effective coordination and modern frontend architectures. Proficient in ReactJS, Next.js, and TailwindCSS.
      </p>

      <div className="flex items-center gap-4">
        <Link
          href="/projects"
          className="flex items-center gap-2 bg-white text-charcoal-900 px-6 py-3 rounded-md font-medium hover:bg-zinc-200 transition-colors"
        >
          View My Work <ArrowRight size={18} />
        </Link>
        <a
          href="mailto:sasmalsuman04@gmail.com"
          className="px-6 py-3 rounded-md font-medium text-zinc-300 hover:text-white transition-colors"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
