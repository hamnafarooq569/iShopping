import { useQuery } from "@tanstack/react-query";
import { getServices } from "../services/api";

export const useService = () => {
  return useQuery({
    queryKey: ["service"],
    queryFn: getServices,
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};