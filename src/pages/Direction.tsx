import { useDirectionProjects } from "@/hooks/useDirectionProjects";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";

export default function Direction() {
  const { data, isLoading, error } = useDirectionProjects();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <h1 className="text-xl font-bold">
        {language === "en" ? "Direction" : "Dirección"}
      </h1>
      {data?.length ? (
        data.map((project) => {
          const title =
            language === "en"
              ? project.title?.en || project.title?.es
              : project.title?.es || project.title?.en;

          return <div key={project._id}>{title ?? <em>Untitled</em>}</div>;
        })
      ) : (
        <p>🤔</p>
      )}
    </section>
  );
}
