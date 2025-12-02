import { useTreatmentProjects } from "@/hooks/useTreatmentProjects";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { motion } from "motion/react";
import { useBlockContentComponents } from "@/components/BlockContentComponent";
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
  const components = useBlockContentComponents();

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
      className="no-doc-scroll scrollbar-hidden fixed inset-0 z-20 flex w-full origin-left justify-center overflow-y-auto bg-black pt-16 pb-32"
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
        className="my-auto h-fit"
      >
        <div className="fixed top-0 left-0 flex w-full items-start justify-center px-2 pt-1 uppercase">
          <h1 className="font-display text-4xl">
            {language === "es" ? "Tratamientos" : "Treatments"}
          </h1>
        </div>
        <div className="mx-auto w-[80vw] max-w-7xl columns-1 flex-col gap-4 pt-8">
          {profile?.treatmentsVideo && (
            <div className="mb-4 w-full">
              <VimeoPlayer
                url={profile.treatmentsVideo}
                autoplay={1}
                loop={1}
                controls={0}
                muted={1}
              />
            </div>
          )}

          {profile?.treatmentsText?.es && (
            <div className="mb-4 text-center font-mono text-xs opacity-70">
              <PortableText
                value={
                  profile.treatmentsText[language] || profile.treatmentsText.es
                }
                components={components}
              />
            </div>
          )}
        </div>

        {profile?.isTreatmentsListVisible && (
          <div className="flex flex-col px-8 pt-8">
            {data?.map((project) => (
              <div key={project._id} className="grid gap-4 sm:grid-cols-2">
                {project.title && (
                  <h2 className="font-display leading-none font-black sm:justify-self-end">
                    {project.title[language]}
                  </h2>
                )}
                {project?.description?.es && (
                  <div className="font-mono text-xs">
                    <PortableText
                      value={
                        project.description[language] ?? project.description.es
                      }
                      components={components}
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
