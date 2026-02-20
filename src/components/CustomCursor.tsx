import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "click" | "drag";

const CustomCursor = () => {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
    if (hasTouch) return;

    // Detect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setState("click");
    const onUp = () => setState("default");
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Observe hoverable elements
    const observer = new MutationObserver(() => updateHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    const hoverTargets = new Set<Element>();
    
    function updateHoverListeners() {
      const elements = document.querySelectorAll("a, button, [role='button'], input, textarea, select, [data-cursor='hover']");
      elements.forEach((el) => {
        if (hoverTargets.has(el)) return;
        hoverTargets.add(el);
        el.addEventListener("mouseenter", () => setState("hover"));
        el.addEventListener("mouseleave", () => setState("default"));
        (el as HTMLElement).style.cursor = "none";
      });
    }

    updateHoverListeners();

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  const sizes: Record<CursorState, number> = {
    default: 12,
    hover: 40,
    click: 8,
    drag: 48,
  };

  const size = sizes[state];

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className="w-full h-full rounded-full bg-foreground"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </motion.div>

      {/* Outer ring for hover state */}
      {state === "hover" && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x, y }}
          initial={{ width: 12, height: 12, opacity: 0 }}
          animate={{ width: 56, height: 56, opacity: 0.3 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        >
          <div
            className="w-full h-full rounded-full border border-foreground/50"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
