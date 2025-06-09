// components/auth/LoginForm.tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormField } from "@/components/ui/FormField"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { postLogin } from "@/utils/api"

// Esquema de validación
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

export function LoginForm({ userType }: { userType: "patient" | "doctor" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      await postLogin({ ...data, userType })
      // al hacer login guardamos cookie httpOnly y redirigimos
      router.push(`/dashboard/${userType}`)
    } catch (err: any) {
      // Mostrar toast o poner error global
      console.error(err)
      alert(err.message || "Error al iniciar sesión")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField htmlFor="email" label="Correo electrónico" error={errors.email?.message}>
        <Input id="email" type="email" {...register("email")} />
      </FormField>
      <FormField htmlFor="password" label="Contraseña" error={errors.password?.message}>
        <Input id="password" type="password" {...register("password")} />
      </FormField>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
      </Button>
    </form>
  )
}
