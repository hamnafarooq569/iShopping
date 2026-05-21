"use client";

import Login from "@/components/otherPages/Login";
import { useLogin } from "@/app/hooks/useAuth";

export default function LoginWrapper() {
  const { mutateAsync: login, isPending } = useLogin();

  return <Login onSubmit={login} isLoading={isPending} />;
}