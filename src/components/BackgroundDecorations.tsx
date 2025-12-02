import { motion } from "motion/react";
import Lines from "./Lines";

export default function BackgroundDecorations() {
  return (
    <div className="absolute -z-10">
      {/* gradient overelay */}
      <motion.div
        className="pointer-events-none fixed -z-10 h-full w-full bg-white/10 backdrop-blur-[200px]"
        style={{
          backgroundImage: `
        radial-gradient(circle at 50% 50%, transparent 0%, rgba(23, 112, 193, 0.99) 80%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        exit={{ opacity: 0 }}
      />

      <Lines key="lines" />
    </div>
  );
}
