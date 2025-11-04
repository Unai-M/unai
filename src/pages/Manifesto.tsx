import { PortableText } from "@portabletext/react";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { BlockContentComponent } from "../components/BlockContentComponent";
import ErrorPage from "./ErrorPage";

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
    <div className="mx-auto flex w-[80vw] max-w-prose flex-col gap-2 py-24">
      <PortableText
        value={Array.isArray(manifesto) ? manifesto : []}
        components={BlockContentComponent}
      />
    </div>
  );
}
