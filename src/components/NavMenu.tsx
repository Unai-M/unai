import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import useLanguage from "@/hooks/useLanguage";
import { useCallback, useMemo } from "react";

interface NavMenuProps {
  theme: "light" | "dark";
}

export default function NavMenu({ theme }: NavMenuProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const isLight = theme === "light";

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
        className: "rounded-l-2xl pr-1 pl-3",
      },
      {
        key: "manifesto",
        label: language === "es" ? "manifiesto" : "manifesto",
        onClick: () => scrollToSection("manifiesto"),
        className: "px-1",
      },
      {
        key: "treatments",
        label: language === "es" ? "tratamientos" : "treatments",
        onClick: () => navigate("/tratamientos"),
        className: "px-1",
      },
      {
        key: "archive",
        label: language === "es" ? "archivo" : "archive",
        onClick: () => navigate("/archivo"),
        className: "rounded-r-2xl pr-3 pl-1",
      },
    ],
    [language, navigate, scrollToSection],
  );

  const baseBtnClass = `${
    isLight ? "bg-foreground" : "bg-black/70"
  } cursor-pointer rounded uppercase transition duration-1000`;

  return (
    <motion.header
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 1 }}
      className="fixed bottom-12 left-0 z-20 flex w-full items-start justify-center"
    >
      <div
        className={`${
          isLight ? "text-[rgba(23,_112,_193,_0.99)]" : "text-foreground"
        } flex items-center gap-1 rounded-2xl px-4 font-mono uppercase transition duration-1000`}
      >
        {buttons.map(({ key, label, onClick, className }) => (
          <button
            key={key}
            onClick={onClick}
            className={`${baseBtnClass} ${className}`}
          >
            {label}
          </button>
        ))}
      </div>
    </motion.header>
  );
}
