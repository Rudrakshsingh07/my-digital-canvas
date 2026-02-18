import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 md:px-12 lg:px-24 border-t border-border overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        {/* Left side */}
        <div className="flex items-center gap-4">
          <motion.span 
            className="text-2xl font-heading font-semibold text-accent"
            whileHover={{ scale: 1.1 }}
          >
            RS
          </motion.span>
          <div className="w-px h-6 bg-border" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rudraksh Singh
          </p>
        </div>

        {/* Center - Status */}
        <motion.div 
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Open to opportunities
          </span>
        </motion.div>

        {/* Right side */}
        <p className="text-sm text-muted-foreground">
          Crafted with Professionalism & Precision
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;