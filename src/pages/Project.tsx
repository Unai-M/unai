import { useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router";
import { motion } from "motion/react";
import { useProject } from "@/hooks/useProject";
import Loading from "@/components/Loading";
import ErrorPage from "./ErrorPage";
import VimeoPlayer from "@/components/VimeoPlayer";
import ProjectInfo from "@/components/ProjectInfo";
import { X } from "lucide-react";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useProject(slug!);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="no-doc-scroll fixed inset-0 z-[100] flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
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
          <div className="mb-4 flex w-full justify-between gap-2 px-4">
            <div className="flex items-center gap-3">
              {data?.title && <h1>{data.title.es}</h1>}
              <button onClick={() => setInfoOpen(!infoOpen)}>info</button>
            </div>
            <NavLink to="/">
              <X />
            </NavLink>
          </div>

          {data?.vimeoId && (
            <div className="w-[80vw]">
              <VimeoPlayer url={data.vimeoId} />
            </div>
          )}

          {infoOpen && (
            <ProjectInfo data={data} handleClose={() => setInfoOpen(false)} />
          )}
        </>
      )}
    </motion.section>
  );
}
