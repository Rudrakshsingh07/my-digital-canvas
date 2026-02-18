import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Projects = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterProjects = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Allow the cinematic overlay animation to play before routing
    setTimeout(() => {
      navigate("/projects");
    }, 750);
  };

  return (
    <section
      id="projects"
      className="relative min-h-[90vh] md:min-h-screen px-6 md:px-12 lg:px-24 py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.04] to-background" />
      <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 w-80 h-80 rounded-full bg-indigo/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-widest uppercase text-accent mb-4 font-body">
            03 — Projects
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium">
            A cinematic{" "}
            <span className="text-gold italic">gateway</span>
          </h2>
          <p className="mt-5 max-w-xl text-foreground/70 text-base md:text-lg">
            Step into a dedicated space where interfaces, motion, and systems
            design come together. A focused, filmic view of the work behind the screens.
          </p>
        </motion.div>

        {/* Gateway content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Copy + CTA */}
          <motion.div
            className="flex-1 flex flex-col items-start gap-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                Projects world
              </p>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Designed as a{" "}
                <span className="text-accent font-medium">single continuous journey</span> —
                from this page into a dedicated projects environment with device-level showcases.
              </p>
            </div>

            <button
              onClick={handleEnterProjects}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-accent/60 bg-accent/10 text-sm tracking-[0.25em] uppercase text-accent hover:bg-accent hover:text-background transition-smooth"
            >
              <span>Enter Projects</span>
              <motion.span
                animate={{ x: isTransitioning ? 8 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </button>

            <p className="text-xs md:text-sm text-muted-foreground max-w-sm">
              Optimized for GitHub Pages with pre-rendered media, device-aware layouts,
              and motion designed to feel like entering a dedicated product studio.
            </p>
          </motion.div>

          {/* Right: Cinematic device cluster preview */}
          <motion.div
            className="flex-1 w-full flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <motion.div
              onClick={handleEnterProjects}
              className="relative w-full max-w-xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              {/* Base card */}
              <div className="relative aspect-[16/10] rounded-3xl bg-card border border-border/60 shadow-card overflow-hidden">
                <div className="absolute inset-0 led-grid opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/10 to-accent/10" />

                {/* Device silhouettes */}
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="relative w-4/5 max-w-md">
                    {/* MacBook frame */}
                    <motion.div
                      className="relative rounded-[1.75rem] border border-border/70 bg-background/80 shadow-2xl backdrop-blur-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.8 }}
                    >
                      <div className="aspect-[16/10] rounded-[1.5rem] overflow-hidden bg-black/90">
                        <div className="w-full h-full bg-gradient-to-br from-indigo/60 via-background to-accent/70 opacity-90" />
                      </div>
                      <div className="h-3 w-1/2 mx-auto mt-1 rounded-full bg-border/80" />
                    </motion.div>

                    {/* Tablet frame */}
                    <motion.div
                      className="absolute -right-6 -top-10 w-40 md:w-44 rounded-[1.5rem] border border-border/60 bg-background/90 shadow-card backdrop-blur-lg"
                      initial={{ y: 40, opacity: 0, rotate: 8 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.35, duration: 0.8 }}
                    >
                      <div className="aspect-[4/5] rounded-[1.35rem] overflow-hidden bg-black/90">
                        <div className="w-full h-full bg-gradient-to-br from-sage/50 via-background to-gold/60 opacity-90" />
                      </div>
                    </motion.div>

                    {/* Phone frame */}
                    <motion.div
                      className="absolute -left-6 -bottom-8 w-24 md:w-28 rounded-[1.25rem] border border-border/60 bg-background/90 shadow-card backdrop-blur-lg"
                      initial={{ y: 30, opacity: 0, rotate: -10 }}
                      animate={{ y: 0, opacity: 1, rotate: -4 }}
                      transition={{ delay: 0.45, duration: 0.8 }}
                    >
                      <div className="aspect-[9/19] rounded-[1.1rem] overflow-hidden bg-black/90">
                        <div className="w-full h-full bg-gradient-to-br from-gold/60 via-background to-coral/70 opacity-90" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Label */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground/80">
                  <span>Projects studio</span>
                  <span>Devices · Motion · Systems</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cinematic overlay during transition */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[70] bg-background"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 led-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-indigo/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-[70vw] max-w-4xl aspect-[16/9] rounded-[2rem] border border-border/70 bg-card/95 shadow-glow overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.02, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-indigo/70 via-background to-accent/80" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;