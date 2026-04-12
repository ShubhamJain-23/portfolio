import { motion } from "framer-motion";
import { Award, ExternalLink, Image } from "lucide-react";
import certificatesData from "@/data/certificates.json";

const CertificatesSection = () => (
  <section id="certificates" className="py-20 px-4">
    <div className="container max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        <span className="text-primary font-mono text-lg block mb-2">05.</span>
        Certifications
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="text-terminal-yellow" size={24} />
              <span className={`text-xs font-mono px-2 py-1 rounded ${
                cert.type === "digital" ? "bg-terminal-green/10 text-terminal-green" : "bg-terminal-cyan/10 text-terminal-cyan"
              }`}>
                {cert.type === "digital" ? "Digital" : "Scanned"}
              </span>
            </div>

            {cert.imageUrl && (
              <div className="mb-4 rounded overflow-hidden border border-border">
                <img src={cert.imageUrl} alt={cert.title} className="w-full h-32 object-cover" />
              </div>
            )}

            {!cert.imageUrl && cert.type === "scanned" && (
              <div className="mb-4 h-32 rounded border border-dashed border-border flex items-center justify-center text-muted-foreground">
                <Image size={24} />
                <span className="ml-2 text-xs font-mono">Upload scan</span>
              </div>
            )}

            <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
            <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>

            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline font-mono"
              >
                Verify <ExternalLink size={12} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CertificatesSection;
