import { useDirectionProjects } from "@/hooks/useDirectionProjects";
import Loading from "@/components/Loading";

export default function Direction() {
  const { data, isLoading, error } = useDirectionProjects();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div>Direccion</div>
      {data &&
        data.map((project) => (
          <div key={project._id}>{project.title && project.title.es}</div>
        ))}
    </>
  );
}
