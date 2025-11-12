import { useState } from "react";
import { urlFor } from "../lib/sanityImageUrl";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import useLanguage from "@/hooks/useLanguage";
import type { DirectionProjectsListQueryResult } from "@/lib/types";
import VimeoHoverPlayer from "./VimeoHoverPlayer";

type Project = DirectionProjectsListQueryResult[number];

export default function ProjectCard({ project }: { project: Project }) {
  const { language } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.div className="w-fit flex-col gap-4 rounded pt-4">
      <NavLink
        to={`/direccion/${project.slug?.current}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-[700px]">
          {project?.previewId && project?.previewImage?.url && (
            <VimeoHoverPlayer
              className="w-auto rounded-lg"
              videoEmbed={project.previewId}
              imageUrl={urlFor(project?.previewImage?.url)
                .width(700)
                .format("webp")
                .url()}
              isHovering={isHovering}
            />
          )}
          <div className="pointer-events-none absolute inset-0 mx-8 mb-8 flex items-center justify-between gap-2">
            {project.title && (
              <h3 className="text-2xl tracking-wider uppercase">
                {project.title[language] ?? project.title.es}
              </h3>
            )}
            {project.projectType && (
              <span className="font-mono text-sm lowercase">
                {project.projectType[language] ?? project.projectType.es}
              </span>
            )}
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
}
