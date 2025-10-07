import Header from "./components/Header";
import { Routes, Route } from "react-router";
import Direction from "./pages/Direction";
import Treatment from "./pages/Treatment";
import Manifesto from "./pages/Manifiesto";

function App() {
  return (
    <>
      <Header />
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
