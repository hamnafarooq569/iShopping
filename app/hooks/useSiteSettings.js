import { useQuery } from "@tanstack/react-query";
import { fetchSiteSettings } from "../services/api";

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: fetchSiteSettings,
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};