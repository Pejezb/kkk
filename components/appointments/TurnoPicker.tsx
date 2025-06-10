"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Turno } from "@/hooks/useTurnos";

interface TurnoPickerProps {
  turnos: Turno[];
  value: number | null;
  onChange: (id: number) => void;
}

export default function TurnoPicker({ turnos, value, onChange }: TurnoPickerProps) {
  return (
    <Select
      value={value != null ? String(value) : undefined}
      onValueChange={(v) => onChange(Number(v))}
    >
      <SelectTrigger id="turnoId" className="w-full">
        <SelectValue placeholder="Selecciona turno" />
      </SelectTrigger>
      <SelectContent>
        {turnos.map((t) => (
          <SelectItem key={t.id} value={String(t.id)}>
            {new Date(t.fecha).toLocaleDateString()} -{" "}
            {new Date(t.horaInicio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
