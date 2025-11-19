import { useDirectionProjectsList } from "@/hooks/useDirectionProjectsList";
import useLanguage from "@/hooks/useLanguage";
import ErrorPage from "./ErrorPage";
import { motion } from "motion/react";
import Loading from "@/components/Loading";
import { NavLink } from "react-router";
import { useState } from "react";
import { urlFor } from "../lib/sanityImageUrl";
import type { DirectionProjectsListQueryResult } from "@/lib/types";

export default function Archive() {
  const { data, isLoading, error } = useDirectionProjectsList();
  const { language } = useLanguage();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<
    DirectionProjectsListQueryResult[number] | null
  >(null);

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
      className="no-doc-scroll fixed inset-0 z-20 flex origin-right justify-center bg-black py-24"
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
        className={`${data?.length && data.length > 18 ? "border-foreground/50 border-b" : ""} flex flex-col justify-center gap-1 overflow-y-auto px-8 pb-2`}
      >
        {data?.map((project) => {
          return (
            <NavLink
              key={project._id}
              to={`/direccion/${project.slug?.current}`}
              onClick={() => setIsNavigating(true)}
              onMouseEnter={() => {
                setIsHovering(true);
                setHoveredProject(project);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoveredProject(null);
              }}
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
                      {project.projectType[language] ?? project.projectType.es}
                    </span>
                  )}
                </div>
              </div>
            </NavLink>
          );
        })}

        {isHovering && hoveredProject?.previewImage?.url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="pointer-events-none fixed inset-0 -z-10 flex h-screen w-full items-center justify-center"
          >
            <img
              src={urlFor(hoveredProject.previewImage.url)
                .format("webp")
                .width(800)
                .url()}
              alt=""
              className="max-h-[95vh] max-w-[800px] rounded-sm object-contain opacity-80"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}
