import { useDirectionProjectsList } from "@/hooks/useDirectionProjectsList";
import Loading from "@/components/Loading";
import { motion } from "motion/react";
import ProjectCard from "@/components/ProjectCard";
import ErrorPage from "./ErrorPage";

export default function Direction() {
  const { data, isLoading, error } = useDirectionProjectsList();

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  const highlightedProjects = data?.filter((project) => project.isHighlighted);

  return (
    <motion.section className="relative flex w-full flex-col items-center justify-center">
      <div className="align-items-center grid w-[90vw] auto-rows-[minmax(100px,auto)] grid-cols-1 gap-12 px-8 lg:grid-cols-6">
        {highlightedProjects?.length &&
          highlightedProjects.map((project, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className={`flex justify-center ${
                  index % 5 === 0
                    ? "lg:col-span-4 lg:col-start-2 lg:row-span-2"
                    : index % 3
                      ? "lg:col-span-3"
                      : "lg:col-span-3 lg:col-start-4 lg:row-span-2"
                }`}
                key={project._id}
              >
                <div rounded-lg>
                  <ProjectCard project={project} />
                </div>
              </motion.div>
            );
          })}
      </div>
    </motion.section>
  );
}
