import { useProfile } from "@/hooks/useProfile";
import useLanguage from "@/hooks/useLanguage";
import VimeoPlayer from "../components/VimeoPlayer";
import Loading from "@/components/Loading";
import ErrorPage from "./ErrorPage";
import { motion } from "motion/react";

export default function ManifestoFilm() {
  const { data: profile, isLoading: isProfileLoading, error } = useProfile();
  const { language } = useLanguage();

  if (isProfileLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      {profile?.manifestoVimeoId && (
        <>
          <motion.div
            className="w-[80vw]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <VimeoPlayer url={profile.manifestoVimeoId} />
          </motion.div>
          {profile.note && (
            <p className="mt-2 px-8 font-mono text-xs opacity-70">
              {profile.note[language] || profile.note.es}
            </p>
          )}
        </>
      )}
    </>
  );
}
