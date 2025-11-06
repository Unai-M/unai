import { useDirectionProjectsList } from "@/hooks/useDirectionProjectsList";
import useLanguage from "@/hooks/useLanguage";
import ErrorPage from "./ErrorPage";
import { motion } from "motion/react";
import Loading from "@/components/Loading";

export default function Archive() {
  const { data, isLoading, error } = useDirectionProjectsList();
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
      className="no-doc-scroll fixed inset-0 z-20 flex origin-left justify-center bg-black py-24"
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
        className={`${data?.length && data.length > 18 ? "border-foreground/50 border-b" : ""} flex w-1/2 flex-col justify-center overflow-y-scroll pb-2`}
      >
        {data?.length &&
          data.map((project) => {
            return (
              <div
                key={project._id}
                className="mt-1 flex items-center gap-8 rounded rounded-b-2xl bg-black/70 px-4 py-1"
              >
                <span className="font-mono">
                  {project.date ?? project.date}
                </span>
                {project.title && (
                  <h3 className="font-thin tracking-wider uppercase">
                    {project.title[language] ?? project.title.es}
                  </h3>
                )}
                {project.projectType && (
                  <span className="font-mono">
                    {project.projectType[language] ?? project.projectType.es}
                  </span>
                )}
              </div>
            );
          })}
      </motion.div>
    </motion.section>
  );
}
