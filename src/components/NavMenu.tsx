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
        key: "treatments",
        label: language === "es" ? "tratamientos" : "treatments",
        onClick: () => navigate("/tratamientos"),
      },
      {
        key: "manifesto",
        label: language === "es" ? "manifiesto" : "manifesto",
        onClick: () => scrollToSection("manifiesto"),
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
      className="fixed bottom-0 left-0 z-30 flex w-full items-start justify-center px-2"
    >
      <div className="ml-[4px] flex w-full items-center justify-center pb-4 text-sm transition duration-1000 sm:text-base">
        {buttons.map(({ key, label, onClick }, index) => (
          <>
            <button
              key={key}
              onClick={onClick}
              // ${index === 0 ? "rounded-l-full rounded-r-xs" : index === buttons.length - 1 ? "rounded-l-xs rounded-r-full" : "rounded-xs"}
              className={`text-blue bg-foreground w-36 cursor-pointer rounded-full px-1 text-center uppercase transition-colors hover:bg-amber-500 sm:px-0`}
            >
              {label}
            </button>
            {index !== buttons.length - 1 && (
              <div className="bg-foreground/50 h-[1px] w-2 sm:w-4" />
            )}
          </>
        ))}
      </div>
    </motion.header>
  );
}
