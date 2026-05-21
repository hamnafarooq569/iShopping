import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../services/api";

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 30 * 60 * 1000,
    gcTime: 35 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};