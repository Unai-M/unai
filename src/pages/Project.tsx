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
      className="no-doc-scroll fixed inset-0 z-[100] flex w-full flex-col items-center overflow-y-scroll bg-black py-24"
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

          <div className="fixed top-0 left-0 flex w-full items-start justify-between px-2 pt-1 uppercase">
            <h1 className="font-display text-4xl font-black">
              {data?.title?.es && (data.title[language] || data.title.es)}
            </h1>

            <button
              className="cursor-pointer transition-colors hover:text-amber-500"
              onClick={() => navigate(-1)}
            >
              {/* TODO: add language */}
              VOLVER
            </button>
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
