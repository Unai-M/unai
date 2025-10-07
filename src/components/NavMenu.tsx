import { NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navMenuItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Info", path: "/info" },
  { id: 3, name: "Direccion", path: "/direccion" },
  { id: 4, name: "Tratamiento", path: "/tratamiento" },
  { id: 5, name: "Manifiesto", path: "/manifiesto" },
];

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navMenuItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink asChild>
              <NavLink to={item.path}>{item.name}</NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
