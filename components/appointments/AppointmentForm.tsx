// components/appointments/AppointmentForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import TurnoPicker from "./TurnoPicker";
import type { Turno } from "@/hooks/useTurnos";
import type { Cita, NewCitaPayload } from "@/hooks/useCitas";
import type { UsuarioConPaciente } from "@/hooks/usePatients";

interface AppointmentFormProps {
  patients: UsuarioConPaciente[];                  // ← agregado
  turnos: Turno[];
  cita: Cita | null;
  onSave: (data: NewCitaPayload & { turnoId: number }) => void;
  onCancel: () => void;
}

export default function AppointmentForm({
  patients,
  turnos,
  cita,
  onSave,
  onCancel,
}: AppointmentFormProps) {
  const [pacienteId, setPacienteId] = useState<number | "">("");
  const [turnoId, setTurnoId] = useState<number | null>(null);
  const [tipoDeCita, setTipoDeCita] = useState<
    "CONSULTA" | "SEGUIMIENTO" | "EVALUACION"
  >("CONSULTA");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    if (cita) {
      setPacienteId(cita.paciente.usuarioId);
      setTurnoId(cita.turno.id);
      setTipoDeCita(cita.tipoDeCita);
      setObservaciones(cita.observaciones ?? "");
    } else {
      setPacienteId("");
      setTurnoId(null);
      setTipoDeCita("CONSULTA");
      setObservaciones("");
    }
  }, [cita]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteId || turnoId == null) {
      alert("Selecciona paciente y turno.");
      return;
    }
    onSave({
      pacienteId: Number(pacienteId),
      turnoId,
      tipoDeCita,
      observaciones: observaciones || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>{cita ? "Editar Cita" : "Crear Cita"}</DialogTitle>
      </DialogHeader>

      {/* Selector paciente */}
      <div>
        <Label htmlFor="pacienteId">Paciente</Label>
        <Select
          value={pacienteId !== "" ? String(pacienteId) : undefined}
          onValueChange={(v) => setPacienteId(Number(v))}
        >
          <SelectTrigger id="pacienteId" className="w-full">
            <SelectValue placeholder="Selecciona paciente" />
          </SelectTrigger>
          <SelectContent>
            {patients.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.registroPaciente.nombres} {p.registroPaciente.apellidos}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selector turno */}
      <div>
        <Label htmlFor="turnoId">Turno</Label>
        <TurnoPicker turnos={turnos} value={turnoId} onChange={setTurnoId} />
      </div>

      {/* Tipo de cita */}
      <div>
        <Label htmlFor="tipoDeCita">Tipo de Cita</Label>
        <Select
          value={tipoDeCita}
          onValueChange={(v) =>
            setTipoDeCita(v as "CONSULTA" | "SEGUIMIENTO" | "EVALUACION")
          }
        >
          <SelectTrigger id="tipoDeCita" className="w-full">
            <SelectValue placeholder="Selecciona tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CONSULTA">Consulta</SelectItem>
            <SelectItem value="SEGUIMIENTO">Seguimiento</SelectItem>
            <SelectItem value="EVALUACION">Evaluación</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Observaciones */}
      <div>
        <Label htmlFor="observaciones">Observaciones</Label>
        <textarea
          id="observaciones"
          className="w-full border rounded p-2"
          rows={3}
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
        />
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
