import { NavLink } from "react-router";
import LanguageToggle from "./LanguageToggle";
import NavMenu from "./NavMenu";
import { useProfile } from "@/hooks/useProfile";
import Loading from "@/components/Loading";

export default function Header() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  if (isProfileLoading) return <Loading />;
  if (profileError) return <div>{profileError.message}</div>;
  return (
    <header className="m-4 flex w-full flex-col items-start justify-between gap-2">
      {profile?.name && (
        <h1 className="text-3xl font-bold">
          <NavLink to="/">{profile.name}</NavLink>
        </h1>
      )}
      <NavMenu />
      <div className="fixed top-4 right-4">
        <LanguageToggle />
      </div>
    </header>
  );
}
