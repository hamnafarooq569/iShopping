import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProductsByCategories} from "../services/api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};


export const useProductWithCategories = (slug = "all") => {
  return useQuery({
    queryKey: ["category-products", slug],
    queryFn: () => fetchProductsByCategories(slug),
    enabled: true,
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};