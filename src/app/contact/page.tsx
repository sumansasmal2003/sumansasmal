"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Rocket, User, Mail, Code2, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { submitContactMessage } from "@/actions/contact";
import CustomDatePicker from "@/components/CustomDatePicker";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    tl.fromTo(".form-elem",
      { y: 20, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!selectedDate) {
      setError("Please select an estimated start date.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const res = await submitContactMessage(formData);

    if (res?.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else if (res?.success) {
      setIsSuccess(true);
      setIsSubmitting(false);

      gsap.to(".contact-form", { opacity: 0, scale: 0.95, duration: 0.4, display: "none" });
      gsap.fromTo(".success-message", { opacity: 0, scale: 0.8, display: "none" }, { opacity: 1, scale: 1, duration: 0.6, display: "flex", ease: "back.out(1.5)", delay: 0.2 });
    }
  }

  return (
    <div ref={containerRef} className="bg-charcoal-900 min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        <div className="mb-16">
          <Link href="/" className="header-elem inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="header-elem text-5xl sm:text-7xl font-black tracking-tighter text-white mb-6">
            Start a Project.
          </h1>
          <p className="header-elem text-xl text-zinc-400 font-medium leading-relaxed">
            Looking to engineer something new? Select your ideal timeline and tell me about the architecture or application you want to build.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form flex flex-col gap-6">

          {error && (
            <div className="form-elem p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium">
              {error}
            </div>
          )}

          <input
            type="hidden"
            name="projectDate"
            value={selectedDate ? selectedDate.toLocaleDateString('en-US') : ""}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div className="form-elem relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full bg-charcoal-800/50 border border-charcoal-700 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 focus:bg-charcoal-800 transition-all shadow-inner focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]"
              />
            </div>

            <div className="form-elem relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="w-full bg-charcoal-800/50 border border-charcoal-700 rounded-2xl py-4 pl-12 pr-6 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 focus:bg-charcoal-800 transition-all shadow-inner focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]"
              />
            </div>
          </div>

          {/* FIX: Added `relative z-50` to force the calendar to stack ON TOP of the textarea and button! */}
          <div className="form-elem relative z-50">
            <CustomDatePicker
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>

          {/* FIX: Forced lower z-index so the calendar drops over it properly */}
          <div className="form-elem relative group z-10">
            <Code2 className="absolute left-4 top-6 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
            <textarea
              name="message"
              required
              placeholder="Tell me about the project, your tech stack preferences, or the problems you are trying to solve..."
              rows={6}
              className="w-full bg-charcoal-800/50 border border-charcoal-700 rounded-2xl py-5 pl-12 pr-6 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 focus:bg-charcoal-800 transition-all shadow-inner resize-none focus:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]"
            />
          </div>

          {/* FIX: Redesigned the button with a premium gradient and clear text color to solve the white-on-white issue */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-elem relative z-0 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none w-full sm:w-auto sm:self-start mt-2"
          >
            {isSubmitting ? "Initializing Sequence..." : "Submit Project Inquiry"}
            {!isSubmitting && <Rocket size={18} />}
          </button>
        </form>

        <div className="success-message hidden flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]">
            <CheckCircle2 className="text-cyan-400" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Inquiry Received.</h2>
          <p className="text-zinc-400 text-lg">Thank you for reaching out. I'll review your project details and timeline, and get back to you shortly to discuss next steps.</p>
        </div>

      </div>
    </div>
  );
}
