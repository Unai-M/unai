import { PortableText } from "@portabletext/react";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { BlockContentComponent } from "../components/BlockContentComponent";
import FloatingWindow from "@/components/ui/FloatingWindow";
import ErrorPage from "./ErrorPage";

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
    <FloatingWindow>
      <div>
        <PortableText
          value={Array.isArray(about) ? about : []}
          components={BlockContentComponent}
        />
      </div>
    </FloatingWindow>
  );
}
