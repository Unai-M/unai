import { useTreatmentProjects } from "@/hooks/useTreatmentProjects";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { motion } from "motion/react";
import { BlockContentComponent } from "@/components/BlockContentComponent";
import { PortableText } from "@portabletext/react";
import ErrorPage from "./ErrorPage";

export default function Treatment() {
  const { data, isLoading, error } = useTreatmentProjects();
  const { language } = useLanguage();

  if (error) return <ErrorPage error={error} />;

  return (
    <motion.section
      initial={{ opacity: 1, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      exit={{
        opacity: 1,
        scaleX: 0,
        transition: { delay: 0.15, duration: 0.5 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="no-doc-scroll fixed inset-0 z-20 flex w-full origin-right justify-center bg-black"
    >
      {isLoading && <Loading />}

      <motion.div
        initial={{ opacity: 0, scaleX: 1 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        exit={{
          opacity: 0,
          scaleX: 1,
          transition: { duration: 0.15 },
        }}
        className="flex flex-col justify-center gap-8 px-8 py-16"
      >
        {/* grilla de puntos */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.3, delay: 1.4 }}
          exit={{ opacity: 0 }}
          className="fixed h-full w-full bg-[radial-gradient(circle_at_1px_1px,oklch(0.9367_0.1179_261.9)_1px,transparent_0)] [background-size:80px_80px] opacity-20"
        /> */}

        <div className="mx-auto w-[80vw] max-w-7xl columns-2 flex-col gap-4">
          <p>
            Desarrollar un tratamiento es tomar una idea en bruto y darle una
            forma que se pueda imaginar, sentir y visualizar. Es explorar el
            tono, la narrativa y la estética que mejor revelan la intención del
            proyecto. Investigo, propongo imágenes, construyo atmósferas y
            diseño un recorrido que permita entender cómo podría vivir esa pieza
            en pantalla.
          </p>
          <p>
            Mi trabajo es traducir conceptos en una visión concreta: encontrar
            el ángulo preciso, ordenar las sensaciones y abrir caminos posibles
            para que una historia se vea con claridad antes de existir. Cada
            tratamiento es un pequeño ejercicio de descubrimiento, una manera de
            acercarse a la esencia del proyecto y mostrarla con fuerza y
            coherencia.
          </p>
        </div>

        <div className="flex flex-col pt-16">
          {data?.map((project) => (
            <div key={project._id} className="grid grid-cols-2 gap-4">
              {project.title && (
                <h2 className="font-display justify-self-end leading-none font-black">
                  {project.title[language]}
                </h2>
              )}
              {project?.description?.es && (
                <div className="font-mono text-xs">
                  <PortableText
                    value={
                      project.description[language] ?? project.description.es
                    }
                    components={BlockContentComponent}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
