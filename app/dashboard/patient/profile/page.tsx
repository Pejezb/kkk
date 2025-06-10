// app/dashboard/patient/profile/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import usePatients, { UsuarioConPaciente, EditarPacientePayload } from "@/hooks/usePatients";

// Si en useAuth te faltaba correo, añade en User: correo: string

export default function ProfilePage() {
  const { user } = useAuth();
  const { patients, updatePatient } = usePatients();
  // Buscar el registro de este usuario
  const paciente = patients.find((p) => p.id === user?.id) as UsuarioConPaciente;
  const registro = paciente?.registroPaciente;

  // Form state
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  // Al cargar, precargar valores
  useEffect(() => {
    if (registro && user) {
      setNombres(registro.nombres);
      setApellidos(registro.apellidos);
      setCorreo(user.correo); // require useAuth.User tenga correo
    }
  }, [registro, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Construir payload para update
    const payload: EditarPacientePayload = {
      nombreUsuario: user.nombreUsuario,
      correo,
      nombres,
      apellidos,
      dni: registro!.dni,
      estado: registro!.estado,
      direccion: registro?.direccion,
      telefono: registro?.telefono,
    };

    if (password) {
      (payload as any).contrasenia = password;
    }

    await updatePatient(user.id, payload);
    alert("Perfil actualizado correctamente");
  };

  if (!paciente) {
    return <p>Cargando datos de perfil…</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold">Mi Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nombres">Nombres</Label>
          <Input id="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="correo">Correo</Label>
          <Input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Nueva Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="Deja vacío para no cambiar"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </div>
  );
}
