// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      setError("Respuesta inválida del servidor");
      setLoading(false);
      return;
    }

    if (!res.ok || data.ok === false) {
      setError(data.message || "Error al iniciar sesión");
      setLoading(false);
      return;
    }

    // Redirige en base al tipo real que llegó en data.user.tipoUsuario
    router.push(
      data.user.tipoUsuario === "doctor"
        ? "/dashboard/doctor"
        : "/dashboard/patient"
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h1 className="text-2xl font-semibold text-center">Iniciar Sesión</h1>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
