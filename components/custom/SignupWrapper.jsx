"use client";

import Register from "@/components/otherPages/Register";
import { useSignup } from "@/app/hooks/useAuth";

export default function SignupWrapper() {
  const { mutateAsync: signup, isPending } = useSignup();

  return (
    <Register
      onSubmit={signup}
      isLoading={isPending}
    />
  );
}