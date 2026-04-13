import { motion } from "framer-motion";
import { MapPin, Briefcase, Mail } from "lucide-react";
import profileData from "@/data/profile.json";
import profilePhoto from "@/assets/shubham.jpg";

const AboutSection = () => (
  <section id="about" className="py-20 px-4">
    <div className="container max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        About Me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-64 h-64 mx-auto rounded-lg overflow-hidden border-2 border-primary/30 border-glow">
            <img src={profilePhoto} alt={profileData.fullName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-terminal-cyan">
              <MapPin size={16} /> <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2 text-terminal-green">
              <Briefcase size={16} /> <span>{profileData.status}</span>
            </div>
            <div className="flex items-center gap-2 text-terminal-yellow">
              <Mail size={16} /> <span>{profileData.email}</span>
            </div>
          </div>
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground font-mono text-sm rounded hover:opacity-90 transition-opacity"
          >
            Download CV
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
