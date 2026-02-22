import { motion } from "framer-motion";
import { GraduationCap, Target, Clock } from "lucide-react";

const Education = () => {
  const goals = [
    { text: "Pursue higher studies in computer engineering", icon: "🎓" },
    { text: "Secure internships in development or applied AI", icon: "💼" },
    { text: "Explore freelancing alongside academic growth", icon: "🚀" },
    { text: "Strengthen fundamentals while building systems", icon: "⚡" },
  ];

  const coursework = [
    { name: "Machine Learning & AI", color: "amber" },
    { name: "Internet of Things (IoT)", color: "sage" },
    { name: "Cloud Computing", color: "indigo" },
    { name: "Software Development", color: "coral" },
    { name: "Java Application Dev", color: "sapphire" },
  ];

  return (
    <section id="education" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden surface-brushed">
      <div className="absolute inset-0 texture-brushed" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[0.6rem] tracking-[0.35em] uppercase text-sapphire font-body mb-3">
            04 — Background
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-medium text-embossed">
            Education & <span className="text-backlit italic">Goals</span>
          </h2>
          <motion.div
            className="mt-5 flex items-center gap-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          >
            <div className="w-14 h-0.5 bg-coral rounded-full" style={{ boxShadow: "0 0 6px hsl(var(--coral) / 0.3)" }} />
            <div className="w-2 h-2 rounded-full bg-coral" style={{ boxShadow: "0 0 6px hsl(var(--coral) / 0.3)" }} />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="surface-raised p-3 rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <GraduationCap className="w-5 h-5 text-sapphire" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-heading font-medium text-embossed">Education</h3>
            </div>

            {/* Timeline — engraved channel */}
            <div className="relative pl-6" style={{ borderLeft: "2px solid hsl(var(--border))" }}>
              {/* Timeline jewel */}
              <div
                className="absolute -left-[5px] top-0 indicator-sapphire"
              />

              <div className="mb-6">
                <h4 className="text-lg md:text-xl font-heading font-medium mb-1 text-embossed">
                  Diploma in Computer Engineering
                </h4>
                <p className="text-sm text-muted-foreground mb-5 font-body">
                  Tolani Foundation Polytechnic, Gandhidham
                </p>
              </div>

              <div>
                <p className="text-[0.55rem] tracking-[0.25em] uppercase text-muted-foreground mb-3 font-body">
                  Key Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course, index) => (
                    <motion.span
                      key={index}
                      className="btn-mechanical inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs cursor-default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.3 + index * 0.06 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: `hsl(var(--${course.color}))`,
                          boxShadow: `0 0 4px hsl(var(--${course.color}) / 0.3)`,
                        }}
                      />
                      <span className="text-foreground/75">{course.name}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="surface-raised p-3 rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Target className="w-5 h-5 text-sage" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-heading font-medium text-embossed">Goals</h3>
            </div>

            <ul className="space-y-2">
              {goals.map((goal, index) => (
                <motion.li
                  key={index}
                  className="group flex gap-3 p-3 surface-raised rounded-md hover:shadow-contact transition-mechanical cursor-default"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                >
                  <span className="text-lg">{goal.icon}</span>
                  <span className="text-sm text-foreground/75 group-hover:text-foreground transition-fast flex-1">
                    {goal.text}
                  </span>
                  <span className="text-[0.55rem] text-muted-foreground/40 font-heading tracking-wide group-hover:text-sapphire transition-fast">
                    0{index + 1}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Availability — instrument readout */}
            <motion.div
              className="mt-8 surface-recessed rounded-md p-4"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="surface-raised p-2 rounded-md">
                  <Clock className="w-4 h-4 text-amber" />
                </div>
                <div>
                  <p className="text-[0.5rem] tracking-[0.25em] uppercase text-muted-foreground font-body">
                    Availability
                  </p>
                  <p className="text-sm text-foreground font-medium">
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
