import { PortableText } from "@portabletext/react";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";
import { BlockContentComponent } from "../components/BlockContentComponent";
import FloatingWindow from "@/components/ui/FloatingWindow";

export default function Info() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  const { language } = useLanguage();

  if (isProfileLoading) return <Loading />;
  if (profileError) return <div>{profileError.message}</div>;

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
