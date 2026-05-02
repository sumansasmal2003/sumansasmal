import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "BookMyDoctor",
    description: "A modern and professional UI for an online doctor booking platform with highly responsive styling and interactive components[cite: 1].",
    tech: ["ReactJS", "JSX", "TailwindCSS"],
    link: "https://book-my-doctor.netlify.app",
  },
  {
    title: "FloriculturePro",
    description: "An exploration platform for flower cultivation techniques featuring a real-time Firebase database for storing and retrieving details[cite: 1].",
    tech: ["ReactJS", "Firebase", "TailwindCSS"],
    link: "https://floriculturepro.netlify.app",
  },
  {
    title: "English Mastery",
    description: "An interactive platform for learning English, featuring class-wise textual study, grammar lessons, and AI integration for real-time practice[cite: 1].",
    tech: ["Next.js", "AI Integration", "Tailwind"],
    link: "https://englishmasterypro.vercel.app",
  },
  {
    title: "Rythmiq",
    description: "A modern web application for listening to music, entirely implemented using Next.js[cite: 1].",
    tech: ["Next.js", "React", "TypeScript"],
    link: "https://rythmiqog.vercel.app",
  }
];

export default function Projects() {
  return (
    <div className="py-12 animate-in fade-in duration-700">
      <h2 className="text-3xl font-bold text-white mb-2">Selected Projects</h2>
      <p className="text-zinc-400 mb-10">A showcase of my recent frontend and full-stack development work.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group flex flex-col justify-between p-6 rounded-xl bg-charcoal-800 border border-charcoal-700 hover:border-zinc-500 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white">
                  <ExternalLink size={20} />
                </a>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-charcoal-900 text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
