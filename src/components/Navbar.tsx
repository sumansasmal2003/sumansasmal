import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-charcoal-800 bg-charcoal-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-6">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white">
          SS.
        </Link>
        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/experience" className="hover:text-white transition-colors">Experience</Link>
        </div>
      </div>
    </nav>
  );
}
