import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeWishlist, fetchWishList, addWishList } from "@/app/services/api";
import React, { useEffect } from "react";

export const useWishlist = () => {
  const [mounted, setMounted] = React.useState(false);
  const [hasToken, setHasToken] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    setHasToken(!!localStorage.getItem("token"));
  }, []);

  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishList,
    enabled: mounted && hasToken, // only run when user is logged in
    retry: false,
  });
};

export const useAddWishlist = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: addWishList,
    onSuccess: (data) => {
      console.log("WISHLIST ADDED HIT:", data);
      qc.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

export const useRemoveWishlist = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: removeWishlist,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};