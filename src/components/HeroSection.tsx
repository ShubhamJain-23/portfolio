import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Terminal from "./Terminal";
import profileData from "@/data/profile.json";

const roles = ["Full Stack Developer", "MERN Stack Developer", "Problem Solver", "Open Source Enthusiast"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <p className="text-primary font-mono text-sm mb-3">Hello, I'm</p>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-glow">
          {profileData.fullName}
        </h1>
        <div className="h-8 flex items-center justify-center">
          <span className="text-xl md:text-2xl font-mono text-terminal-cyan">
            {text}
            <span className="animate-blink text-primary">|</span>
          </span>
        </div>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          {profileData.tagline}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full flex justify-center relative z-10"
      >
        <Terminal />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-muted-foreground animate-bounce"
      >
        <span className="font-mono text-xs">scroll down ↓</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
