import type { ProjectQueryResult } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import useLanguage from "@/hooks/useLanguage";
import ImageGallery from "./ImageGallery";
import useIsMobile from "@/hooks/useIsMobile";

interface ProjectInfoProps {
  data: ProjectQueryResult | undefined;
}
export default function ProjectInfo({ data }: ProjectInfoProps) {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="mx-auto flex w-[80vw] flex-col items-center justify-center gap-16 pt-16">
      <div className="flex w-full items-start">
        <p className="max-w-prose text-lg">
          {data?.description?.es && (
            <PortableText
              value={data.description[language] || data.description.es}
            />
          )}
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="col-span-2">
          <div className="">
            {data?.images && <ImageGallery images={data.images} />}
          </div>
        </div>

        <div className="text-background">
          {data?.credits &&
            data.credits.map((credit) => (
              <div key={credit._key}>
                {credit.role?.es && !isMobile && (
                  <>
                    <span className="font-mono text-xs uppercase">
                      {credit.role[language] || credit.role.es}:{" "}
                    </span>
                    <span>{credit.name}</span>
                  </>
                )}
                {credit.role?.es && isMobile && (
                  <div className="mb-1 flex flex-col">
                    <span className="font-mono text-xs uppercase">
                      {credit.role[language] || credit.role.es}
                    </span>
                    <span>{credit.name}</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
