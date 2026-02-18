import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass border-b border-border/50 shadow-soft"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-2xl font-heading font-semibold text-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              RS
            </motion.a>

            {/* Nav links - hidden on mobile */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className={`relative px-4 py-2 text-sm tracking-wide transition-colors ${
                      activeSection === item.href.replace("#", "")
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.replace("#", "") && (
                      <motion.span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                        layoutId="activeNav"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
              <li className="ml-4">
                <ThemeToggle />
              </li>
            </ul>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-8 h-8 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  className="absolute w-5 h-0.5 bg-foreground"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                />
                <motion.span
                  className="absolute w-5 h-0.5 bg-foreground"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="absolute w-5 h-0.5 bg-foreground"
                  animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-6 right-6 bg-card border border-border rounded-2xl p-6 shadow-card"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-lg transition-colors ${
                        activeSection === item.href.replace("#", "")
                          ? "bg-accent/10 text-accent"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[60] origin-left"
        style={{ scaleX: 0 }}
        animate={{ 
          scaleX: typeof window !== 'undefined' 
            ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) 
            : 0 
        }}
      />
    </>
  );
};

export default Navigation;
