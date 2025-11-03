import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

interface VimeoBackgroundProps {
  backgroundImageUrl: string | null;
  vimeoId?: string;
  vimeoHash?: string;
}

export default function VimeoBackground({
  backgroundImageUrl,
  vimeoId = "920256294",
  vimeoHash = "514a358307",
  isVisible = true,
}: VimeoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);

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
  }, [vimeoId]);

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 -z-10 h-screen w-full overflow-hidden`}
      >
        <img
          src={backgroundImageUrl + "?fm=webp"}
          alt=""
          className="absolute inset-0 h-full w-full scale-100 object-cover"
        />
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
                borderRadius: "30vw",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              exit={{ opacity: 0 }}
              title={vimeoId}
            ></motion.iframe>
          )}
        </div>
      </div>

      {/* <div
        className="bg-background/15 pointer-events-none absolute inset-0 backdrop-blur-md"
        style={{
          maskImage: `
              radial-gradient(ellipse 60% 70% at center, transparent 50%, black 90%)
            `,
          WebkitMaskImage: `
              radial-gradient(ellipse 60% 70% at center, transparent 50%, black 90%)
            `,
        }}
      /> */}

      {/* <div className="pointer-events-none fixed inset-0 h-screen w-full bg-[#c1c9bf67] mix-blend-color-burn"></div> */}
    </>
  );
}
