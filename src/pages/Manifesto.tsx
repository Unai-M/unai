import { PortableText } from "@portabletext/react";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { BlockContentComponent } from "../components/BlockContentComponent";
import ErrorPage from "./ErrorPage";
import { ArrowBigDownDash } from "lucide-react";
import { motion } from "motion/react";

export default function Manifesto() {
  const { data: profile, isLoading: isProfileLoading, error } = useProfile();
  const { language } = useLanguage();

  if (isProfileLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  const manifesto =
    language === "en"
      ? profile?.manifesto?.en || profile?.manifesto?.es
      : profile?.manifesto?.es || profile?.manifesto?.en;

  return (
    <motion.div
      className="mx-auto flex w-[80vw] max-w-prose flex-col gap-2 py-24"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <PortableText
        value={Array.isArray(manifesto) ? manifesto : []}
        components={BlockContentComponent}
      />
      <motion.div
        className="mt-6 flex w-full justify-center"
        animate={{ y: 10 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ArrowBigDownDash />
      </motion.div>
    </motion.div>
  );
}
