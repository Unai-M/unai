import { useQuery } from "@tanstack/react-query";
import { getDirectionProjectsList } from "../lib/directionProjectsListQuery";

export function useDirectionProjectsList() {
  return useQuery({
    queryKey: ["directionProjectsList"],
    queryFn: getDirectionProjectsList,
  });
}
