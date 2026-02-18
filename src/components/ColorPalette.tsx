import { motion } from "framer-motion";

const ColorPalette = () => {
  const semanticColors = [
    { name: "Background", variable: "bg-background", text: "text-foreground" },
    { name: "Foreground", variable: "bg-foreground", text: "text-background" },
    { name: "Card", variable: "bg-card", text: "text-card-foreground" },
    { name: "Primary", variable: "bg-primary", text: "text-primary-foreground" },
    { name: "Secondary", variable: "bg-secondary", text: "text-secondary-foreground" },
    { name: "Muted", variable: "bg-muted", text: "text-muted-foreground" },
    { name: "Accent", variable: "bg-accent", text: "text-accent-foreground" },
  ];

  const accentColors = [
    { name: "Terracotta", variable: "bg-terracotta", hex: "hsl(12 65% 50%)" },
    { name: "Indigo", variable: "bg-indigo", hex: "hsl(220 45% 25%)" },
    { name: "Sage", variable: "bg-sage", hex: "hsl(140 25% 45%)" },
    { name: "Gold", variable: "bg-gold", hex: "hsl(38 75% 55%)" },
    { name: "Coral", variable: "bg-coral", hex: "hsl(8 70% 60%)" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <p className="text-sm tracking-widest uppercase text-accent mb-4 font-body">
            Design System
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-medium">
            Color <span className="text-sage italic">Palette</span>
          </h2>
        </motion.div>

        {/* Semantic Colors */}
        <div className="mb-16">
          <h3 className="text-xl font-heading mb-6">Semantic Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {semanticColors.map((color, index) => (
              <motion.div
                key={color.name}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={`${color.variable} ${color.text} h-24 rounded-lg shadow-soft flex items-end p-3 border border-border/50`}
                >
                  <span className="text-xs font-medium">{color.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div>
          <h3 className="text-xl font-heading mb-6">Accent Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {accentColors.map((color, index) => (
              <motion.div
                key={color.name}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={`${color.variable} h-32 rounded-lg shadow-soft flex flex-col items-start justify-end p-4`}
                >
                  <span className="text-white text-sm font-medium drop-shadow-md">
                    {color.name}
                  </span>
                  <span className="text-white/70 text-xs drop-shadow-md">
                    {color.hex}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorPalette;
