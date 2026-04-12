import { ExternalLink, Mail } from "lucide-react";
import profileData from "@/data/profile.json";

const Footer = () => (
  <footer className="py-8 px-4 border-t border-border">
    <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground font-mono">
        © {new Date().getFullYear()} {profileData.fullName}. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href={profileData.social.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <ExternalLink size={18} />
        </a>
        <a href={profileData.social.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <ExternalLink size={18} />
        </a>
        <a href={`mailto:${profileData.email}`} className="text-muted-foreground hover:text-primary transition-colors">
          <Mail size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
