import { motion } from "framer-motion";

export default function SiteTitle() {
  return (
    <motion.div className="text-background absolute flex h-screen w-full flex-col items-center justify-start">
      <motion.h1
        initial={{ y: 400 }}
        animate={{ y: [400, 400, 0] }}
        transition={{ duration: 3, ease: "easeOut", times: [0, 0.75, 1] }}
        className="font-display text-blue _text-[6.5vw] _bg-white/80 flex w-full gap-4 text-[7vw] leading-none font-black tracking-tight uppercase [font-variation-settings:'opsz'_80]"
      >
        <StaggeredText text="Unai Maria de Amorrortu" />
      </motion.h1>
      <div className="w-full overflow-hidden">
        <motion.h2 className="text-blue flex w-full justify-between px-0.5 text-sm uppercase sm:px-2 sm:text-lg">
          <motion.span
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 3.5, ease: "easeInOut" }}
          >
            director
          </motion.span>
          <motion.span
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 3.8, ease: "easeInOut" }}
          >
            tratamentista
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}

function StaggeredText({ text }: { text: string }) {
  const words = text.split(" ");

  let cumulativeDelay = 0;

  return (
    <div className="flex flex-wrap overflow-hidden">
      {words.map((word, wordIndex) => {
        const letters = word.split("");
        const wordStartDelay = cumulativeDelay;
        cumulativeDelay += letters.length * 0.03 + 0.1;

        return (
          <span key={wordIndex} className="inline-flex">
            {letters.map((letter, letterIndex) => (
              <motion.span
                key={`${wordIndex}-${letterIndex}`}
                className="inline-block"
                initial={{ opacity: 1, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordStartDelay + letterIndex * 0.05,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
