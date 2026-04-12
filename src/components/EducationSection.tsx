import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import educationData from "@/data/education.json";

const allItems = [...educationData.education, ...educationData.experience].sort((a, b) => a.id - b.id);

const EducationSection = () => (
  <section id="education" className="py-20 px-4 bg-secondary/20">
    <div className="container max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        <span className="text-primary font-mono text-lg block mb-2">04.</span>
        Education & Experience
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

        {allItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative flex mb-8 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mt-6" />

            <div className={`ml-10 md:ml-0 md:w-5/12 bg-card border border-border rounded-lg p-5 ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
              <div className="flex items-center gap-2 mb-2">
                {item.type === "education" ? (
                  <GraduationCap size={16} className="text-terminal-cyan" />
                ) : (
                  <Briefcase size={16} className="text-terminal-yellow" />
                )}
                <span className="text-xs font-mono text-primary">{item.year}</span>
              </div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.institution}</p>
              <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EducationSection;
