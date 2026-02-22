import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-8 h-8 rounded-md surface-raised flex items-center justify-center"
      whileTap={{ scale: 0.85 }}
      style={{ transition: "all 0.08s ease" }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotateZ: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-sapphire" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
