

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBlogComment, fetchBlogBySlug, fetchBlogs, getBlogComments } from "../services/api";

export const useBlogs = (page) => {
  return useQuery({
    queryKey: ["blogs", page],
    queryFn: () => fetchBlogs(page),
    keepPreviousData: true,
  });
};


export const useBlogDetail = (slug) => {
  return useQuery({
    queryKey: ["blogDetail", slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: !!slug,
  });
};

export const useBlogComments = (slug) => {
return useQuery({
    queryKey: ["blogComment", slug],
    queryFn: () => getBlogComments(slug),
    enabled: !!slug,
  });
  
};

export const useAddBlogComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBlogComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogComment"],
      });
    },
  });
};