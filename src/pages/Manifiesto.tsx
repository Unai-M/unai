import { PortableText } from "@portabletext/react";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";

export default function Manifiesto() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  const { language } = useLanguage();

  if (isProfileLoading) return <Loading />;
  if (profileError) return <div>{profileError.message}</div>;

  const manifesto =
    language === "en"
      ? profile?.manifesto?.en || profile?.manifesto?.es
      : profile?.manifesto?.es || profile?.manifesto?.en;

  return (
    <section>
      <PortableText value={Array.isArray(manifesto) ? manifesto : []} />
    </section>
  );
}
