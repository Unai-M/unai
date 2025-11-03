import { motion } from "motion/react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="bg-primary/20 _border-2 flex items-center gap-2 rounded p-4 backdrop-blur-xs"
    >
      {children}
    </motion.div>
  );
}
