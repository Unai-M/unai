import { motion } from "motion/react";
import Lines from "./Lines";

export default function BackgroundDecorations() {
  return (
    <div className="absolute -z-10">
      {/* gradient overelay */}
      <motion.div
        className="_brightness-50 _grayscale-80 pointer-events-none fixed -z-10 h-full w-full bg-white/10 backdrop-blur-[200px]"
        style={{
          backgroundImage: `
        radial-gradient(circle at 50% 50%, transparent 0%, rgba(23, 112, 193, 0.99) 80%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="font-display pointer-events-none fixed top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 scale-x-125 overflow-hidden text-[30vw] font-bold blur-xs select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.75, delay: 1.5 }}
        exit={{ opacity: 0 }}
      >
        UNAI
      </motion.div>

      {/* TODO: limpiar */}
      {/* grilla de puntos */}
      {/* <motion.div */}
      {/*   initial={{ opacity: 0 }} */}
      {/*   animate={{ opacity: 1 }} */}
      {/*   transition={{ duration: 0.3, delay: 1.4 }} */}
      {/*   exit={{ opacity: 0 }} */}
      {/*   className="fixed top-[5vh] left-[20vw] h-[85vh] w-[60vw] bg-[radial-gradient(circle_at_1px_1px,oklch(0.9367_0.1179_261.9)_1px,transparent_0)] [background-size:80px_80px]" */}
      {/* /> */}

      <Lines key="lines" />
    </div>
  );
}
