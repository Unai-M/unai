import { useContext } from "react";
import { ContactContext } from "@/context/ContactContext";

export default function useContact() {
  const context = useContext(ContactContext);
  if (!context) throw new Error("Must be used within ContactProvider");
  return context;
}
