// app/dashboard/patient/solicitudes/new/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TurnoPicker from "@/components/appointments/TurnoPicker";
import useTurnos from "@/hooks/useTurnos";
import useSolicitudes, { NewSolicitudPayload } from "@/hooks/useSolicitudes";

export default function NewSolicitudPage() {
  const router = useRouter();
  const { createSolicitud } = useSolicitudes();

  // 1) Estado para la fecha seleccionada
  const [fecha, setFecha] = useState(() => {
    // valor por defecto: hoy en formato YYYY-MM-DD
    return new Date().toISOString().slice(0, 10);
  });

  const [turnoId, setTurnoId] = useState<number | null>(null);
  const [motivo, setMotivo] = useState<string>("");

  // 2) Llamada a los turnos filtrados por fecha y doctor
  //    aquí deberías usar el ID real del doctor; lo he puesto como 1 de ejemplo
  const DOCTOR_ID = 1;
  const { turnos, loading: loadingTurnos } = useTurnos(DOCTOR_ID, fecha);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnoId) {
      alert("Selecciona un turno");
      return;
    }
    const payload: NewSolicitudPayload = {
      turnoId,
      motivo: motivo || undefined,
    };
    await createSolicitud(payload);
    router.push("/dashboard/patient/solicitudes");
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Nueva Solicitud de Cita</h1>

      {/* Selector de Fecha */}
      <div>
        <Label htmlFor="fecha">Fecha</Label>
        <Input
          id="fecha"
          type="date"
          value={fecha}
          onChange={(e) => {
            setFecha(e.target.value);
            // limpiar selección de turno cuando cambie la fecha
            setTurnoId(null);
          }}
          className="w-full"
        />
      </div>

      {/* TurnoPicker */}
      {loadingTurnos ? (
        <p>Cargando turnos…</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="turnoId">Turno</Label>
            <TurnoPicker
              turnos={turnos}
              value={turnoId}
              onChange={setTurnoId}
            />
          </div>

          {/* Motivo */}
          <div>
            <Label htmlFor="motivo">Motivo</Label>
            <textarea
              id="motivo"
              className="w-full border rounded p-2"
              rows={3}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => router.back()}
              type="button"
            >
              Cancelar
            </Button>
            <Button type="submit">Enviar Solicitud</Button>
          </div>
        </form>
      )}
    </div>
  );
}
