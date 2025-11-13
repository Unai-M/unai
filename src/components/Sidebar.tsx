import LanguageToggle from "./LanguageToggle";
import ContactButton from "./ContactButton";

export default function Sidebar() {
  return (
    <div className="pointer-events-none fixed top-0 right-12 z-120 flex h-screen flex-col justify-center">
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        <ContactButton />
        <LanguageToggle />
      </div>
    </div>
  );
}
