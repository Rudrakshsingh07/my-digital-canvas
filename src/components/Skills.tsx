import { motion } from "framer-motion";
import { useRef } from "react";

/** Segmented gauge — like an instrument level meter */
const GaugeMeter = ({ level, color = "sapphire" }: { level: number; color?: string }) => {
  const totalSegments = 10;
  const filledSegments = Math.round(level / 10);

  return (
    <div className="flex gap-[3px] items-end h-4">
      {Array.from({ length: totalSegments }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-[1px]"
          initial={{ height: 0, opacity: 0 }}
          whileInView={{
            height: 4 + i * 1.2,
            opacity: i < filledSegments ? 1 : 0.2,
          }}
          viewport={{ once: false }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          style={{
            background: i < filledSegments
              ? `hsl(var(--${color}))`
              : "hsl(var(--muted))",
            boxShadow: i < filledSegments
              ? `0 0 4px hsl(var(--${color}) / 0.3)`
              : "var(--shadow-recessed)",
          }}
        />
      ))}
    </div>
  );
};

const Skills = () => {
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

  const SkillList = ({ items, color }: { items: string[]; color: string }) => (
    <ul className="space-y-2">
      {items.map((skill, index) => (
        <motion.li
          key={index}
          className="text-sm text-foreground/75 flex items-center gap-3 group cursor-default"
          whileHover={{ x: 4 }}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.15 + index * 0.06 }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full transition-fast"
            style={{ background: `hsl(var(--${color}) / 0.5)` }}
          />
          <span className="group-hover:text-foreground transition-fast">{skill}</span>
        </motion.li>
      ))}
    </ul>
  );

  return (
    <section id="skills" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden surface-brushed">
      <div className="absolute inset-0 texture-brushed" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[0.6rem] tracking-[0.35em] uppercase text-sapphire font-body mb-3">
            02 — Expertise
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-medium text-embossed">
            Technical <span className="text-backlit italic">Skills</span>
          </h2>
          <motion.div
            className="mt-5 flex items-center gap-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          >
            <div className="w-14 h-0.5 bg-sage rounded-full" style={{ boxShadow: "0 0 6px hsl(var(--sage) / 0.3)" }} />
            <div className="w-2 h-2 rounded-full bg-sage" style={{ boxShadow: "0 0 6px hsl(var(--sage) / 0.3)" }} />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Languages — with gauge meters */}
          <motion.div
            className="surface-plate rounded-md p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-heading font-medium mb-5 pb-3 flex items-center gap-2 text-engraved"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <div className="indicator-sapphire" style={{ width: 6, height: 6 }} />
              Languages
            </h3>
            <ul className="space-y-4">
              {programmingLanguages.map((lang, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-foreground font-medium">{lang.name}</span>
                    <span className="text-[0.6rem] text-muted-foreground font-body tracking-wider">{lang.level}%</span>
                  </div>
                  <GaugeMeter level={lang.level} color="sapphire" />
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Development */}
          <motion.div
            className="surface-plate rounded-md p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-heading font-medium mb-5 pb-3 flex items-center gap-2 text-engraved"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-sage" style={{ boxShadow: "0 0 6px hsl(var(--sage) / 0.3)" }} />
              Development
            </h3>
            <SkillList items={developmentSkills} color="sage" />
          </motion.div>

          {/* AI/ML */}
          <motion.div
            className="surface-plate rounded-md p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-heading font-medium mb-5 pb-3 flex items-center gap-2 text-engraved"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber" style={{ boxShadow: "0 0 6px hsl(var(--amber) / 0.3)" }} />
              AI / Machine Learning
            </h3>
            <SkillList items={aiMlSkills} color="amber" />
          </motion.div>

          {/* Design & Media */}
          <motion.div
            className="surface-plate rounded-md p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-heading font-medium mb-5 pb-3 flex items-center gap-2 text-engraved"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-coral" style={{ boxShadow: "0 0 6px hsl(var(--coral) / 0.3)" }} />
              Design & Media
            </h3>
            <SkillList items={designMedia} color="coral" />
          </motion.div>

          {/* Tools — mechanical badges */}
          <motion.div
            className="md:col-span-2 surface-plate rounded-md p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-heading font-medium mb-5 pb-3 flex items-center gap-2 text-engraved"
              style={{ borderBottom: "1px solid hsl(var(--border))" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo" style={{ boxShadow: "0 0 6px hsl(var(--indigo) / 0.3)" }} />
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <motion.span
                  key={index}
                  className="btn-mechanical px-3 py-2 rounded-md text-xs text-foreground/75 font-body tracking-wide cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 + index * 0.04 }}
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
