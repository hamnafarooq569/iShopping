import { useQuery } from "@tanstack/react-query";
import { fetchMenus} from "../services/api";

export const useMenus = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: fetchMenus,
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};