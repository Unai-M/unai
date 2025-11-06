import useLanguage from "@/hooks/useLanguage";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="border-foreground/80 cursor-pointer rounded-2xl border-2 px-2 text-sm"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </button>
  );
}
