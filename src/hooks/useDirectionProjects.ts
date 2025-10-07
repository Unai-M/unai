import { useQuery } from "@tanstack/react-query";
import { getDirectionProjects } from "../lib/directionProjectsQuery";

export function useDirectionProjects() {
  return useQuery({
    queryKey: ["directionProjects"],
    queryFn: getDirectionProjects,
  });
}
