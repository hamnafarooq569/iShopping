import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProductReview,
  fetchAllProducts,
  fetchProductById,
} from "../services/api";

export const useProducts = (page = 1, search = "") => {
  return useQuery({
    queryKey: ["products", page, search],
    queryFn: () => fetchAllProducts(page, search),

    keepPreviousData: true,
    staleTime: 0,
    gcTime: 35 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useProductInner = (slug) => {
  return useQuery({
    queryKey: ["productinner", slug],
    queryFn: () => fetchProductById(slug),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddProductReview = () => {
  return useMutation({
    mutationFn: addProductReview,

    onSuccess: (data) => {
      console.log("Product Review:", data);
    },

    onError: (error) => {
      console.log("Product Review error:", error.message);
    },
  });
};