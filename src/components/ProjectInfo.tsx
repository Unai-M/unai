import type { ProjectQueryResult } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanityImageUrl";
import useLanguage from "@/hooks/useLanguage";

interface ProjectInfoProps {
  data: ProjectQueryResult | undefined;
}
export default function ProjectInfo({ data }: ProjectInfoProps) {
  const { language } = useLanguage();

  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center">
      {data?.description?.es && (
        <PortableText
          value={data.description[language] || data.description.es}
        />
      )}
      {data?.credits &&
        data.credits.map((credit) => (
          <div key={credit._key}>{credit.name}</div>
        ))}
      <div className="mt-8 flex overflow-auto">
        {data?.images &&
          data.images.map((image) => (
            <img
              key={image._key}
              src={urlFor(image).format("webp").width(300).url()}
            />
          ))}
      </div>
    </div>
  );
}
