import { useEffect, useRef } from "react";
import { getVimeoId } from "../utils/getVimeoId";

interface VimeoPlayerProps {
  url: string;
  autoplay?: number;
  background?: number;
  loop?: number;
  quality?: string;
  controls?: number;
}

export default function VimeoPlayer({
  url,
  autoplay = 0,
  background = 0,
  loop = 0,
  quality = "720p",
  controls = 1,
}: VimeoPlayerProps) {
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(url);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const adjustIframeSize = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const container = iframe.parentElement;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const containerRatio = containerWidth / containerHeight;
      const videoRatio = 16 / 9; // Vimeo video aspect ratio

      let iframeWidth: number;
      let iframeHeight: number;

      if (containerRatio > videoRatio) {
        // Container is wider than video - make iframe wider to fill width
        iframeWidth = containerWidth;
        iframeHeight = containerWidth / videoRatio;
      } else {
        // Container is taller than video - make iframe taller to fill height
        iframeHeight = containerHeight;
        iframeWidth = containerHeight * videoRatio;
      }

      // Apply calculated dimensions
      iframe.style.width = `${iframeWidth}px`;
      iframe.style.height = `${iframeHeight}px`;

      // Center the iframe
      iframe.style.left = `${(containerWidth - iframeWidth) / 2}px`;
      iframe.style.top = `${(containerHeight - iframeHeight) / 2}px`;
      iframe.style.position = "absolute";
    };

    adjustIframeSize();
    window.addEventListener("resize", adjustIframeSize);

    return () => {
      window.removeEventListener("resize", adjustIframeSize);
    };
  }, [vimeoId]);

  const src = `https://player.vimeo.com/video/${vimeoId}?${
    vimeoHash ? `h=${vimeoHash}&` : ""
  }badge=0&autopause=0&player_id=0&app_id=58479&background=${background}&autoplay=${autoplay}&quality=${quality}&loop=${loop}&controls=${controls}`;

  return background === 1 ? (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        className={`absolute ${background === 1 ? "pointer-events-none" : ""}`}
        src={src}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </div>
  ) : (
    <div>
      <iframe
        className="aspect-video w-full rounded-2xl"
        src={src}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </div>
  );
}
