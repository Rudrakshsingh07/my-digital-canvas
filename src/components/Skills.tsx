import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const programmingLanguages = [
    { name: "Python", level: 95 },
    { name: "Java", level: 80 },
    { name: "PHP", level: 65 },
    { name: "C++", level: 55 },
    { name: "JavaScript", level: 70 },
  ];

  const developmentSkills = [
    "Data structures & algorithms",
    "CLI tools & utilities",
    "Linux configuration & customization",
    "System-level scripting",
    "Web development basics",
  ];

  const aiMlSkills = [
    "Regression models",
    "Dataset preparation",
    "Transfer learning",
    "Fine-tuning LLMs",
    "ML deployment",
  ];

  const designMedia = [
    "UI/UX fundamentals",
    "Figma",
    "Canva",
    "Photo editing",
    "Video workflows",
  ];

  const tools = [
    { name: "Git", category: "vcs" },
    { name: "GitHub", category: "vcs" },
    { name: "Docker", category: "devops" },
    { name: "MySQL", category: "db" },
    { name: "Blender", category: "3d" },
    { name: "Adobe Suite", category: "design" },
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-card relative overflow-hidden"
    >
      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 pattern-diagonal opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-widest uppercase text-accent mb-4 font-body">
            02 — Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium">
            Technical <span className="text-sage italic">Skills</span>
          </h2>
          
          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-20 h-px bg-sage" />
            <div className="w-3 h-3 rounded-full bg-sage/50" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Programming Languages with bars */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-heading font-medium mb-6 pb-3 border-b border-border flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Languages
            </h3>
            <ul className="space-y-5">
              {programmingLanguages.map((lang, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-foreground font-medium">{lang.name}</span>
                    <span className="text-sm text-muted-foreground">{lang.level}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-gold rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Development Skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-heading font-medium mb-6 pb-3 border-b border-border flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-sage" />
              Development
            </h3>
            <ul className="space-y-3">
              {developmentSkills.map((skill, index) => (
                <motion.li 
                  key={index} 
                  className="text-foreground/80 flex items-center gap-3 group hover:text-foreground transition-smooth"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  whileHover={{ x: 8 }}
                >
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full bg-sage/50 group-hover:bg-sage transition-smooth"
                    whileHover={{ scale: 1.5 }}
                  />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* AI/ML Skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-heading font-medium mb-6 pb-3 border-b border-border flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-gold" />
              AI / Machine Learning
            </h3>
            <ul className="space-y-3">
              {aiMlSkills.map((skill, index) => (
                <motion.li 
                  key={index} 
                  className="text-foreground/80 flex items-center gap-3 group hover:text-foreground transition-smooth"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ x: 8 }}
                >
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-smooth"
                    whileHover={{ scale: 1.5 }}
                  />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Design & Media */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-heading font-medium mb-6 pb-3 border-b border-border flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-coral" />
              Design & Media
            </h3>
            <ul className="space-y-3">
              {designMedia.map((skill, index) => (
                <motion.li 
                  key={index} 
                  className="text-foreground/80 flex items-center gap-3 group hover:text-foreground transition-smooth"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  whileHover={{ x: 8 }}
                >
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full bg-coral/50 group-hover:bg-coral transition-smooth"
                    whileHover={{ scale: 1.5 }}
                  />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-heading font-medium mb-6 pb-3 border-b border-border flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo" />
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2.5 bg-background rounded-lg text-sm text-foreground/80 border border-border/50 hover:border-accent/50 hover:text-foreground hover:shadow-soft transition-smooth cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tool.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;