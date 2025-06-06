"use client";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppointmentFormProps {
  appointment: {
    name: string;
    date: string;
    time: string;
    duration: string;
    type: string;
    status: string;
  };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  editing: boolean;
}

export default function AppointmentForm({
  appointment,
  onChange,
  onSave,
  onCancel,
  editing,
}: AppointmentFormProps) {
  return (
    <DialogContent className="bg-gray-900 text-white">
      <DialogHeader>
        <DialogTitle>{editing ? "Editar Cita" : "Crear Nueva Cita"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Nombre del paciente</Label>
          <Input
            className="bg-gray-800 text-white border-gray-700"
            value={appointment.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Fecha</Label>
          <Input
            type="date"
            className="bg-gray-800 text-white border-gray-700"
            value={appointment.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Hora</Label>
          <Input
            type="time"
            className="bg-gray-800 text-white border-gray-700"
            value={appointment.time}
            onChange={(e) => onChange("time", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Duración</Label>
          <Select
            value={appointment.duration}
            onValueChange={(value) => onChange("duration", value)}
          >
            <SelectTrigger className="bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Seleccionar duración" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              <SelectItem value="30">30 minutos</SelectItem>
              <SelectItem value="60">60 minutos</SelectItem>
              <SelectItem value="90">90 minutos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Tipo de cita</Label>
          <Input
            className="bg-gray-800 text-white border-gray-700"
            value={appointment.type}
            onChange={(e) => onChange("type", e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Estado</Label>
          <Select
            value={appointment.status}
            onValueChange={(value) => onChange("status", value)}
          >
            <SelectTrigger className="bg-gray-800 text-white border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              <SelectItem value="Proximo">Próximo</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
              <SelectItem value="Realizado">Realizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded"
            onClick={onSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </DialogContent>
  );
}
