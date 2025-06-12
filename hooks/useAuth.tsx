// hooks/useAuth.ts
"use client";

import useSWR from "swr";

export interface User {
  id: number;
  nombreUsuario: string;
  correo: string;
  tipoUsuario: "patient" | "doctor";
  ultimaConexion: string | null;
  registroPaciente?: {
    usuarioId: number;
    nombres: string;
    apellidos: string;
    dni: number;
    direccion?: string | null;
    telefono?: number | null;
    fechaCreacion: string;
  };
}

async function fetcher(url: string): Promise<{ user: User }> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    throw new Error("No autorizado");
  }
  return res.json();
}

export default function useAuth() {
  const { data, error, mutate } = useSWR<{ user: User }>("/api/auth/me", fetcher);

  const loading = !data && !error;
  const user = data?.user || null;

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      mutate(undefined, { revalidate: false });
      // Redirigir a la homepage usando la API del navegador
      window.location.href = "/";
    }
  };

  return { user, loading, error, logout };
}
