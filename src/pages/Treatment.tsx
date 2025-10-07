import { useTreatmentProjects } from "@/hooks/useTreatmentProjects";
import Loading from "@/components/Loading";
import useLanguage from "@/hooks/useLanguage";

export default function Treatment() {
  const { data, isLoading, error } = useTreatmentProjects();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <h1 className="text-xl font-bold">
        {language === "en" ? "Treatment" : "Tratamiento"}
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
