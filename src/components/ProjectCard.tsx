import { urlFor } from "../lib/sanityImageUrl";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import useLanguage from "@/hooks/useLanguage";
import type { DirectionProjectsListQueryResult } from "@/lib/types";

type Project = DirectionProjectsListQueryResult[number];

export default function ProjectCard({ project }: { project: Project }) {
  const { language } = useLanguage();

  return (
    <motion.div className="w-fit flex-col gap-4 rounded pt-4">
      <NavLink to={`/direccion/${project.slug?.current}`}>
        {project?.previewImage?.url && (
          <img
            src={urlFor(project.previewImage?.url)
              .format("webp")
              .width(800)
              .url()}
            className="rounded rounded-t-xl"
          />
        )}
      </NavLink>
      <div className="mt-1 flex items-center gap-8 rounded rounded-b-2xl bg-black/70 px-4 py-1">
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
    </motion.div>
  );
}
