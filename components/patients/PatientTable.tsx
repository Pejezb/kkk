"use client";

import React from "react";
import { format } from "date-fns";
import type { UsuarioConPaciente } from "@/hooks/usePatients";
import type { PatientFilter } from "./PatientFilters";
import PatientActions from "./PatientActions";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface PatientTableProps {
  patients: UsuarioConPaciente[];
  filter: PatientFilter;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PatientTable({
  patients,
  filter,
  onEdit,
  onDelete,
}: PatientTableProps) {
  const filtered = patients.filter((p) => {
    const fullName = `${p.registroPaciente.nombres} ${p.registroPaciente.apellidos}`.toLowerCase();
    if (filter.status !== "all" && p.registroPaciente.estado !== filter.status) return false;
    if (filter.search && !fullName.includes(filter.search.toLowerCase())) return false;
    return true;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Fecha Registro</TableHead>
          <TableHead>Última Conexión</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.registroPaciente.nombres}</TableCell>
            <TableCell>{p.registroPaciente.apellidos}</TableCell>
            <TableCell>
              {format(new Date(p.registroPaciente.fechaCreacion), "dd/MM/yyyy")}
            </TableCell>
            <TableCell>
              {p.ultimaConexion
                ? format(new Date(p.ultimaConexion), "dd/MM/yyyy")
                : "–"}
            </TableCell>
            <TableCell>{p.registroPaciente.telefono ?? "–"}</TableCell>
            <TableCell className="text-right">
              <PatientActions
                id={p.id}
                estado={p.registroPaciente.estado}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
