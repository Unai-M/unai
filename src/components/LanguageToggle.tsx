import useLanguage from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </Button>
  );
}
