import { useState } from "react";
import { urlFor } from "../lib/sanityImageUrl";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import useLanguage from "@/hooks/useLanguage";
import type { DirectionProjectsListQueryResult } from "@/lib/types";
import VimeoHoverPlayer from "./VimeoHoverPlayer";
import useIsMobile from "@/hooks/useIsMobile";

type Project = DirectionProjectsListQueryResult[number];

export default function ProjectCard({ project }: { project: Project }) {
  const { language } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const previewImageUrl = project.previewImage
    ? urlFor(project?.previewImage).width(700).format("webp").url()
    : null;

  const hasVideo = Boolean(project.previewId);

  return (
    <motion.div className="h-full w-full flex-col">
      <NavLink
        to={`/direccion/${project.slug?.current}`}
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      >
        <div className="relative w-full overflow-hidden rounded-lg">
          {!isMobile && hasVideo && previewImageUrl && (
            <VimeoHoverPlayer
              className="w-full"
              videoEmbed={project.previewId!}
              imageUrl={previewImageUrl}
              isHovering={isHovering}
            />
          )}

          {isMobile && previewImageUrl && (
            <img src={previewImageUrl} alt="" className="w-full" />
          )}

          {!hasVideo && previewImageUrl && (
            <img src={previewImageUrl} alt="" className="w-full" />
          )}

          <div className="pointer-events-none absolute inset-0 flex w-full items-end justify-between bg-gradient-to-t from-black/70 to-transparent to-60% p-5">
            {project.title && (
              <h3 className="font-display leading-none uppercase">
                {project.title[language] ?? project.title.es}
              </h3>
            )}
            {project.projectType && (
              <span className="font-mono text-sm leading-none uppercase">
                {project.projectType[language] ?? project.projectType.es}
              </span>
            )}
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
}
