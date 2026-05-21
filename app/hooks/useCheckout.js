import { useMutation } from "@tanstack/react-query";
import { userCheckout } from "../services/api";

export const useCheckout = () => {
  return useMutation({
    mutationFn: userCheckout,
  });
};