import { useState } from "react";
import type { ProjectQueryResult } from "@/lib/types";
import { motion, AnimatePresence } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";
import Lightbox from "./Lightbox";
import { urlFor } from "../lib/sanityImageUrl";

type ProjectImages = NonNullable<NonNullable<ProjectQueryResult>["images"]>;

interface ImageGalleryProps {
  images: ProjectImages;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const isMobile = useIsMobile();

  return (
    <>
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            key="lightbox"
            currentImage={currentImage}
            setIsLightboxOpen={setIsLightboxOpen}
          />
        )}
      </AnimatePresence>

      <div className="columns-1 gap-8 pt-4 transition-all duration-300 sm:columns-2 md:columns-3 md:px-4 xl:columns-4 2xl:columns-5">
        {images.map((image) => (
          <motion.div
            key={image._key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.025 }}
            className={`mb-8 break-inside-avoid-column rounded-sm ${
              isMobile ? "" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!isMobile) {
                setCurrentImage(urlFor(image).format("webp").height(800).url());
                setIsLightboxOpen(true);
              }
            }}
            style={{
              backgroundImage: `url(${urlFor(image)
                .format("webp")
                .height(10)
                .blur(10)
                .url()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: `${image.dimensions?.aspectRatio}/1`,
            }}
          >
            <img
              src={urlFor(image).format("webp").height(1000).url()}
              alt={""}
              className="w-full rounded-sm transition-opacity duration-300"
              loading="lazy"
              onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.opacity = "1";
              }}
              style={{ opacity: 0 }}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
