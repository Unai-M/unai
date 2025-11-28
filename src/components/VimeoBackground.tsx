import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getVimeoId } from "@/utils/getVimeoId";
import { useProfile } from "@/hooks/useProfile";
import ErrorPage from "../pages/ErrorPage";

interface VimeoBackgroundProps {
  isVisible: boolean;
}

export default function VimeoBackground({
  isVisible = true,
}: VimeoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);
  const { data, isLoading, error } = useProfile();
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(data?.reelVimeoId ?? "");

  useEffect(() => {
    setIsLoaded(false);

    interface VimeoMessageData {
      event?: string;
      [key: string]: unknown;
    }

    interface VimeoMessageEvent extends MessageEvent {
      data: string;
      origin: string;
    }

    const handleMessage = (event: VimeoMessageEvent) => {
      if (!event.origin.includes("vimeo.com")) return;
      try {
        const data: VimeoMessageData = JSON.parse(event.data);
        if (data.event === "ready") {
          setTimeout(() => setIsLoaded(true), 2000);
        }
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [vimeoId, vimeoHash]);

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 -z-10 h-screen w-full overflow-hidden`}
      >
        <div
          style={{
            padding: "0",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            position: "relative",
          }}
          className="relative h-full w-full scale-100 object-cover transition-opacity duration-500 select-none"
        >
          {isVisible && (
            <motion.iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&mute=1&quality=720p&loop=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{
                boxSizing: "border-box",
                width: "177.77777778vh",
                height: "56.25vw",
                minWidth: "100%",
                minHeight: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              exit={{ opacity: 0 }}
              // title={vimeoId}
            ></motion.iframe>
          )}

          <AnimatePresence>
            {(!isLoaded || isLoading) && (
              <motion.div
                initial={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleY: 0, scaleX: 10 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-accent fixed inset-0 z-1000 flex h-screen w-full origin-bottom items-center justify-center"
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
