import { motion } from "motion/react";

export default function ManifestoFilmBackground() {
  return (
    <div className="absolute -z-10">
      <motion.div
        className="pointer-events-none fixed -z-10 h-full w-full bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        exit={{ opacity: 0, transition: { duration: 0.8, delay: 0 } }}
      />
    </div>
  );
}
