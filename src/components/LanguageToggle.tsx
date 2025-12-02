import useLanguage from "@/hooks/useLanguage";
// import { Languages } from "lucide-react";
import { motion } from "motion/react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="text-blue bg-foreground z-20 size-6 cursor-pointer rounded-full text-sm uppercase transition-colors hover:bg-amber-500"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
      {/* <Languages strokeWidth={1} size={24} /> */}
    </motion.button>
  );
}
