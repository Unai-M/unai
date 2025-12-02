import { UserRound } from "lucide-react";
import { useRef } from "react";
import { useProfile } from "../hooks/useProfile";
import useLanguage from "@/hooks/useLanguage";
import { motion, AnimatePresence } from "motion/react";
import useContact from "@/hooks/useContact";

export default function ContactButton() {
  const { isContactOpen, setIsContactOpen } = useContact();
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsContactOpen((prev) => !prev);
        }}
        className="text-blue bg-foreground z-20 flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-amber-500"
      >
        <UserRound strokeWidth={1.5} size={24} />
      </motion.div>

      <AnimatePresence>
        {isContactOpen && (
          <ContactWindow onClose={() => setIsContactOpen(false)} />
        )}
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
      className="fixed inset-0 z-10 flex items-center justify-center backdrop-brightness-80"
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.15 }}
        className="border-foreground/30 bg-foreground text-blue relative z-20 px-4 pt-3 pb-4 font-mono text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-display mb-2 text-2xl uppercase">
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

        <div className="flex flex-col items-start pt-4">
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
