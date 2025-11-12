import { NavLink, useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useProject } from "@/hooks/useProject";
import Loading from "@/components/Loading";
import ErrorPage from "./ErrorPage";
import VimeoPlayer from "@/components/VimeoPlayer";
import ProjectInfo from "@/components/ProjectInfo";
import Lines from "@/components/Lines";
import useLanguage from "@/hooks/useLanguage";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useProject(slug!);
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="no-doc-scroll fixed inset-0 z-[100] flex w-full flex-col items-center overflow-y-scroll bg-black"
    >
      {isLoading && <Loading />}

      {error ? (
        <>
          <ErrorPage error={error} />
          <div className="mt-4 underline">
            <NavLink to="/">ok</NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="-z-10">
            <Lines />
          </div>
          <div className="mb-8 flex w-full items-center justify-between gap-2 px-12 pt-8">
            <div className="flex items-center gap-3 uppercase">
              {data?.title?.es && (
                <h1 className="font-display text-4xl">
                  {data.title[language] || data.title.es}
                </h1>
              )}
            </div>
            <div className="fixed top-8 right-12 z-120">
              <button
                className="font-display cursor-pointer bg-black"
                onClick={() => navigate(-1)}
              >
                {/* TODO: add language */}
                VOLVER
              </button>
            </div>
          </div>

          {data?.vimeoId && (
            <div className="w-[80vw]">
              <VimeoPlayer autoplay={1} url={data.vimeoId} />
            </div>
          )}

          <ProjectInfo data={data} />
        </>
      )}
    </motion.section>
  );
}
