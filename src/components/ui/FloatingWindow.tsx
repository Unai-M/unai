import { motion } from "motion/react";

export default function FLoatingWindow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-100 flex h-screen w-full items-center justify-center">
      <motion.section
        drag
        dragMomentum={false}
        className="_border-2 _border-b-4 _backdrop-blur-3xl _shadow-2xl pointer-events-auto fixed z-200 max-w-[800px] p-8 text-2xl"
      >
        {children}
      </motion.section>
    </div>
  );
}
