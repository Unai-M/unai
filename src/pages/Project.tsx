import { NavLink } from "react-router";
import { motion } from "motion/react";

export default function Project() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="no-doc-scroll fixed inset-0 z-100 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* TODO: cargar data de proyecto especifico */}
      <NavLink to="/">CERRAR</NavLink>
      <h1>Project title</h1>

      <p>project info</p>
    </motion.section>
  );
}
