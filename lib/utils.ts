import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils.ts (o utils/api.ts)
export async function postLogin({
  email,
  password,
  userType,
}: {
  email: string;
  password: string;
  userType: "patient" | "doctor";
}) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, userType }),
  });
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Error al autenticar");
  }
  return res.json();
}

