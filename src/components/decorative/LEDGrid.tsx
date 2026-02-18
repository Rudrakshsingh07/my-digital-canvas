import { useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LEDGridProps {
  text: string;
  subtitle?: string;
  className?: string;
}

// 5x7 LED font for uppercase letters and numbers
const LED_FONT: Record<string, number[][]> = {
  'A': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  'B': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
  ],
  'C': [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,1],
  ],
  'D': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
  ],
  'E': [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  'G': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,0],
    [1,0,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  'H': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  'I': [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
  ],
  'K': [
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
  ],
  'L': [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  'N': [
    [1,0,0,0,1],
    [1,1,0,0,1],
    [1,0,1,0,1],
    [1,0,0,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  'O': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  'P': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
  ],
  'R': [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
  ],
  'S': [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,0],
  ],
  'T': [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
  ],
  'U': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  ' ': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ],
};

// Individual LED dot component that responds to scroll
const LEDDot = ({ 
  dot, 
  dotSize, 
  gap, 
  scrollProgress 
}: { 
  dot: { x: number; y: number; active: boolean; threshold: number };
  dotSize: number;
  gap: number;
  scrollProgress: any;
}) => {
  // Each dot lights up based on scroll progress vs its threshold
  const opacity = useTransform(
    scrollProgress,
    [Math.max(0, dot.threshold - 0.1), dot.threshold],
    [0, dot.active ? 1 : 0.15]
  );
  
  const scale = useTransform(
    scrollProgress,
    [Math.max(0, dot.threshold - 0.1), dot.threshold],
    [0, 1]
  );

  const backgroundColor = dot.active 
    ? 'hsl(var(--accent))' 
    : 'hsl(var(--muted-foreground) / 0.3)';
  
  const boxShadow = dot.active 
    ? '0 0 10px hsl(var(--accent) / 0.8), 0 0 20px hsl(var(--accent) / 0.4)' 
    : 'none';

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: dotSize,
        height: dotSize,
        left: dot.x * (dotSize + gap),
        top: dot.y * (dotSize + gap),
        opacity,
        scale,
        backgroundColor,
        boxShadow,
      }}
    />
  );
};

export const LEDGrid = ({ text, subtitle, className = "" }: LEDGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Map scroll to animation progress (0 to 1 as element comes into view)
  const animationProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const dots = useMemo(() => {
    const chars = text.toUpperCase().split('');
    const allDots: { x: number; y: number; active: boolean; threshold: number }[] = [];
    
    let offsetX = 0;
    const totalChars = chars.length;
    
    chars.forEach((char, charIndex) => {
      const charMatrix = LED_FONT[char] || LED_FONT[' '];
      
      charMatrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          // Calculate threshold based on character position and dot position within character
          const charProgress = charIndex / totalChars;
          const dotProgress = (rowIndex + colIndex) * 0.01;
          const threshold = Math.min(1, charProgress * 0.8 + dotProgress + 0.1);
          
          allDots.push({
            x: offsetX + colIndex,
            y: rowIndex,
            active: cell === 1,
            threshold,
          });
        });
      });
      
      offsetX += 6; // 5 cols + 1 space
    });
    
    return allDots;
  }, [text]);

  const totalCols = text.length * 6;
  const dotSize = Math.min(4, 400 / totalCols);
  const gap = dotSize * 0.25;

  // Subtitle opacity based on scroll
  const subtitleOpacity = useTransform(animationProgress, [0.7, 1], [0, 1]);
  const subtitleY = useTransform(animationProgress, [0.7, 1], [20, 0]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Glow effect behind */}
      <div className="absolute inset-0 blur-3xl opacity-30 bg-accent/20 rounded-full" />
      
      {/* Main LED display */}
      <div 
        className="relative flex flex-wrap justify-center"
        style={{
          width: totalCols * (dotSize + gap),
          height: 7 * (dotSize + gap),
        }}
      >
        {dots.map((dot, index) => (
          <LEDDot
            key={index}
            dot={dot}
            dotSize={dotSize}
            gap={gap}
            scrollProgress={animationProgress}
          />
        ))}
      </div>

      {/* Subtitle with normal text */}
      {subtitle && (
        <motion.p
          className="text-center mt-6 text-lg md:text-xl text-muted-foreground font-body tracking-wide"
          style={{ 
            opacity: subtitleOpacity,
            y: subtitleY 
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default LEDGrid;
