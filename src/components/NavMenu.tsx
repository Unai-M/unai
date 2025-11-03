import { NavLink } from "react-router";
import { motion } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import useLanguage from "@/hooks/useLanguage";

const navMenuItems = [
  {
    id: "direccion-nav",
    name: { en: "Direction", es: "Dirección" },
    path: "/",
  },
  {
    id: "manifiesto-nav",
    name: { en: "Manifesto", es: "Manifiesto" },
    path: "/manifiesto",
  },
  {
    id: "tratamientos-nav",
    name: { en: "Treatments", es: "Tratamientos" },
    path: "/tratamientos",
  },
  { id: "info-nav", name: { en: "Info", es: "Info" }, path: "/info" },
];
export default function NavMenu() {
  const { language } = useLanguage();

  return (
    <motion.header
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.25 }}
      exit={{ opacity: 0, y: 40 }}
      className="bg-green-500/00 _backdrop-blur-xl fixed bottom-12 left-20 z-20 flex w-full items-start justify-between"
    >
      <div className="flex items-center gap-2 opacity-80">
        <NavigationMenu>
          <NavigationMenuList className="flex">
            {navMenuItems.map((item) => (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink asChild className="">
                  <NavLink to={item.path}>{item.name[language]}</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </motion.header>
  );
}
