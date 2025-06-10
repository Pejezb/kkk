"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { postLogin } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    userType: "patient" | "doctor"
  ) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (
      form.querySelector<HTMLInputElement>(
        userType === "patient" ? "#patient-email" : "#doctor-email"
      )!
    ).value;
    const password = (
      form.querySelector<HTMLInputElement>(
        userType === "patient" ? "#patient-password" : "#doctor-password"
      )!
    ).value;

    try {
      await postLogin({ email, password, userType });

      if (userType === "patient") {
        const name = (form.querySelector<HTMLInputElement>("#patient-name")!).value;
        localStorage.setItem("patientName", name);
      }

      router.push(`/dashboard/${userType}`);
    } catch (err: any) {
      setError(err.message || "Ha ocurrido un error al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container flex flex-col items-center justify-center">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Iniciar Sesión
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingrese sus credenciales para acceder
              </p>
            </div>

            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient">Paciente</TabsTrigger>
                <TabsTrigger value="doctor">Doctor</TabsTrigger>
              </TabsList>

              {/** Paciente */}
              <TabsContent value="patient">
                <Card>
                  <CardHeader>
                    <CardTitle>Acceso de Paciente</CardTitle>
                    <CardDescription>Acceda a su portal personal</CardDescription>
                  </CardHeader>
                  <form onSubmit={(e) => handleLogin(e, "patient")}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-name">Nombre</Label>
                        <Input
                          id="patient-name"
                          type="text"
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-email">Correo electrónico</Label>
                        <Input
                          id="patient-email"
                          type="email"
                          placeholder="paciente@ejemplo.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="patient-password">Contraseña</Label>
                          <Link
                            href="/forgot-password"
                            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                          >
                            ¿Olvidó su contraseña?
                          </Link>
                        </div>
                        <Input
                          id="patient-password"
                          type="password"
                          required
                        />
                      </div>

                      {/* Mensaje de error */}
                      {error && (
                        <p className="text-center text-sm text-red-600">
                          {error}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              {/** Doctor */}
              <TabsContent value="doctor">
                <Card>
                  <CardHeader>
                    <CardTitle>Acceso de Doctor</CardTitle>
                    <CardDescription>Acceda al panel de administración</CardDescription>
                  </CardHeader>
                  <form onSubmit={(e) => handleLogin(e, "doctor")}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-email">Correo electrónico</Label>
                        <Input
                          id="doctor-email"
                          type="email"
                          placeholder="doctor@ejemplo.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="doctor-password">Contraseña</Label>
                          <Link
                            href="/forgot-password"
                            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                          >
                            ¿Olvidó su contraseña?
                          </Link>
                        </div>
                        <Input
                          id="doctor-password"
                          type="password"
                          required
                        />
                      </div>

                      {/* Mensaje de error */}
                      {error && (
                        <p className="text-center text-sm text-red-600">
                          {error}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>

            <p className="px-8 text-center text-sm text-muted-foreground">
              Si no tiene credenciales de acceso, por favor contacte con la consulta para obtenerlas.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
