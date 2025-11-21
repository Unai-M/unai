import NavMenu from "./components/NavMenu";
import { Routes, Route, useLocation } from "react-router";
import Direction from "./pages/Direction";
import Project from "./pages/Project";
import Treatments from "./pages/Treatments";
import Manifesto from "./pages/Manifesto";
import Noise from "./components/Noise";
import { useRef, useEffect, useState } from "react";
import { useInView, AnimatePresence } from "motion/react";
import Archive from "./pages/Archive";
import VimeoBackground from "./components/VimeoBackground";
import BackgroundDecorations from "./components/BackgroundDecorations";
import ManifestoFilm from "./pages/ManifestoFilm";
import ManifestoFilmBackground from "./components/ManifestoFilmBackground";
import Sidebar from "./components/Sidebar";

function App() {
  const startRef = useRef(null);
  const endRef = useRef(null);
  const manifestoFilm = useRef(null);
  const [mounted, setMounted] = useState(false);

  const isStartInView = useInView(startRef, {
    margin: "-320px 0px 0px 320px",
  });
  const isEndInView = useInView(endRef);
  const isManifestoFilmInView = useInView(manifestoFilm, {
    amount: 0.8,
  });
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({
          behavior: location.state?.smooth ? "smooth" : "auto",
        });
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const shouldShowUI =
    location.pathname === "/"
      ? mounted && !isStartInView && !isManifestoFilmInView
      : true;

  return (
    <>
      <AnimatePresence>
        {!isEndInView && <VimeoBackground isVisible={true} />}
      </AnimatePresence>

      <div className="text-background absolute flex w-full items-center justify-center font-black">
        <h1 className="font-display _text-[6.5vw] text-[7vw] leading-none tracking-tight [font-variation-settings:'opsz'_80]">
          UNAI MARIA DE AMORRORTU
        </h1>
      </div>

      <AnimatePresence>
        {isManifestoFilmInView && <ManifestoFilmBackground key="maniFilmBg" />}
        {shouldShowUI && <BackgroundDecorations key="bgDec" />}
        {shouldShowUI && <NavMenu />}
      </AnimatePresence>

      <div
        className="_mb-10 pointer-events-none h-screen w-full"
        ref={startRef}
      />

      <section
        id="direction"
        className="flex w-full items-center pt-6 pb-[50vh]"
      >
        <Direction />

        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<div />} />
            <Route path="/direccion/:slug" element={<Project />} />
            <Route path="/tratamientos" element={<Treatments />} />
            <Route path="/archivo" element={<Archive />} />
          </Routes>
        </AnimatePresence>
      </section>

      <section
        id="manifiesto"
        className="flex min-h-[100vh] flex-col items-center"
        ref={endRef}
      >
        <Manifesto />
        <div
          className="flex h-screen flex-col items-center justify-center"
          ref={manifestoFilm}
        >
          {isEndInView && <ManifestoFilm />}
        </div>
      </section>

      <AnimatePresence>{shouldShowUI && <Sidebar />}</AnimatePresence>

      <div className="pointer-events-none fixed inset-0">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={5}
          patternAlpha={10}
        />
      </div>
    </>
  );
}

export default App;
