import { motion } from "framer-motion";
import { useRef } from "react";

const About = () => {
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

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Precision dot grid background */}
      <div className="absolute inset-0 pattern-precision opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header — engraved plaque */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[0.6rem] tracking-[0.35em] uppercase text-sapphire font-body mb-3">
            01 — Introduction
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-medium text-embossed">
            About <span className="text-backlit italic">Me</span>
          </h2>
          <motion.div
            className="mt-5 flex items-center gap-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          >
            <div className="w-14 h-0.5 bg-sapphire rounded-full" style={{ boxShadow: "0 0 6px hsl(var(--sapphire) / 0.3)" }} />
            <div className="indicator-sapphire" />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Main description — printed surface */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base md:text-lg leading-relaxed text-foreground/75">
              I am a Computer Engineering diploma student exploring multiple domains
              including <span className="text-sapphire font-medium">programming</span>,
              <span className="text-sage font-medium"> Unix systems</span>,
              <span className="text-amber font-medium"> UI/UX design</span>, and product-focused
              application development.
            </p>
            <p className="text-base leading-relaxed text-foreground/75">
              I prefer working across related disciplines simultaneously, allowing me
              to switch context when blocked and return with clearer perspective.
            </p>
            <p className="text-base leading-relaxed text-foreground/75">
              My primary interest lies in designing usable interfaces, building
              user-facing products, and solving real end-user problems—with a growing
              curiosity toward systems-level understanding.
            </p>

            {/* Work style — recessed instrument panel */}
            <motion.div
              className="surface-recessed rounded-md p-5 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[0.55rem] tracking-[0.25em] uppercase text-muted-foreground mb-3 font-body">
                How I Work
              </p>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Exploratory and experimental. I learn through reverse engineering,
                trial-and-error, documentation, and AI-assisted exploration.
                I prefer <span className="text-sapphire">CLI over GUI</span> for clarity
                and maintainability.
              </p>
            </motion.div>
          </motion.div>

          {/* Interests & Exploring */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-heading font-medium mb-5 flex items-center gap-3 text-embossed">
                <div className="w-8 h-0.5 bg-sapphire/50 rounded-full" />
                Areas of Interest
              </h3>
              <ul className="grid gap-2">
                {interests.map((interest, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 group p-2.5 rounded-md surface-raised hover:shadow-contact transition-mechanical cursor-default"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span className="text-lg">{interest.icon}</span>
                    <span className="text-sm text-foreground/75 group-hover:text-foreground transition-fast">
                      {interest.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-heading font-medium mb-5 flex items-center gap-3 text-embossed">
                <div className="w-8 h-0.5 bg-sage/50 rounded-full" />
                Currently Exploring
              </h3>
              <ul className="space-y-2.5">
                {currentlyExploring.map((item, index) => (
                  <motion.li
                    key={index}
                    className="text-sm text-foreground/75 flex items-center gap-3 group"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                  >
                    <div className="indicator-sapphire-dim group-hover:indicator-sapphire transition-fast" />
                    <span className="group-hover:text-foreground transition-fast">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
