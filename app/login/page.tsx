"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>, userType: string) => {
    e.preventDefault()
    setIsLoading(true)
    const form = e.target as HTMLFormElement
    const nameInput = form.querySelector<HTMLInputElement>("#patient-name")
    const name = nameInput?.value || ""

    if (userType === "patient" && name) {
      localStorage.setItem("patientName", name)
    }

    setTimeout(() => {
      setIsLoading(false)
      if (userType === "doctor") {
        router.push("/dashboard/doctor")
      } else {
        router.push("/dashboard/patient")
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header fijo arriba */}
      <Header />

      {/* Contenido principal con espaciado */}
      <main className="flex-grow py-12">
        <div className="container flex flex-col items-center justify-center">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Iniciar Sesión</h1>
              <p className="text-sm text-muted-foreground">Ingrese sus credenciales para acceder</p>
            </div>

            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient">Paciente</TabsTrigger>
                <TabsTrigger value="doctor">Doctor</TabsTrigger>
              </TabsList>

              {/* Paciente */}
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
                        <Input id="patient-name" type="text" placeholder="Juan Pérez" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-email">Correo electrónico</Label>
                        <Input id="patient-email" type="email" placeholder="paciente@ejemplo.com" required />
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
                        <Input id="patient-password" type="password" required />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              {/* Doctor */}
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
                        <Input id="doctor-email" type="email" placeholder="doctor@ejemplo.com" required />
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
                        <Input id="doctor-password" type="password" required />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
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

      {/* Footer fijo abajo */}
      <Footer />
    </div>
  )
}
