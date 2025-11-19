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
    <motion.div className="flex-col overflow-hidden rounded-lg">
      <NavLink
        to={`/direccion/${project.slug?.current}`}
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      >
        <div className="relative rounded-2xl sm:w-[700px]">
          {!isMobile && hasVideo && previewImageUrl && (
            <VimeoHoverPlayer
              className="w-full rounded-2xl"
              videoEmbed={project.previewId!}
              imageUrl={previewImageUrl}
              isHovering={isHovering}
            />
          )}

          {isMobile && previewImageUrl && (
            <img src={previewImageUrl} alt="" className="w-full rounded-2xl" />
          )}

          {!hasVideo && previewImageUrl && (
            <img src={previewImageUrl} alt="" className="w-full rounded-2xl" />
          )}

          <div className="pointer-events-none absolute inset-0 flex w-full items-end justify-between rounded-lg bg-gradient-to-t from-black/70 to-transparent to-60% p-5">
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
