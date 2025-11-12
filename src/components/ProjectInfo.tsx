import type { ProjectQueryResult } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import useLanguage from "@/hooks/useLanguage";
import ImageGallery from "./ImageGallery";

interface ProjectInfoProps {
  data: ProjectQueryResult | undefined;
}
export default function ProjectInfo({ data }: ProjectInfoProps) {
  const { language } = useLanguage();

  return (
    <div className="mt-16 mb-32 flex w-full flex-col items-center justify-center">
      <div className="mb-24 flex w-full items-stretch gap-2 px-12">
        <div className="w-2/3 text-xl">
          {data?.description?.es && (
            <PortableText
              value={data.description[language] || data.description.es}
            />
          )}
        </div>
        <div className="w-1/3">
          {data?.credits &&
            data.credits.map((credit) => (
              <div key={credit._key}>
                {credit.role?.es && (
                  <span className="font-mono text-sm">
                    {credit.role[language] || credit.role.es}:{" "}
                  </span>
                )}
                <span>{credit.name}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="w-[80vw]">
        {data?.images && <ImageGallery images={data.images} />}
      </div>
    </div>
  );
}
