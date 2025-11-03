import { urlFor } from "../lib/sanityImageUrl";
import { motion } from "motion/react";
import { NavLink } from "react-router";
import useLanguage from "@/hooks/useLanguage";

export default function ProjectCard({ project }) {
  const { language } = useLanguage();

  return (
    <motion.div className="w-fit flex-col gap-4 rounded pt-4">
      <div className="mb-4 flex items-center gap-8">
        <h3 className="font-thin tracking-wider uppercase">
          {project.title[language] ?? project.title.es}
        </h3>
        {project.projectType && (
          <span className="font-mono">
            {project.projectType[language] ?? project.projectType.es}
          </span>
        )}
        <div className="border-foreground size-2 rounded-full border"></div>
      </div>

      <NavLink to={`/${project.slug?.current}`}>
        <img
          src={urlFor(project.previewImage?.url)
            .format("webp")
            .width(600)
            .url()}
          className="rounded-xl"
        />
      </NavLink>
    </motion.div>
  );
}
