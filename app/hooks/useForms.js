import { useMutation } from "@tanstack/react-query";
import { contactForm, postServiceForm, subscribeForm } from "../services/api";

export const useContact = () => {


  return useMutation({
    mutationFn: contactForm,

    onSuccess: (data) => {
      console.log("contact form:", data);

          },

    onError: (error) => {
      console.log("contact error:", error.message);
    },
  });
};

export const useSubscribe = () => {


  return useMutation({
    mutationFn: subscribeForm,

    onSuccess: (data) => {
      console.log("subscribe form:", data);

          },

    onError: (error) => {
      console.log("subscribe error:", error.message);
    },
  });
};

export const useServiceForm = () =>{
  return useMutation({
    mutationFn: postServiceForm,

    onSuccess: (data) => {
      console.log("subscribe form:", data);

          },

    onError: (error) => {
      console.log("subscribe error:", error.message);
    },
  });
};

