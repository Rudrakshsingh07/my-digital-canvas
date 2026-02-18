import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Target, Clock } from "lucide-react";

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const goals = [
    { text: "Pursue higher studies in computer engineering", icon: "🎓" },
    { text: "Secure internships in development or applied AI", icon: "💼" },
    { text: "Explore freelancing alongside academic growth", icon: "🚀" },
    { text: "Strengthen fundamentals while building systems", icon: "⚡" },
  ];

  const coursework = [
    { name: "Machine Learning & AI", color: "bg-gold" },
    { name: "Internet of Things (IoT)", color: "bg-sage" },
    { name: "Cloud Computing", color: "bg-indigo" },
    { name: "Software Development", color: "bg-coral" },
    { name: "Java Application Dev", color: "bg-accent" },
  ];

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-card relative overflow-hidden"
    >
      <div className="absolute inset-0 pattern-diagonal opacity-30" />

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
            04 — Background
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium">
            Education & <span className="text-coral italic">Goals</span>
          </h2>
          
          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-20 h-px bg-coral" />
            <div className="w-3 h-3 rounded-full bg-coral/50" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div 
                className="p-4 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl border border-accent/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring" }}
              >
                <GraduationCap className="w-7 h-7 text-accent" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-heading font-medium">Education</h3>
            </div>

            <motion.div 
              className="relative pl-8 border-l-2 border-accent/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, type: "spring" }}
              />

              <div className="mb-8">
                <motion.h4 
                  className="text-xl md:text-2xl font-heading font-medium mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                >
                  Diploma in Computer Engineering
                </motion.h4>
                <motion.p 
                  className="text-muted-foreground mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                >
                  Tolani Foundation Polytechnic, Gandhidham
                </motion.p>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4 font-body">
                  Key Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course, index) => (
                    <motion.span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-full text-sm border border-border/50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.5 + index * 0.08 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`w-2 h-2 rounded-full ${course.color}`} />
                      <span className="text-foreground/80">{course.name}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div 
                className="p-4 bg-gradient-to-br from-sage/20 to-sage/5 rounded-2xl border border-sage/20"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring" }}
              >
                <Target className="w-7 h-7 text-sage" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-heading font-medium">Goals</h3>
            </div>

            <ul className="space-y-4">
              {goals.map((goal, index) => (
                <motion.li 
                  key={index} 
                  className="group flex gap-4 p-4 rounded-xl hover:bg-background/50 transition-smooth"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <motion.span 
                    className="text-2xl"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                  >
                    {goal.icon}
                  </motion.span>
                  <div className="flex-1">
                    <span className="text-foreground/80 group-hover:text-foreground transition-smooth">
                      {goal.text}
                    </span>
                  </div>
                  <span className="text-accent font-heading text-lg opacity-0 group-hover:opacity-100 transition-smooth">
                    0{index + 1}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Availability */}
            <motion.div 
              className="mt-10 p-6 bg-background rounded-2xl border border-border relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10 flex items-center gap-4">
                <motion.div 
                  className="p-3 bg-gold/10 rounded-xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Clock className="w-5 h-5 text-gold" />
                </motion.div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1 font-body">
                    Availability
                  </p>
                  <p className="text-foreground font-medium">
                    ~10+ hours per week for learning & building
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;