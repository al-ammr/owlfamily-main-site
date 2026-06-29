"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="w-full bg-[#C4622D] py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="font-display text-[clamp(32px,5vw,48px)] tracking-widest text-[#F5F0E8] uppercase leading-none mb-4 animate-fade-up">
          Join the OWL FAMILY
        </h2>
        <p className="font-serif italic text-[#F5F0E8] text-lg md:text-xl mb-10 opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
          Get exclusive updates, early access to drops, and style inspiration.
        </p>

        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-md relative flex items-center animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full bg-[#0D0D0D]/20 border border-[#F5F0E8]/30 text-[#F5F0E8] placeholder:text-[#F5F0E8]/60 px-6 py-4 outline-none font-mono text-sm focus:border-[#F5F0E8] transition-colors"
            disabled={status === "loading" || status === "success"}
          />
          <button 
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="absolute right-2 top-2 bottom-2 bg-[#F5F0E8] text-[#0D0D0D] px-6 font-mono text-xs uppercase tracking-widest hover:bg-[#E8E0D0] transition-colors flex items-center justify-center min-w-[100px]"
          >
            {status === "idle" && "Subscribe"}
            {status === "loading" && "..."}
            {status === "success" && "Done"}
          </button>
        </form>

        <p className="font-mono text-xs text-[#F5F0E8]/70 mt-6 tracking-widest uppercase animate-fade-up" style={{ animationDelay: "300ms" }}>
          We never spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
