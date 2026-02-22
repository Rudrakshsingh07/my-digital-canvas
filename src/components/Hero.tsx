import { Suspense, lazy, useEffect, useState } from "react";
import profileImage from "@/assets/profile.png";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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
  const y1 = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => {
    setMounted(true);
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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
      {/* 3D Background — lazy */}
      {!prefersReduced && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      {/* Brushed metal ambient texture */}
      <div className="absolute inset-0 -z-20 texture-brushed" />
      <div className="absolute inset-0 -z-20 pattern-precision opacity-40" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20"
        style={{ opacity, y: y1 }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text composition */}
          <div className="flex-1 flex flex-col items-start order-2 lg:order-1 max-w-2xl">
            {/* Eyebrow — engraved label */}
            <motion.p
              className="text-[0.65rem] tracking-[0.4em] uppercase text-engraved mb-6 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Portfolio — 2025
            </motion.p>

            {/* Name — embossed into surface */}
            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] leading-[0.95] tracking-tight mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block text-embossed">Rudraksh</span>
              <span className="block text-backlit font-medium italic">Singh</span>
            </motion.h1>

            {/* Role display — recessed instrument window */}
            <motion.div
              className="surface-recessed rounded-md px-4 py-2.5 mb-8 mt-4 min-w-[220px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-[0.55rem] tracking-[0.25em] uppercase text-muted-foreground mb-1 font-body">
                Current Role
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  className="text-sm md:text-base text-sapphire font-body font-medium"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {ROLES[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Machined separator */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            >
              <div className="w-12 h-0.5 bg-sapphire rounded-full" style={{ boxShadow: "0 0 6px hsl(var(--sapphire) / 0.3)" }} />
              <div className="indicator-sapphire-dim" />
              <div className="w-24 h-px bg-border" />
            </motion.div>

            {/* Intro — printed on surface */}
            <motion.p
              className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Exploring the intersection of{" "}
              <span className="text-sapphire font-medium">product development</span>,{" "}
              <span className="text-sage font-medium">UI/UX design</span>, and{" "}
              <span className="text-amber font-medium">applied AI systems</span>.
            </motion.p>

            {/* CTAs — mechanical buttons */}
            <motion.div
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <a
                href="#projects"
                className="btn-sapphire inline-flex items-center gap-3 px-6 py-3 rounded-md text-xs tracking-[0.2em] uppercase font-medium"
              >
                <span>View Work</span>
                <span>→</span>
              </a>
              <a
                href="#contact"
                className="btn-mechanical inline-flex items-center px-5 py-3 rounded-md text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* Profile — machined watch-case frame */}
          <motion.div
            className="relative order-1 lg:order-2 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
              {/* Machined bezel */}
              <div
                className="absolute -inset-3 rounded-full"
                style={{
                  background: "linear-gradient(var(--light-angle), hsl(var(--card)), hsl(var(--background)))",
                  boxShadow: "var(--shadow-plate)",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              {/* Inner channel */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  boxShadow: "var(--shadow-recessed)",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-border">
                <img
                  src={profileImage}
                  alt="Rudraksh Singh"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Status indicator — amber jewel */}
              <motion.div
                className="absolute -bottom-2 -right-2 surface-raised px-3 py-1.5 rounded-md flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="indicator-amber" style={{ width: 6, height: 6 }} />
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground font-body">
                  Available
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — engraved groove */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
      >
        <motion.div
          className="w-px h-12 rounded-full"
          style={{
            background: "linear-gradient(180deg, transparent, hsl(var(--sapphire) / 0.4), hsl(var(--sapphire)))",
          }}
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
