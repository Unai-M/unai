import { useDirectionProjectsList } from "@/hooks/useDirectionProjectsList";
import useLanguage from "@/hooks/useLanguage";
import ErrorPage from "./ErrorPage";
import { motion } from "motion/react";
import Loading from "@/components/Loading";
import { NavLink } from "react-router";
import { useState } from "react";

export default function Archive() {
  const { data, isLoading, error } = useDirectionProjectsList();
  const { language } = useLanguage();
  const [isNavigating, setIsNavigating] = useState(false);

  if (error) return <ErrorPage error={error} />;

  return (
    <motion.section
      initial={{ opacity: 1, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      exit={
        isNavigating
          ? { opacity: 1, scaleX: 1 }
          : {
              opacity: 1,
              scaleX: 0,
              transition: { delay: 0.15, duration: 0.5 },
            }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="no-doc-scroll fixed inset-0 z-20 flex origin-left justify-center bg-black py-24"
    >
      {isLoading && <Loading />}
      <motion.div
        initial={{ opacity: 0, scaleX: 1 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        exit={
          isNavigating
            ? { opacity: 1, scaleX: 1 }
            : {
                opacity: 0,
                scaleX: 1,
                transition: { duration: 0.15 },
              }
        }
        className={`${data?.length && data.length > 18 ? "border-foreground/50 border-b" : ""} flex flex-col justify-center gap-1 overflow-y-scroll pb-2`}
      >
        {data?.length &&
          data.map((project) => {
            return (
              <NavLink
                key={project._id}
                to={`/direccion/${project.slug?.current}`}
                onClick={() => setIsNavigating(true)}
              >
                <div className="align-items-center grid grid-cols-2 gap-4">
                  <span className="justify-self-end font-mono text-sm">
                    {project.date ?? project.date}
                  </span>
                  <div className="flex items-center gap-1">
                    {project.title && (
                      <h3 className="font-display leading-none font-black uppercase">
                        {project.title[language] ?? project.title.es}
                      </h3>
                    )}
                    {project.projectType && (
                      <span className="bg-background rounded-full px-2 font-mono text-xs text-black">
                        {project.projectType[language] ??
                          project.projectType.es}
                      </span>
                    )}
                  </div>
                </div>
              </NavLink>
            );
          })}
      </motion.div>
    </motion.section>
  );
}
