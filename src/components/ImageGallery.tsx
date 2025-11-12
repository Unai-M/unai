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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.025 }}
            key={image._key}
            className={`${isMobile ? "" : "cursor-pointer"} mb-8 break-inside-avoid-column rounded-sm`}
            onClick={() => {
              if (!isMobile) {
                setCurrentImage(urlFor(image).format("webp").height(800).url());
                setIsLightboxOpen(true);
              }
            }}
            style={{
              backgroundImage: `url(${urlFor(image).format("webp").height(10).blur(10).url()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: `${image.dimensions?.aspectRatio}/1`,
            }}
          >
            <img
              src={urlFor(image).format("webp").height(1000).url()}
              // alt={image.alt}
              className="w-full rounded-sm transition-opacity duration-300"
              loading="lazy"
              style={{ opacity: 0 }}
              // FIX: arreglar type error
              onLoad={(e) => {
                e.target.style.opacity = 1;
              }}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
