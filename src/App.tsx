import NavMenu from "./components/NavMenu";
import { Routes, Route, useLocation } from "react-router";
import Direction from "./pages/Direction";
import Project from "./pages/Project";
import Treatments from "./pages/Treatments";
import Manifesto from "./pages/Manifesto";
import Noise from "./components/Noise";
import { useRef, useEffect, useState } from "react";
import { useInView, AnimatePresence } from "motion/react";
import Crosshair from "./components/Crosshair";
import Archive from "./pages/Archive";
import VimeoBackground from "./components/VimeoBackground";
import BackgroundDecorations from "./components/BackgroundDecorations";
import LanguageToggle from "@/components/LanguageToggle";
import ManifestoFilm from "./pages/ManifestoFilm";
import ManifestoFilmBackground from "./components/ManifestoFilmBackground";
import ContactButton from "./components/ContactButton";

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

  const getCrosshairText = () => {
    switch (location.pathname) {
      case "/":
        if (isStartInView) return "UNAI MARIA DE AMORRORTU";
        if (isEndInView) return "MANIFIESTO";
        return "DIRECCIÓN";
      case "/info":
        return "INFO";
      case "/tratamientos":
        return "TRATAMIENTOS";
      case "/archivo":
        return "ARCHIVO";
      default:
        return "";
    }
  };

  const shouldShowUI =
    location.pathname === "/"
      ? mounted && !isStartInView && !isManifestoFilmInView
      : true;

  const shouldShowCrosshair = mounted && !isManifestoFilmInView;

  return (
    <>
      <AnimatePresence>
        {!isEndInView && <VimeoBackground isVisible={true} />}
      </AnimatePresence>

      <AnimatePresence>
        {isManifestoFilmInView && <ManifestoFilmBackground key="maniFilmBg" />}
        {shouldShowUI && <BackgroundDecorations key="bgDec" />}
        {shouldShowUI && (
          <NavMenu
            theme={
              isEndInView &&
              location.pathname !== "/tratamientos" &&
              location.pathname !== "/archivo"
                ? "light"
                : "dark"
            }
          />
        )}
      </AnimatePresence>

      {shouldShowCrosshair && (
        <Crosshair color="#ffffff22" text={getCrosshairText()} />
      )}

      <div
        className="_mb-10 pointer-events-none h-screen w-full"
        ref={startRef}
      />

      <section
        id="direction"
        className="_pt-[50vh] flex w-full items-center pb-[50vh]"
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
        className="flex min-h-[100vh] flex-col items-center pb-24"
        ref={endRef}
      >
        <Manifesto />
        <div className="_mt-12 flex flex-col items-center" ref={manifestoFilm}>
          {isEndInView && <ManifestoFilm />}
        </div>
      </section>

      <AnimatePresence>
        {shouldShowUI && (
          <div className="pointer-events-none fixed top-0 right-12 z-120 flex h-screen flex-col justify-center">
            <div className="pointer-events-auto flex flex-col items-center gap-2">
              <ContactButton />
              <LanguageToggle />
            </div>
          </div>
        )}
      </AnimatePresence>

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
