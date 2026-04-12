import { useState, useRef, useEffect, KeyboardEvent } from "react";
import profileData from "@/data/profile.json";

const SECTIONS: Record<string, { label: string; id: string }> = {
  about: { label: "About Me", id: "about" },
  skills: { label: "Skills", id: "skills" },
  projects: { label: "Projects", id: "projects" },
  education: { label: "Education & Experience", id: "education" },
  certificates: { label: "Certificates", id: "certificates" },
  leadership: { label: "Leadership", id: "leadership" },
  contact: { label: "Contact", id: "contact" },
};

interface Line {
  type: "input" | "output" | "error" | "success";
  text: string;
}

const Terminal = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `Welcome to ${profileData.name}'s Portfolio Terminal` },
    { type: "output", text: "" },
    { type: "output", text: "Available commands:" },
    { type: "success", text: "  goto <section>  — Navigate to a section" },
    { type: "success", text: "  sections        — List all sections" },
    { type: "success", text: "  whoami           — About me" },
    { type: "success", text: "  social           — Social links" },
    { type: "success", text: "  resume           — Download resume" },
    { type: "success", text: "  clear            — Clear terminal" },
    { type: "success", text: "  help             — Show this help" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [{ type: "input", text: `$ ${cmd}` }];

    if (trimmed === "help") {
      newLines.push(
        { type: "output", text: "Available commands:" },
        { type: "success", text: "  goto <section>  — Navigate to a section" },
        { type: "success", text: "  sections        — List all sections" },
        { type: "success", text: "  whoami           — About me" },
        { type: "success", text: "  social           — Social links" },
        { type: "success", text: "  resume           — Download resume" },
        { type: "success", text: "  clear            — Clear terminal" },
        { type: "success", text: "  help             — Show this help" }
      );
    } else if (trimmed === "clear") {
      setLines([]);
      setCurrentInput("");
      return;
    } else if (trimmed === "sections") {
      newLines.push({ type: "output", text: "Available sections:" });
      Object.entries(SECTIONS).forEach(([key, val]) => {
        newLines.push({ type: "success", text: `  ${key.padEnd(14)} → ${val.label}` });
      });
    } else if (trimmed === "whoami") {
      newLines.push(
        { type: "output", text: `Name: ${profileData.fullName}` },
        { type: "output", text: `Role: ${profileData.role}` },
        { type: "output", text: `Status: ${profileData.status}` },
        { type: "output", text: `Location: ${profileData.location}` }
      );
    } else if (trimmed === "social") {
      newLines.push({ type: "output", text: "Social Links:" });
      Object.entries(profileData.social).forEach(([platform, url]) => {
        newLines.push({ type: "success", text: `  ${platform.padEnd(12)} → ${url}` });
      });
    } else if (trimmed === "resume") {
      newLines.push({ type: "success", text: "Opening resume..." });
      window.open(profileData.resumeUrl, "_blank");
    } else if (trimmed.startsWith("goto ")) {
      const section = trimmed.replace("goto ", "").trim();
      if (SECTIONS[section]) {
        newLines.push({ type: "success", text: `Navigating to ${SECTIONS[section].label}...` });
        setTimeout(() => {
          document.getElementById(SECTIONS[section].id)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        newLines.push({ type: "error", text: `Section "${section}" not found. Type "sections" to see available sections.` });
      }
    } else if (trimmed === "") {
      // do nothing
    } else {
      newLines.push({ type: "error", text: `Command not found: ${cmd}. Type "help" for available commands.` });
    }

    setLines((prev) => [...prev, ...newLines]);
    setCurrentInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(currentInput);
    }
  };

  return (
    <div
      className="w-full max-w-2xl rounded-lg border border-terminal-border bg-terminal-bg overflow-hidden border-glow"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-border bg-secondary/50">
        <div className="w-3 h-3 rounded-full bg-terminal-red" />
        <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
        <div className="w-3 h-3 rounded-full bg-terminal-green" />
        <span className="ml-2 text-xs font-mono text-muted-foreground">shubham@portfolio:~</span>
      </div>

      {/* Terminal body */}
      <div ref={scrollRef} className="p-4 h-64 overflow-y-auto font-mono text-sm terminal-scanline scrollbar-thin">
        {lines.map((line, i) => (
          <div key={i} className={`leading-relaxed ${
            line.type === "input" ? "text-terminal-cyan" :
            line.type === "error" ? "text-terminal-red" :
            line.type === "success" ? "text-terminal-green" :
            "text-terminal-text"
          }`}>
            {line.text}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center text-terminal-text mt-1">
          <span className="text-terminal-green mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-terminal-cyan caret-terminal-green"
            autoFocus
            spellCheck={false}
          />
          <span className="w-2 h-4 bg-terminal-green animate-blink" />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
