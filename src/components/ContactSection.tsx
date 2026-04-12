import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
      setTimeout(() => setStatus("idle"), 3000);
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-primary font-mono text-lg block mb-2">07.</span>
          Get In Touch
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {status === "error" && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
              Message sent successfully! Thanks for reaching out.
            </div>
          )}

          <input
            type="text"
            placeholder="Name"
            required
            disabled={loading}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono text-sm disabled:opacity-50"
          />
          <input
            type="email"
            placeholder="Email"
            required
            disabled={loading}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono text-sm disabled:opacity-50"
          />
          <textarea
            placeholder="Message"
            required
            disabled={loading}
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono text-sm resize-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {loading ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
