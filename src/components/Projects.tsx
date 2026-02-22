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

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleEnterProjects = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => navigate("/projects"), 600);
  };

  const gradients = [
    "from-sapphire/20 via-background/60 to-indigo/15",
    "from-amber/20 via-background/60 to-sage/15",
    "from-indigo/20 via-background/60 to-coral/15",
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-12 lg:px-20 py-28 md:py-36 overflow-hidden"
    >
      {/* Ambient depth */}
      <div className="absolute inset-0 pattern-precision opacity-20" />
      <motion.div
        className="absolute -right-32 top-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ y: parallaxY, background: "hsl(var(--sapphire) / 0.06)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.p
          className="text-[0.6rem] tracking-[0.35em] uppercase text-sapphire font-body mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          03 — Projects
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium leading-[1.05] mb-6 text-embossed"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Where craft
          <br />
          meets <span className="text-backlit italic">motion</span>
        </motion.h2>

        <motion.p
          className="text-foreground/55 text-base md:text-lg max-w-md mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A curated studio of interfaces, systems, and motion — each framed
          inside the device it was designed for.
        </motion.p>

        {/* Project cards — machined plates */}
        <motion.div
          className="mb-14"
          onClick={handleEnterProjects}
        >
          <div className="cursor-pointer group">
            <div className="surface-recessed rounded-md p-4 md:p-5 flex gap-4 md:gap-5 overflow-x-auto">
              {projectsData.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="relative flex-shrink-0 w-[240px] md:w-[300px] lg:w-[340px]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                >
                  <div className="surface-plate rounded-md overflow-hidden group-hover:shadow-contact transition-mechanical">
                    {/* Gradient placeholder */}
                    <div className={`aspect-[4/3] bg-gradient-to-br ${gradients[i % gradients.length]} relative`}>
                      <div className="absolute inset-0 pattern-precision opacity-30" />
                      {/* Project label */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                        <p className="text-[0.5rem] uppercase tracking-[0.25em] text-muted-foreground mb-0.5 font-body">
                          {project.type}
                        </p>
                        <p className="text-sm font-heading text-foreground/85">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA — mechanical button */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={handleEnterProjects}
            className="btn-sapphire inline-flex items-center gap-3 px-6 py-3.5 rounded-md text-xs tracking-[0.2em] uppercase font-medium"
          >
            <span>Enter the Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="hidden md:block text-xs text-muted-foreground max-w-xs font-body">
            {projectsData.length} projects · Device-framed showcases
          </p>
        </motion.div>
      </div>

      {/* Transition overlay */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[70] bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 texture-brushed" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="indicator-sapphire" style={{ animation: "sapphirePulse 1.5s ease-in-out infinite" }} />
              <p className="text-[0.55rem] tracking-[0.3em] uppercase text-muted-foreground font-body">
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
