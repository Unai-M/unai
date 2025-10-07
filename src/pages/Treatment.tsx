import { useTreatmentProjects } from "@/hooks/useTreatmentProjects";
import Loading from "@/components/Loading";

export default function Treatment() {
  const { data, isLoading, error } = useTreatmentProjects();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div>Tratamiento</div>
      {data &&
        data.map((project) => (
          <div key={project._id}>{project.title && project.title.es}</div>
        ))}
    </>
  );
}
