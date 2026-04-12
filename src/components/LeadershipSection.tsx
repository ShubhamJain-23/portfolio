import { motion } from "framer-motion";
import { Users } from "lucide-react";
import leadershipData from "@/data/leadership.json";

const LeadershipSection = () => (
  <section id="leadership" className="py-20 px-4 bg-secondary/20">
    <div className="container max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        <span className="text-primary font-mono text-lg block mb-2">06.</span>
        Leadership
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {leadershipData.leadership.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <Users className="text-terminal-purple mb-3" size={24} />
            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-xs font-mono text-primary mb-3">{item.period}</p>
            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.highlights.map((h) => (
                <span key={h} className="text-xs px-2 py-1 rounded bg-secondary text-terminal-green font-mono">
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LeadershipSection;
