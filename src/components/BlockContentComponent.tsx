import type { PortableTextComponents } from "@portabletext/react";
import useContact from "@/hooks/useContact";

export function useBlockContentComponents(): PortableTextComponents {
  const { setIsContactOpen } = useContact();

  return {
    block: {
      normal: ({ children }) => (
        <p className="mb-4 whitespace-pre-line">{children}</p>
      ),
    },
    marks: {
      contactButton: ({ children }) => (
        <span
          className="cursor-pointer font-bold underline"
          onClick={() => setIsContactOpen(true)}
        >
          {children}
        </span>
      ),
    },
  };
}
