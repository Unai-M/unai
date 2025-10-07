import { PortableText } from "@portabletext/react";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";

export default function Manifiesto() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  if (isProfileLoading) return <Loading />;
  if (profileError) return <div>{profileError.message}</div>;

  return (
    <>
      {profile?.manifesto?.es && <PortableText value={profile.manifesto.es} />}
    </>
  );
}
