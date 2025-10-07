import { useQuery } from "@tanstack/react-query";
import { getTreatmentProjects } from "../lib/treatmentProjectsQuery";

export function useTreatmentProjects() {
  return useQuery({
    queryKey: ["treatmentProjects"],
    queryFn: getTreatmentProjects,
  });
}
