import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-charcoal-800 bg-charcoal-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          SUMAN
        </Link>
        {/* Hidden on very small screens, scrolls or wraps otherwise */}
        <div className="hidden sm:flex gap-8 text-sm font-semibold text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/experience" className="hover:text-white transition-colors">Experience</Link>
        </div>
      </div>
    </nav>
  );
}
