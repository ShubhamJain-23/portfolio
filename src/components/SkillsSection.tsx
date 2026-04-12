import { motion } from "framer-motion";
import skillsData from "@/data/skills.json";

const SkillsSection = () => (
  <section id="skills" className="py-20 px-4 bg-secondary/20">
    <div className="container max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        <span className="text-primary font-mono text-lg block mb-2">02.</span>
        Skills
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {skillsData.categories.map((cat, ci) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.15 }}
            className="bg-card rounded-lg p-6 border border-border"
          >
            <h3 className="text-primary font-mono text-sm mb-6">{`// ${cat.name}`}</h3>
            <div className="space-y-4">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: ci * 0.1 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
