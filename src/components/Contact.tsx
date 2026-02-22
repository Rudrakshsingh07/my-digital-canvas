import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, Github, Send } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    { name: "Email", href: "mailto:rudraksh.singh.v@gmail.com", icon: Mail, label: "rudraksh.singh.v@gmail.com", color: "coral" },
    { name: "LinkedIn", href: "https://linkedin.com/in/rudraksh-v-singh", icon: Linkedin, label: "rudraksh-v-singh", color: "indigo" },
    { name: "GitHub", href: "https://github.com/Rudrakshsingh07", icon: Github, label: "Rudrakshsingh07", color: "chrome" },
    { name: "Instagram", href: "https://instagram.com/rudraksh_singh_v", icon: Instagram, label: "@rudraksh_singh_v", color: "sapphire" },
  ];

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 pattern-precision opacity-20" />

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[0.6rem] tracking-[0.35em] uppercase text-sapphire font-body mb-3">
            05 — Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-medium mb-5 text-embossed">
            Let's <span className="text-backlit italic">Connect</span>
          </h2>

          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="w-12 h-0.5 bg-indigo rounded-full" />
            <div className="indicator-sapphire" />
            <div className="w-12 h-0.5 bg-indigo rounded-full" />
          </motion.div>

          <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Open to internship opportunities, collaborations, and conversations
            about development, design, or applied AI.
          </p>
        </motion.div>

        {/* Social links — mechanical console buttons */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className="group surface-plate rounded-md flex items-center gap-3 p-4 hover:shadow-contact transition-mechanical"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="surface-recessed p-2.5 rounded-md">
                <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-sapphire transition-fast" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-[0.5rem] text-muted-foreground tracking-[0.2em] uppercase font-body">{link.name}</p>
                <p className="text-sm text-foreground/80 font-medium truncate group-hover:text-foreground transition-fast">
                  {link.label}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA — primary mechanical button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="mailto:rudraksh.singh.v@gmail.com"
            className="btn-sapphire inline-flex items-center gap-3 px-7 py-3.5 rounded-md text-xs tracking-[0.2em] uppercase font-medium"
          >
            <span>Say Hello</span>
            <Send className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
