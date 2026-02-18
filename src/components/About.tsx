import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const interests = [
    { text: "Programming & logic development", icon: "⚡" },
    { text: "Unix/Linux systems & customization", icon: "🐧" },
    { text: "Application & product development", icon: "🚀" },
    { text: "UI/UX design as engineering skill", icon: "🎨" },
    { text: "Machine learning & applied AI", icon: "🤖" },
    { text: "Photo & video editing", icon: "📸" },
  ];

  const currentlyExploring = [
    "Linux customization & config workflows",
    "Building ML/LLM-based systems",
    "CLI-first tooling & utilities",
    "Interface usability & structure",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        style={{ opacity }}
      >
        {/* Section header */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-sm tracking-widest uppercase text-accent mb-4 font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            01 — Introduction
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium">
            About <span className="text-accent italic">Me</span>
          </h2>
          
          {/* Decorative underline */}
          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="w-20 h-px bg-accent" />
            <div className="w-3 h-3 rounded-full bg-accent/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Main description */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.p 
              className="text-lg md:text-xl leading-relaxed text-foreground/80"
              variants={itemVariants}
            >
              I am a Computer Engineering diploma student exploring multiple domains 
              including <span className="text-accent font-medium">programming</span>, 
              <span className="text-sage font-medium"> Unix systems</span>, 
              <span className="text-gold font-medium"> UI/UX design</span>, and product-focused 
              application development.
            </motion.p>
            
            <motion.p 
              className="text-lg leading-relaxed text-foreground/80"
              variants={itemVariants}
            >
              I prefer working across related disciplines simultaneously, allowing me 
              to switch context when blocked and return with clearer perspective.
            </motion.p>
            
            <motion.p 
              className="text-lg leading-relaxed text-foreground/80"
              variants={itemVariants}
            >
              My primary interest lies in designing usable interfaces, building 
              user-facing products, and solving real end-user problems—with a growing 
              curiosity toward systems-level understanding.
            </motion.p>

            {/* Work style card */}
            <motion.div 
              className="pt-8 mt-8 border-t border-border/50 relative"
              variants={itemVariants}
            >
              <div className="absolute -top-3 left-0 px-3 py-1 bg-background text-xs tracking-widest uppercase text-muted-foreground">
                How I Work
              </div>
              <p className="text-foreground/70 leading-relaxed mt-4">
                Exploratory and experimental. I learn through reverse engineering, 
                trial-and-error, documentation, and AI-assisted exploration. 
                I prefer <span className="text-accent">CLI over GUI</span> for clarity 
                and maintainability, and thrive in team environments for diverse perspectives.
              </p>
            </motion.div>
          </motion.div>

          {/* Interests & Exploring */}
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-heading font-medium mb-6 flex items-center gap-3">
                <span className="w-10 h-px bg-gradient-to-r from-accent to-transparent" />
                Areas of Interest
              </h3>
              <ul className="grid gap-3">
                {interests.map((interest, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-4 group p-3 rounded-lg hover:bg-card/50 transition-smooth"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-xl group-hover:scale-125 transition-spring">{interest.icon}</span>
                    <span className="text-foreground/80 group-hover:text-foreground transition-smooth">
                      {interest.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-heading font-medium mb-6 flex items-center gap-3">
                <span className="w-10 h-px bg-gradient-to-r from-sage to-transparent" />
                Currently Exploring
              </h3>
              <ul className="space-y-3">
                {currentlyExploring.map((item, index) => (
                  <motion.li 
                    key={index}
                    className="text-foreground/80 flex items-center gap-4 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-sage/60 group-hover:bg-sage group-hover:scale-150 transition-smooth"
                      whileHover={{ rotate: 180 }}
                    />
                    <span className="group-hover:text-foreground transition-smooth">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;