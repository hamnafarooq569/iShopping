"use client"

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, fetchUser, loginUser, userLogout, userSigunp } from "../services/api";
import { useRouter } from "next/navigation";


export const useSignup = () => {


  return useMutation({
    mutationFn: userSigunp,

    onSuccess: (data) => {
      console.log("Signup success:", data);

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
    },

    onError: (error) => {
      console.log("Signup error:", error.message);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

     queryClient.setQueryData(["me"], data?.user || null);
    },

    onError: (error) => {
      console.log("Login error:", error.message);
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: userLogout,

    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.removeQueries();
      queryClient.setQueryData(["me"], null);

      router.push("/login");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,

    onSuccess: (data) => {
      console.log("Password changed:", data);
    },

    onError: (error) => {
      console.log("Change password error:", error.message);
    },
  });
};