"use client";

import React from "react";
import { format } from "date-fns";
import type { Cita } from "@/hooks/useCitas";
import AppointmentActions from "./AppointmentActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AppointmentTableProps {
  citas: Cita[];
  onView: (cita: Cita) => void;
  onCancel: (id: number) => void;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AppointmentTable({
  citas,
  onView,
  onCancel,
  onComplete,
  onDelete,
}: AppointmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Paciente</TableHead>
          <TableHead>Turno</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {citas.map((c) => (
          <TableRow key={c.id}>
            <TableCell>
              {c.paciente.nombres} {c.paciente.apellidos}
            </TableCell>
            <TableCell>
              {format(new Date(c.turno.fecha), "dd/MM/yyyy")}{" "}
              {format(new Date(c.turno.horaInicio), "HH:mm")}
            </TableCell>
            <TableCell className="capitalize">
              {c.tipoDeCita.toLowerCase()}
            </TableCell>
            <TableCell className="capitalize">{c.estado.toLowerCase()}</TableCell>
            <TableCell className="text-right">
              <AppointmentActions
                cita={c}
                onView={onView}
                onCancel={onCancel}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
