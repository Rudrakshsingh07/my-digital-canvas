import { Suspense, lazy, useEffect, useState } from "react";
import profileImage from "@/assets/profile.png";
import { motion, useScroll, useTransform } from "framer-motion";

// Lazy load the 3D scene — not in initial bundle
const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const ROLES = [
  "Product Developer",
  "Interface Designer",
  "AI Systems Builder",
  "Unix Enthusiast",
];

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.92]);

  useEffect(() => {
    setMounted(true);
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Cycle roles
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero introduction">
      {/* 3D Background — lazy loaded, hidden in reduced motion */}
      {!prefersReduced && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      {/* Fallback ambient for reduced motion / no 3D */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 led-grid opacity-30" />
        <div className="absolute -right-20 top-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.06] blur-[100px]" />
        <div className="absolute -left-32 bottom-1/4 w-[350px] h-[350px] rounded-full bg-indigo/[0.05] blur-[80px]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24"
        style={{ opacity, y: y1, scale }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text composition — left side, asymmetric */}
          <div className="flex-1 flex flex-col items-start order-2 lg:order-1 max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Portfolio — 2025
            </motion.p>

            {/* Name — sculptural typography */}
            <motion.h1
              className="font-heading text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] tracking-tight mb-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block text-foreground">Rudraksh</span>
              <span className="block text-accent italic font-medium">Singh</span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              className="h-8 overflow-hidden mb-8 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.p
                key={roleIndex}
                className="text-lg md:text-xl text-muted-foreground font-body tracking-wide"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {ROLES[roleIndex]}
              </motion.p>
            </motion.div>

            {/* Decorative separator — asymmetric */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ transformOrigin: "left" }}
            >
              <div className="w-16 h-px bg-accent" />
              <div className="w-2 h-2 rounded-full bg-accent/40" />
              <div className="w-32 h-px bg-border" />
            </motion.div>

            {/* Intro text */}
            <motion.p
              className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              Exploring the intersection of{" "}
              <span className="text-accent font-medium">product development</span>,{" "}
              <span className="text-sage font-medium">UI/UX design</span>, and{" "}
              <span className="text-gold font-medium">applied AI systems</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-foreground text-sm tracking-[0.15em] uppercase font-medium hover:shadow-glow transition-all duration-500"
              >
                <span>View Work</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
              <a
                href="#contact"
                className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/30 pb-0.5"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* Profile composition — right side */}
          <motion.div
            className="relative order-1 lg:order-2 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Decorative rings */}
              <motion.div
                className="absolute -inset-6 rounded-full border border-accent/15"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              <motion.div
                className="absolute -inset-12 rounded-full border border-border/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />

              {/* Image */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/20 shadow-glow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              >
                <img
                  src={profileImage}
                  alt="Rudraksh Singh"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>

              {/* Floating label */}
              <motion.div
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full border border-border/50 shadow-soft"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span className="text-xs text-muted-foreground tracking-wider">Open to work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-transparent via-accent/40 to-accent"
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
