import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

type IsContactOpen = boolean;

type ContactContextType = {
  isContactOpen: IsContactOpen;
  setIsContactOpen: Dispatch<SetStateAction<IsContactOpen>>;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

type ContactProviderProps = {
  children: ReactNode;
};

const ContactProvider = ({ children }: ContactProviderProps) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <ContactContext.Provider value={{ isContactOpen, setIsContactOpen }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactProvider, ContactContext };
