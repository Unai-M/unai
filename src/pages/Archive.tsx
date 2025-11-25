import { useDirectionProjectsList } from "@/hooks/useDirectionProjectsList";
import useLanguage from "@/hooks/useLanguage";
import ErrorPage from "./ErrorPage";
import { AnimatePresence, motion } from "motion/react";
import Loading from "@/components/Loading";
import { NavLink } from "react-router";
import { useState } from "react";
import { urlFor } from "../lib/sanityImageUrl";
import type { DirectionProjectsListQueryResult } from "@/lib/types";
import useIsMobile from "@/hooks/useIsMobile";

export default function Archive() {
  const { data, isLoading, error } = useDirectionProjectsList();
  const { language } = useLanguage();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<
    DirectionProjectsListQueryResult[number] | null
  >(null);
  const isMobile = useIsMobile();

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
      className="no-doc-scroll fixed inset-0 z-20 flex w-full origin-right justify-center overflow-y-auto bg-black py-24"
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
        className="my-auto flex h-fit w-full flex-col justify-center gap-1 px-8 pb-2"
      >
        {data?.map((project) => {
          return (
            <NavLink
              key={project._id}
              to={`/direccion/${project.slug?.current}`}
              onClick={() => setIsNavigating(true)}
              onMouseEnter={() => {
                if (!isMobile) {
                  setIsHovering(true);
                  setHoveredProject(project);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setIsHovering(false);
                  setHoveredProject(null);
                }
              }}
            >
              <div
                className={`align-items-center mb-2 grid sm:mb-1 sm:grid-cols-2 sm:gap-4 ${isHovering && hoveredProject?._id !== project._id ? "opacity-50" : ""} transform transition duration-500 ease-in-out`}
              >
                <span className="font-mono text-sm sm:justify-self-end">
                  {project.date ?? project.date}
                </span>
                <div className="items-center gap-1 sm:flex">
                  {project.title && (
                    <h3 className="font-display leading-none font-black uppercase">
                      {project.title[language] ?? project.title.es}
                    </h3>
                  )}
                  {project.projectType && (
                    <span className="bg-background rounded-full px-2 font-mono text-xs text-black">
                      {project.projectType[language] ?? project.projectType.es}
                    </span>
                  )}
                </div>
              </div>
            </NavLink>
          );
        })}

        <AnimatePresence>
          {isHovering && hoveredProject?.previewImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pointer-events-none fixed inset-0 -z-10 flex h-screen w-full items-center justify-center"
            >
              <img
                src={urlFor(hoveredProject.previewImage)
                  .format("webp")
                  .width(1000)
                  .url()}
                alt=""
                className="max-h-[95vh] max-w-[1000px] rounded-sm object-contain opacity-70"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
