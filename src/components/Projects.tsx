import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import projectsData from "@/data/projects.json";

const Projects = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  const handleEnterProjects = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => navigate("/projects"), 800);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-12 lg:px-24 py-32 md:py-40 overflow-hidden"
    >
      {/* Layered ambient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
      <motion.div
        className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[100px]"
        style={{ y: parallaxY }}
      />
      <motion.div
        className="absolute -left-24 bottom-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.06] blur-[80px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.p
          className="text-sm tracking-[0.3em] uppercase text-accent mb-6 font-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          03 — Projects
        </motion.p>

        {/* Main heading */}
        <motion.h2
          className="text-5xl md:text-6xl lg:text-8xl font-heading font-medium leading-[1.05] mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Where craft
          <br />
          meets <span className="text-gold italic">motion</span>
        </motion.h2>

        <motion.p
          className="text-foreground/60 text-lg md:text-xl max-w-lg mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          A curated studio of interfaces, systems, and motion — each framed
          inside the device it was designed for.
        </motion.p>

        {/* Film-strip preview grid */}
        <motion.div
          className="relative mb-16"
          style={{ scale: scaleProgress }}
          onClick={handleEnterProjects}
        >
          <div className="cursor-pointer group">
            {/* Horizontal film strip */}
            <div className="relative flex gap-4 md:gap-6 overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm p-4 md:p-6">
              {projectsData.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="relative flex-shrink-0 w-[260px] md:w-[320px] lg:w-[380px]"
                  initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
                >
                  {/* Card */}
                  <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden border border-border/40 bg-background/80 group-hover:border-accent/30 transition-smooth">
                    {/* Gradient fill */}
                    <div
                      className={`absolute inset-0 ${
                        i === 0
                          ? "bg-gradient-to-br from-accent/40 via-background/60 to-indigo/30"
                          : i === 1
                          ? "bg-gradient-to-br from-gold/35 via-background/60 to-sage/25"
                          : "bg-gradient-to-br from-indigo/35 via-background/60 to-coral/25"
                      }`}
                    />
                    <div className="absolute inset-0 led-grid opacity-30" />

                    {/* Project label inside card */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-background/90 to-transparent">
                      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground mb-1">
                        {project.type}
                      </p>
                      <p className="text-sm md:text-base font-heading text-foreground/90">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-card/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-card/60 to-transparent pointer-events-none z-10" />
            </div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-3xl bg-accent/[0.04] opacity-0 group-hover:opacity-100 transition-smooth -z-10 blur-xl"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            onClick={handleEnterProjects}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-accent/50 bg-accent/[0.08] text-sm tracking-[0.2em] uppercase text-accent hover:bg-accent hover:text-accent-foreground transition-smooth"
          >
            <span>Enter the Studio</span>
            <motion.span
              animate={{ x: isTransitioning ? 12 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </button>

          <p className="hidden md:block text-sm text-muted-foreground max-w-xs">
            {projectsData.length} projects · Device-framed showcases · Cinematic motion
          </p>
        </motion.div>
      </div>

      {/* Cinematic transition overlay */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[70] bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 led-grid opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-gold/[0.08]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full border border-accent/40 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
              </motion.div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Entering studio
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
