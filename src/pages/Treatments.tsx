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

export default function Treatment() {
  const { data, isLoading, error } = useTreatmentProjects();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <motion.section className="flex w-full justify-center sm:mx-24">
      <Carousel className="rounded-xl bg-white/10 sm:w-3/4">
        <CarouselContent>
          {data?.length &&
            data.map((project) => {
              const title =
                language === "en"
                  ? project.title?.en || project.title?.es
                  : project.title?.es || project.title?.en;

              return (
                <CarouselItem key={project._id} className="">
                  <div className="flex h-screen flex-col items-center justify-around">
                    {project.image?.url && (
                      <img
                        src={urlFor(project.image.url)
                          .format("webp")
                          .width(600)
                          .url()}
                        className="_opacity-30 _grayscale _w-[450px]"
                      />
                    )}
                    <div className="flex w-full justify-center">
                      {project.description?.es && (
                        <PortableText
                          value={project.description.es}
                          components={BlockContentComponent}
                        />
                      )}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.section>
  );
}
