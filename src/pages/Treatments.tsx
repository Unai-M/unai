import { useTreatmentProjects } from "@/hooks/useTreatmentProjects";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { urlFor } from "../lib/sanityImageUrl";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlockContentComponent } from "@/components/BlockContentComponent";
import { PortableText } from "@portabletext/react";
import ErrorPage from "./ErrorPage";

export default function Treatment() {
  const { data, isLoading, error } = useTreatmentProjects();
  const { language } = useLanguage();

  if (error) return <ErrorPage error={error} />;

  return (
    <motion.section
      initial={{ opacity: 1, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      exit={{
        opacity: 1,
        scaleX: 0,
        transition: { delay: 0.15, duration: 0.5 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="no-doc-scroll fixed inset-0 z-20 flex w-full origin-right justify-center bg-black"
    >
      {isLoading && <Loading />}

      <motion.div
        initial={{ opacity: 0, scaleX: 1 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        exit={{
          opacity: 0,
          scaleX: 1,
          transition: { duration: 0.15 },
        }}
        className="flex w-full justify-center"
      >
        {/* grilla de puntos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.4 }}
          exit={{ opacity: 0 }}
          className="fixed top-[5vh] left-[20vw] h-[95vh] w-[60vw] bg-[radial-gradient(circle_at_1px_1px,oklch(0.9367_0.1179_261.9)_1px,transparent_0)] [background-size:80px_80px]"
        />
        <Carousel className="">
          <CarouselContent>
            {data?.length &&
              data.map((project) => {
                return (
                  <CarouselItem key={project._id} className="">
                    <div className="flex h-screen max-w-full flex-col items-center justify-center gap-4">
                      {project.image?.url && (
                        <img
                          src={urlFor(project.image.url)
                            .format("webp")
                            .width(1200)
                            .url()}
                          className="max-w-screen rounded"
                        />
                      )}

                      <div className="flex w-full justify-center overflow-auto">
                        {project.description?.es && (
                          <PortableText
                            value={
                              project.description[language] ??
                              project.description.es
                            }
                            components={BlockContentComponent}
                          />
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious className="fixed top-1/2 left-1/8" />
          <CarouselNext className="fixed top-1/2 right-1/8" />
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
