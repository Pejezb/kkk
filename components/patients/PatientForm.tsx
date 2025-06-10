// components/patients/PatientForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { UsuarioConPaciente } from "@/hooks/usePatients";

interface PatientFormProps {
  patient: UsuarioConPaciente | null;
  onSave: (data: {
    nombreUsuario: string;
    correo: string;
    contrasenia?: string;
    tipoUsuario: "patient";
    nombres: string;
    apellidos: string;
    dni: number;
    direccion?: string;
    telefono?: number;
    estado: "ACTIVO" | "INACTIVO";
  }) => void;
  onCancel: () => void;
}

export default function PatientForm({
  patient,
  onSave,
  onCancel,
}: PatientFormProps) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState<"ACTIVO" | "INACTIVO">("ACTIVO");

  // Cuando cambie `patient`, precargamos o limpiamos el form
  useEffect(() => {
    if (patient) {
      setNombreUsuario(patient.nombreUsuario);
      setCorreo(patient.correo);
      setContrasenia("");
      setNombres(patient.registroPaciente.nombres);
      setApellidos(patient.registroPaciente.apellidos);
      setDni(String(patient.registroPaciente.dni));
      setDireccion(patient.registroPaciente.direccion ?? "");
      setTelefono(String(patient.registroPaciente.telefono ?? ""));
      setEstado(patient.registroPaciente.estado);
    } else {
      setNombreUsuario("");
      setCorreo("");
      setContrasenia("");
      setNombres("");
      setApellidos("");
      setDni("");
      setDireccion("");
      setTelefono("");
      setEstado("ACTIVO");
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nombreUsuario ||
      !correo ||
      !nombres ||
      !apellidos ||
      !dni ||
      (!patient && !contrasenia)
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    onSave({
      nombreUsuario,
      correo,
      contrasenia: patient ? undefined : contrasenia,
      tipoUsuario: "patient",
      nombres,
      apellidos,
      dni: Number(dni),
      direccion: direccion || undefined,
      telefono: telefono ? Number(telefono) : undefined,
      estado,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre de usuario & correo */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombreUsuario">Nombre de Usuario</Label>
          <Input
            id="nombreUsuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="correo">Correo</Label>
          <Input
            id="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Contraseña sólo al crear */}
      {!patient && (
        <div>
          <Label htmlFor="contrasenia">Contraseña</Label>
          <Input
            id="contrasenia"
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
        </div>
      )}

      {/* Nombres y apellidos */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombres">Nombres</Label>
          <Input
            id="nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input
            id="apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </div>
      </div>

      {/* DNI & teléfono */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dni">DNI</Label>
          <Input
            id="dni"
            type="number"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      </div>

      {/* Dirección */}
      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      {/* Estado */}
      <div>
        <Label htmlFor="estado">Estado</Label>
        <Select
          value={estado}
          onValueChange={(v) => setEstado(v as "ACTIVO" | "INACTIVO")}
        >
          <SelectTrigger id="estado" className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVO">Activo</SelectItem>
            <SelectItem value="INACTIVO">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
