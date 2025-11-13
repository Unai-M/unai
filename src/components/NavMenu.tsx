import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import useLanguage from "@/hooks/useLanguage";
import { useCallback, useMemo } from "react";

export default function NavMenu() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId, smooth: false } });
      } else {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate],
  );

  const buttons = useMemo(
    () => [
      {
        key: "direction",
        label: language === "es" ? "dirección" : "direction",
        onClick: () => scrollToSection("direction"),
      },
      {
        key: "manifesto",
        label: language === "es" ? "manifiesto" : "manifesto",
        onClick: () => scrollToSection("manifiesto"),
      },
      {
        key: "treatments",
        label: language === "es" ? "tratamientos" : "treatments",
        onClick: () => navigate("/tratamientos"),
      },
      {
        key: "archive",
        label: language === "es" ? "archivo" : "archive",
        onClick: () => navigate("/archivo"),
      },
    ],
    [language, navigate, scrollToSection],
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 1 }}
      className="_bottom-12 fixed bottom-0 left-0 z-30 flex w-full items-start justify-center"
    >
      <div className="border-foreground/50 _rounded-2xl divide-foreground/50 _px-4 ml-[4px] grid grid-cols-4 items-center gap-1 divide-x border border-b-0 transition duration-1000">
        {buttons.map(({ key, label, onClick }) => (
          <button key={key} onClick={onClick} className="p-6">
            {label}
          </button>
        ))}
      </div>
    </motion.header>
  );
}
