// hooks/useAuth.ts
"use client";

import useSWR from "swr";
import Router from "next/router";

interface User {
  id: number;
  nombreUsuario: string;
  tipoUsuario: "patient" | "doctor";
  // Añade aquí cualquier otro campo que devuelva /api/auth/me
}

async function fetcher(url: string): Promise<{ user: User }> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    throw new Error("No autorizado");
  }
  return await res.json();
}

export default function useAuth() {
  // SWR devuelve { data, error, mutate }
  const { data, error, mutate } = useSWR<{ user: User }>("/api/auth/me", fetcher);

  const loading = !data && !error;
  const user = data?.user || null;

  const logout = async () => {
    // Llama a tu endpoint de logout para borrar la cookie
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    // Invalidar cache y redirigir al login
    mutate(undefined, { revalidate: false });
    Router.push("/login");
  };

  return { user, loading, error, logout };
}
