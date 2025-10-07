import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../lib/profileQuery";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}
