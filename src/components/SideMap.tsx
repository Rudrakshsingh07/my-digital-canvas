import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "education", label: "Education", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

const SideMap = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);

      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── DESKTOP: Vertical instrument rail ── */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-14 flex-col items-center py-6 surface-brushed texture-brushed"
        style={{
          borderRight: "1px solid hsl(var(--border))",
          boxShadow: "2px 0 8px hsl(var(--foreground) / 0.04)",
        }}
        aria-label="Section navigation"
      >
        {/* Monogram */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-heading font-semibold text-engraved mb-8 tracking-wider"
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          RS
        </motion.button>

        {/* Channel + markers */}
        <div className="flex-1 flex flex-col items-center relative">
          {/* Background channel */}
          <div className="absolute top-0 bottom-0 channel-vertical" />

          {/* Progress glow overlay */}
          <motion.div
            className="absolute top-0 w-0.5 rounded-full channel-glow"
            style={{ height: `${scrollProgress * 100}%` }}
          />

          {/* Section markers */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full py-4">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <div key={section.id} className="relative">
                  <motion.button
                    onClick={() => navigate(section.id)}
                    onMouseEnter={() => setHoveredId(section.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative flex items-center justify-center w-8 h-8"
                    whileTap={{ scale: 0.85 }}
                    aria-label={`Navigate to ${section.label}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {/* Jewel mount (recessed setting) */}
                    <div
                      className="absolute w-5 h-5 rounded-full"
                      style={{
                        background: "hsl(var(--card))",
                        boxShadow: "var(--shadow-recessed)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    {/* Jewel */}
                    <motion.div
                      className={isActive ? "indicator-sapphire" : "indicator-sapphire-dim"}
                      animate={isActive ? {
                        boxShadow: [
                          "0 0 8px hsl(var(--sapphire) / 0.4), 0 0 24px hsl(var(--sapphire) / 0.15)",
                          "0 0 14px hsl(var(--sapphire) / 0.6), 0 0 32px hsl(var(--sapphire) / 0.25)",
                          "0 0 8px hsl(var(--sapphire) / 0.4), 0 0 24px hsl(var(--sapphire) / 0.15)",
                        ],
                      } : {}}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </motion.button>

                  {/* Tooltip — engraved label */}
                  <AnimatePresence>
                    {hoveredId === section.id && (
                      <motion.div
                        className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className="surface-raised px-2.5 py-1 rounded text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-body block">
                          {section.num} · {section.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Theme toggle at bottom */}
        <div className="mt-6">
          <ThemeToggle />
        </div>
      </nav>

      {/* ── MOBILE: Horizontal instrument bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-14 flex items-center justify-around px-4 surface-brushed texture-brushed"
        style={{
          borderTop: "1px solid hsl(var(--border))",
          boxShadow: "0 -2px 8px hsl(var(--foreground) / 0.04)",
        }}
        aria-label="Section navigation"
      >
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => navigate(section.id)}
              className="flex flex-col items-center gap-1 py-1"
              whileTap={{ scale: 0.85 }}
              aria-label={`Navigate to ${section.label}`}
            >
              <div className={isActive ? "indicator-sapphire" : "indicator-sapphire-dim"} />
              <span
                className={`text-[0.5rem] tracking-[0.15em] uppercase font-body transition-fast ${
                  isActive ? "text-sapphire" : "text-muted-foreground"
                }`}
              >
                {section.num}
              </span>
            </motion.button>
          );
        })}
        <ThemeToggle />
      </nav>
    </>
  );
};

export default SideMap;
