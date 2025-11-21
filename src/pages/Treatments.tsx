import { useTreatmentProjects } from "@/hooks/useTreatmentProjects";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { motion } from "motion/react";
import { BlockContentComponent } from "@/components/BlockContentComponent";
import { PortableText } from "@portabletext/react";
import ErrorPage from "./ErrorPage";
import { useProfile } from "@/hooks/useProfile";
import VimeoPlayer from "@/components/VimeoPlayer";

export default function Treatment() {
  const { data, isLoading, error } = useTreatmentProjects();
  const { language } = useLanguage();
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();

  if (error || profileError) return <ErrorPage error={error} />;

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
      className="no-doc-scroll fixed inset-0 z-20 flex w-full origin-left justify-center bg-black"
    >
      {isLoading || (isProfileLoading && <Loading />)}

      <motion.div
        initial={{ opacity: 0, scaleX: 1 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        exit={{
          opacity: 0,
          scaleX: 1,
          transition: { duration: 0.15 },
        }}
        className="flex flex-col justify-center gap-8 px-8 py-16"
      >
        {profile?.treatmentsVideo && (
          <div className="w-1/2">
            <VimeoPlayer
              url={profile.treatmentsVideo}
              autoplay={1}
              loop={1}
              controls={0}
            />
          </div>
        )}

        {profile?.treatmentsText?.es && (
          <div className="mx-auto w-[80vw] max-w-7xl columns-2 flex-col gap-4 pt-8">
            <PortableText
              value={
                profile.treatmentsText[language] || profile.treatmentsText.es
              }
            />
          </div>
        )}

        {profile?.isTreatmentsListVisible && (
          <div className="flex flex-col overflow-y-auto px-8 pt-8">
            {data?.map((project) => (
              <div key={project._id} className="grid grid-cols-2 gap-4">
                {project.title && (
                  <h2 className="font-display justify-self-end leading-none font-black">
                    {project.title[language]}
                  </h2>
                )}
                {project?.description?.es && (
                  <div className="font-mono text-xs">
                    <PortableText
                      value={
                        project.description[language] ?? project.description.es
                      }
                      components={BlockContentComponent}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
