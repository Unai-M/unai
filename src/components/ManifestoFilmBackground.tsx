import { motion } from "motion/react";
// import Lines from "./Lines";

export default function ManifestoFilmBackground() {
  return (
    <div className="absolute -z-10">
      {/* gradient overelay */}
      <motion.div
        className="_brightness-50 _grayscale-80 pointer-events-none fixed -z-10 h-full w-full bg-black backdrop-blur-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        exit={{ opacity: 0, transition: { duration: 0.8, delay: 0 } }}
      />

      {/* <motion.div */}
      {/*   className="font-display pointer-events-none fixed top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 scale-x-125 overflow-hidden text-[30vw] font-bold blur-xs select-none" */}
      {/*   initial={{ opacity: 0 }} */}
      {/*   animate={{ opacity: 0.05 }} */}
      {/*   transition={{ duration: 1.75, delay: 1.5 }} */}
      {/*   exit={{ opacity: 0 }} */}
      {/* > */}
      {/*   UNAI */}
      {/* </motion.div> */}

      {/* <Lines key="lines" /> */}
    </div>
  );
}
