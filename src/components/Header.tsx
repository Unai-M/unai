import LanguageToggle from "./LanguageToggle";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header className="items-cente flex w-full justify-between gap-2">
      <NavMenu />
      <LanguageToggle />
    </header>
  );
}
