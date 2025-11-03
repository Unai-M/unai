import { useDirectionProjectsList } from "@/hooks/useDirectionProjectsList";
import Loading from "@/components/Loading";
import { motion } from "motion/react";
import ProjectCard from "@/components/ProjectCard";
import ErrorPage from "./ErrorPage";

export default function Direction() {
  const { data, isLoading, error } = useDirectionProjectsList();

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  return (
    <motion.section className="_h-screen relative flex w-full flex-col items-center justify-center">
      <div className="align-items-center grid w-3/4 grid-cols-6 gap-12 px-8">
        {data?.length &&
          data.map((project, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className={`items-start ${
                  index % 5 === 0
                    ? "col-span-4 col-start-2 row-span-2"
                    : index % 3
                      ? "col-span-3"
                      : "col-span-3 col-start-4 row-span-2"
                }`}
                key={project._id}
              >
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
      </div>
    </motion.section>
  );
}
