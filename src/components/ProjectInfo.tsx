import type { ProjectQueryResult } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanityImageUrl";

interface ProjectInfoProps {
  data: ProjectQueryResult | undefined;
  handleClose: () => void;
}
export default function ProjectInfo({ data, handleClose }: ProjectInfoProps) {
  return (
    <div className="fixed inset-0 z-100 flex h-screen w-full flex-col items-center justify-center bg-black/90">
      {data?.title && <h1>{data.title.es}</h1>}
      {data?.description?.es && <PortableText value={data.description.es} />}
      {data?.credits &&
        data.credits.map((credit) => (
          <div key={credit._key}>{credit.name}</div>
        ))}
      <div className="flex overflow-auto">
        {data?.images &&
          data.images.map((image) => (
            <img
              key={image._key}
              src={urlFor(image).format("webp").width(300).url()}
            />
          ))}
      </div>
      <button onClick={handleClose}>cerrar</button>
    </div>
  );
}
