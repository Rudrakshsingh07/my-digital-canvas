import { useEffect, useState } from "react";
import profileImage from "@/assets/profile.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

// Custom SVG icons for orbiting elements
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const UbuntuIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM8.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm10 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-6.5 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>
);

const GnomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const VimIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M3 2l3.5 3.5L3 9V2zm18 0v7l-3.5-3.5L21 2zM12 8l-4 4h3v8h2v-8h3l-4-4z"/>
  </svg>
);

const UnixIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const RicingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z"/>
  </svg>
);

const orbitingIcons = [
  { Icon: AppleIcon, label: "Apple", color: "text-foreground" },
  { Icon: UnixIcon, label: "Unix", color: "text-indigo" },
  { Icon: UbuntuIcon, label: "Ubuntu", color: "text-coral" },
  { Icon: RicingIcon, label: "Ricing", color: "text-sage" },
  { Icon: GnomeIcon, label: "GNOME", color: "text-gold" },
  { Icon: VimIcon, label: "Vim", color: "text-sage" },
];

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background LED grid effect */}
      <div className="absolute inset-0 led-grid opacity-40" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div 
        className="relative z-10 px-6 md:px-12 lg:px-24"
        style={{ opacity, scale }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Left side - Text Display */}
          <div className="flex-1 flex flex-col items-center lg:items-start order-2 lg:order-1">
            {/* Name */}
            <motion.h1
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Rudraksh Singh
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-body tracking-wide mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Computer Engineering Student
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="w-full max-w-lg mb-8 h-px bg-gradient-to-r from-accent/40 via-accent to-accent/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />

            {/* Brief intro */}
            <motion.p 
              className="text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Exploring the intersection of{" "}
              <span className="text-accent font-medium">product development</span>,{" "}
              <span className="text-sage font-medium">UI/UX design</span>, and{" "}
              <span className="text-gold font-medium">applied AI systems</span>.
            </motion.p>

            {/* CTA */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <a
                href="#about"
                className="group inline-flex items-center gap-3 px-6 py-3 border border-accent/40 rounded-full text-sm tracking-widest uppercase text-muted-foreground hover:text-accent hover:border-accent hover:bg-accent/5 transition-smooth"
              >
                <span>Explore</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-smooth" />
              </a>
            </motion.div>
          </div>

          {/* Right side - Profile picture with orbiting icons */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            {/* Orbit container */}
            <div className="relative w-[23rem] h-[23rem] md:w-[28.8rem] md:h-[28.8rem]">
              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl animate-pulse-glow" />
              
              {/* Outer orbit path */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-accent/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              
              {/* Middle orbit path */}
              <motion.div 
                className="absolute inset-8 md:inset-12 rounded-full border border-sage/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              
              {/* Inner orbit path with pattern */}
              <motion.div 
                className="absolute inset-16 md:inset-20 rounded-full border border-gold/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />

              {/* Profile picture */}
              <motion.div 
                className="absolute inset-24 md:inset-28 rounded-full overflow-hidden bg-secondary border-2 border-accent/30 shadow-glow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, duration: 0.6, type: "spring" }}
              >
                <img
                  src={profileImage}
                  alt="Rudraksh Singh"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Orbiting icons */}
              <motion.div 
                className="absolute inset-0 animate-orbit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                {orbitingIcons.map((item, index) => {
                  const angle = (360 / orbitingIcons.length) * index;
                  const radian = (angle * Math.PI) / 180;
                  const radius = 50;
                  
                  return (
                    <motion.div
                      key={item.label}
                      className={`absolute w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border shadow-soft hover:scale-125 hover:shadow-card transition-spring ${item.color}`}
                      style={{
                        left: `calc(50% + ${Math.cos(radian) * radius}%)`,
                        top: `calc(50% + ${Math.sin(radian) * radius}%)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      title={item.label}
                    >
                      <item.Icon />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ opacity }}
      >
        <motion.div 
          className="w-px h-20 bg-gradient-to-b from-transparent via-accent/50 to-accent"
          animate={{ scaleY: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;