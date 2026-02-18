import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Instagram, Github, Send } from "lucide-react";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:rudraksh.singh.v@gmail.com",
      icon: Mail,
      label: "rudraksh.singh.v@gmail.com",
      color: "hover:border-coral hover:text-coral",
      bgColor: "group-hover:bg-coral/10",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/rudraksh-v-singh",
      icon: Linkedin,
      label: "rudraksh-v-singh",
      color: "hover:border-indigo hover:text-indigo",
      bgColor: "group-hover:bg-indigo/10",
    },
    {
      name: "GitHub",
      href: "https://github.com/Rudrakshsingh07",
      icon: Github,
      label: "Rudrakshsingh07",
      color: "hover:border-foreground hover:text-foreground",
      bgColor: "group-hover:bg-foreground/10",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rudraksh_singh_v",
      icon: Instagram,
      label: "@rudraksh_singh_v",
      color: "hover:border-accent hover:text-accent",
      bgColor: "group-hover:bg-accent/10",
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-dots opacity-20" />

      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        style={{ scale }}
      >
        {/* Section header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-widest uppercase text-accent mb-4 font-body">
            05 — Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium mb-6">
            Let's <span className="text-indigo italic">Connect</span>
          </h2>
          
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-16 h-px bg-indigo" />
            <div className="w-3 h-3 rounded-full bg-indigo/50" />
            <div className="w-16 h-px bg-indigo" />
          </motion.div>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
          >
            Open to internship opportunities, collaborations, and conversations 
            about development, design, or applied AI.
          </motion.p>
        </motion.div>

        {/* Social links grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className={`group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border ${link.color} transition-all duration-300 hover:shadow-card`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className={`p-3 bg-secondary rounded-xl transition-colors ${link.bgColor}`}
                whileHover={{ rotate: 10 }}
              >
                <link.icon className="w-5 h-5" />
              </motion.div>
              <div className="text-left flex-1">
                <p className="text-xs text-muted-foreground mb-0.5 tracking-wide">{link.name}</p>
                <p className="text-foreground font-medium truncate">
                  {link.label}
                </p>
              </div>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 3 }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Decorative CTA */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="mailto:rudraksh.singh.v@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-coral text-white rounded-full font-medium shadow-glow hover:shadow-lg transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Say Hello</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Send className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;