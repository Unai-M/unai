import LanguageToggle from "./LanguageToggle";
import ContactButton from "./ContactButton";
import { motion } from "motion/react";

export default function Sidebar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed top-0 right-2 z-120 flex h-screen flex-col justify-center"
    >
      <div className="pointer-events-auto flex flex-col items-center">
        <ContactButton />
        <div className="bg-foreground/50 h-4 w-[1px]" />
        <LanguageToggle />
      </div>
    </motion.div>
  );
}
