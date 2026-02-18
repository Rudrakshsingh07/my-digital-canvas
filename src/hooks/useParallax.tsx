import { useEffect, useState, useCallback } from "react";

interface ParallaxConfig {
  speed?: number;
  direction?: "up" | "down";
}

export const useParallax = ({ speed = 0.5, direction = "up" }: ParallaxConfig = {}) => {
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const multiplier = direction === "up" ? -1 : 1;
    setOffset(scrollY * speed * multiplier);
  }, [speed, direction]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return offset;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      setProgress(scrollHeight > 0 ? scrollY / scrollHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

export const useInView = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isInView };
};

export default useParallax;
