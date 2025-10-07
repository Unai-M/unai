import NavMenu from "./components/NavMenu";
import { useProfile } from "./hooks/useProfile";
import { Routes, Route } from "react-router";

function App() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  if (isProfileLoading) return <div>...</div>;
  if (profileError) return <div>{profileError.message}</div>;

  return (
    <>
      {profile?.name && <h1 className="text-3xl font-bold">{profile.name}</h1>}
      <NavMenu />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/info" element={<div>Info</div>} />
        <Route path="/direccion" element={<div>Direccion</div>} />
        <Route path="/tratamiento" element={<div>Tratamiento</div>} />
        <Route path="/manifiesto" element={<div>Manifiesto</div>} />
      </Routes>
    </>
  );
}

export default App;
