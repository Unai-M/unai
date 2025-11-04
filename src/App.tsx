import NavMenu from "./components/NavMenu";
import { Routes, Route, useLocation } from "react-router";
import Direction from "./pages/Direction";
import Project from "./pages/Project";
import Treatments from "./pages/Treatments";
import Manifesto from "./pages/Manifesto";
import Noise from "./components/Noise";
import { useRef, useEffect } from "react";
import { useInView, AnimatePresence } from "motion/react";
import Crosshair from "./components/Crosshair";
import Info from "./pages/Info";
import VimeoBackground from "./components/VimeoBackground";
import BackgroundDecorations from "./components/BackgroundDecorations";
import LanguageToggle from "@/components/LanguageToggle";

function App() {
  const startRef = useRef(null);
  const endRef = useRef(null);
  const isStartInView = useInView(startRef, {
    margin: "-320px 0px 0px 320px",
  });
  const isEndInView = useInView(endRef);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({
          behavior: location.state?.smooth ? "smooth" : "auto",
        });
      }
      // clear state so it doesn’t scroll again on refresh
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
      default:
        return "";
    }
  };

  return (
    <>
      <AnimatePresence>{!isEndInView && <VimeoBackground />}</AnimatePresence>

      <AnimatePresence>
        {!isStartInView && <BackgroundDecorations key="bgDec" />}
        {!isStartInView && (
          <NavMenu
            theme={
              isEndInView && location.pathname !== "/tratamientos"
                ? "light"
                : "dark"
            }
          />
        )}
      </AnimatePresence>

      <Crosshair color="#ffffff22" text={getCrosshairText()} />

      <div
        className="_mb-10 pointer-events-none h-screen w-full"
        ref={startRef}
      />

      <section
        id="direction"
        className="_pt-[50vh] flex w-full items-center pb-[50vh]"
      >
        <Direction />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<div />} />
            <Route path=":slug" element={<Project />} />
            <Route path="/tratamientos" element={<Treatments />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </AnimatePresence>
      </section>

      <section
        id="manifiesto"
        className="flex min-h-[100vh] items-center"
        ref={endRef}
      >
        {/* <div className="h-screen w-full rounded-[30vw] bg-blue-600" /> */}
        <Manifesto />
      </section>

      {!isStartInView && (
        <div className="fixed top-1/2 right-12">
          <LanguageToggle />
        </div>
      )}
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
