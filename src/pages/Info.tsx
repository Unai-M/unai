import { NavLink } from "react-router";
import { PortableText } from "@portabletext/react";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { BlockContentComponent } from "../components/BlockContentComponent";
import ErrorPage from "./ErrorPage";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { urlFor } from "@/lib/sanityImageUrl";

export default function Info() {
  const { data: profile, isLoading: isProfileLoading, error } = useProfile();
  const { language } = useLanguage();

  if (isProfileLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  const about =
    language === "en"
      ? profile?.about?.en || profile?.about?.es
      : profile?.about?.es || profile?.about?.en;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex h-screen w-full items-center justify-center backdrop-blur"
    >
      <section className="bg-foreground fixed z-200 min-h-[400px] w-2/3 max-w-[800px] -rotate-6 rounded-[300px] p-24 text-xl text-black/80 drop-shadow">
        <PortableText
          value={Array.isArray(about) ? about : []}
          components={BlockContentComponent}
        />
        {profile?.image && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="glow absolute -top-10 -left-44 rotate-2"
          >
            <img
              src={urlFor(profile.image).format("webp").size(150, 150).url()}
              className="rounded-full"
            />
          </motion.div>
        )}
        <div className="bg-foreground absolute top-0 right-0 size-12 rotate-6 rounded-full">
          <NavLink to="/">
            <X size={48} />
          </NavLink>
        </div>
      </section>
    </motion.div>
  );
}
