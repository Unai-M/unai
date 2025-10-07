import NavMenu from "./components/NavMenu";
import { useProfile } from "./hooks/useProfile";
import { Routes, Route } from "react-router";
import Direction from "./pages/Direction";
import Treatment from "./pages/Treatment";
import Manifesto from "./pages/Manifiesto";
import Loading from "./components/Loading";

function App() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  if (isProfileLoading) return <Loading />;
  if (profileError) return <div>{profileError.message}</div>;

  return (
    <>
      {profile?.name && <h1 className="text-3xl font-bold">{profile.name}</h1>}
      <NavMenu />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/info" element={<div>Info</div>} />
        <Route path="/direccion" element={<Direction />} />
        <Route path="/tratamiento" element={<Treatment />} />
        <Route path="/manifiesto" element={<Manifesto />} />
      </Routes>
    </>
  );
}

export default App;
