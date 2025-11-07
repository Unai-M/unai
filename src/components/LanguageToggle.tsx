import useLanguage from "@/hooks/useLanguage";
import { motion } from "motion/react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border-foreground/80 cursor-pointer rounded-2xl border-2 px-2 py-1 font-mono text-xs"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </motion.button>
  );
}
