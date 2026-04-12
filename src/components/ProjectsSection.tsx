import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import projectsData from "@/data/projects.json";

const ProjectsSection = () => (
  <section id="projects" className="py-20 px-4">
    <div className="container max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        <span className="text-primary font-mono text-lg block mb-2">03.</span>
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-primary font-mono text-2xl">📂</div>
              <div className="flex gap-3">
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Code2 size={18} />
                </a>
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {project.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-terminal-cyan">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
