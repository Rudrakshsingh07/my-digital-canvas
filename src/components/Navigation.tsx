import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "About", href: "#about", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Projects", href: "#projects", num: "03" },
  { label: "Education", href: "#education", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.hash === "";

  // Track scroll for progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);

      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navigate = useCallback((href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Minimal fixed nav bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-lg font-heading font-semibold text-accent tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Home"
          >
            RS
          </motion.a>

          <div className="flex items-center gap-3">
            {/* Section indicators — desktop */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className="group relative px-3 py-2"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <span
                      className={`block w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-accent scale-100"
                          : "bg-muted-foreground/30 scale-75 group-hover:scale-100 group-hover:bg-muted-foreground/60"
                      }`}
                    />
                    {/* Tooltip */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-border/50 hidden md:block" />

            <ThemeToggle />

            {/* Command trigger */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-xs text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              aria-label="Open navigation (Ctrl+K)"
            >
              <span className="hidden sm:inline">Navigate</span>
              <kbd className="text-[0.6rem] px-1.5 py-0.5 rounded bg-muted/80 font-mono">⌘K</kbd>
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <span className="absolute w-5 h-0.5 bg-foreground -translate-y-1" />
              <span className="absolute w-5 h-0.5 bg-foreground translate-y-1" />
            </motion.button>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="h-px bg-accent origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </motion.nav>

      {/* Spatial navigation overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Navigation content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <motion.div
                className="w-full max-w-2xl px-8"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Navigate</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close navigation"
                  >
                    ESC
                  </button>
                </div>

                {/* Links */}
                <ul className="space-y-2" role="navigation">
                  {NAV_ITEMS.map((item, i) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <button
                          onClick={() => navigate(item.href)}
                          className={`w-full text-left group flex items-center gap-6 py-4 px-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "text-foreground/60 hover:text-foreground hover:bg-card/50"
                          }`}
                        >
                          <span className="text-xs font-mono text-muted-foreground/50 tabular-nums w-8">
                            {item.num}
                          </span>
                          <span className="text-3xl md:text-4xl font-heading font-medium tracking-tight">
                            {item.label}
                          </span>
                          {isActive && (
                            <motion.span
                              className="ml-auto w-2 h-2 rounded-full bg-accent"
                              layoutId="navActive"
                            />
                          )}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Footer hint */}
                <motion.p
                  className="mt-12 text-xs text-muted-foreground/40 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Use keyboard arrows • Press Enter to navigate
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
