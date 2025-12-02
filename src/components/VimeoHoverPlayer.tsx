import React, { useRef, useEffect } from "react";
import Player from "@vimeo/player";
import { getVimeoId } from "../utils/getVimeoId";

interface VimeoHoverPlayerProps {
  videoEmbed: string;
  imageUrl: string;
  className?: string;
  isHovering: boolean;
}

const VimeoHoverPlayer: React.FC<VimeoHoverPlayerProps> = ({
  videoEmbed = "",
  className = "",
  imageUrl,
  isHovering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const { id: videoId, hash } = getVimeoId(videoEmbed);

  useEffect(() => {
    if (!containerRef.current || !videoId) return;

    const playerOptions: {
      url?: string;
      id?: number;
      controls: boolean;
      title: boolean;
      byline: boolean;
      portrait: boolean;
      muted: boolean;
      loop: boolean;
      autopause: boolean;
      autoplay: boolean;
      quality: string;
      pip: boolean;
      responsive: boolean;
    } = {
      controls: false,
      title: false,
      byline: false,
      portrait: false,
      muted: true,
      loop: true,
      autopause: false,
      autoplay: false,
      quality: "360p",
      pip: false,
      responsive: true,
    };

    if (hash) {
      playerOptions.url = `https://vimeo.com/${videoId}/${hash}`;
    } else {
      playerOptions.id = parseInt(videoId, 10);
    }

    playerRef.current = new Player(
      containerRef.current,
      playerOptions as Record<string, unknown>,
    );

    playerRef.current.ready().then(() => {
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.setCurrentTime(0);
        playerRef.current.setQuality("360p").catch(() => {
          playerRef.current?.setQuality("540p").catch(() => {});
        });
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, hash]);

  useEffect(() => {
    const controlPlayback = async () => {
      if (!playerRef.current) return;

      try {
        if (isHovering) {
          await playerRef.current.play();
        } else {
          await playerRef.current.pause();
        }
      } catch (error) {
        console.error("Error controlling video:", error);
      }
    };

    controlPlayback();
  }, [isHovering]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <img className="w-full" src={imageUrl} alt="" />
      </div>
      <div
        ref={containerRef}
        className={`pointer-events-none transition-opacity duration-400 ease-in-out ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default VimeoHoverPlayer;
