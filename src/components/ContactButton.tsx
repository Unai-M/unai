import { Contact } from "lucide-react";
import { useState, useRef } from "react";
import { useProfile } from "../hooks/useProfile";
import useLanguage from "@/hooks/useLanguage";
import { motion, AnimatePresence } from "motion/react";

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="z-20 cursor-pointer"
      >
        <Contact strokeWidth={1.25} size={24} />
      </motion.div>

      <AnimatePresence>
        {isOpen && <ContactWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function ContactWindow({ onClose }: { onClose: () => void }) {
  const { data } = useProfile();
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.15 }}
        className="border-foreground/30 relative z-20 rounded-2xl border px-6 py-4 font-mono text-white backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-2 text-2xl uppercase">
          {language === "es" ? "contacto" : "contact"}
        </h1>

        {data?.email && (
          <a
            href={`mailto:${data.email}`}
            className="mb-2 block hover:underline"
          >
            {data.email}
          </a>
        )}

        <div className="flex flex-col items-start gap-2">
          {data?.links?.length &&
            data.links.map((link) => (
              <a
                key={link._key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.title}
              </a>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
