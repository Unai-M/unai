import { NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useLanguage from "@/hooks/useLanguage";

const navMenuItems = [
  { id: 1, name: { en: "Info", es: "Info" }, path: "/info" },
  { id: 2, name: { en: "Direction", es: "Dirección" }, path: "/direccion" },
  { id: 3, name: { en: "Treatment", es: "Tratamiento" }, path: "/tratamiento" },
  { id: 4, name: { en: "Manifiesto", es: "Manifiesto" }, path: "/manifiesto" },
];

export default function NavMenu() {
  const { language } = useLanguage();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navMenuItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink asChild>
              <NavLink to={item.path}>{item.name[language]}</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
