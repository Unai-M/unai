import useLanguage from "@/hooks/useLanguage";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="border-foreground/80 cursor-pointer rounded-2xl border-2 px-2 py-1 font-mono text-xs"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </button>
  );
}
