// components/patients/PatientTable.tsx
"use client";

import React from "react";
import { format } from "date-fns";
import PatientActions from "./PatientActions";
import type { UsuarioConPaciente } from "@/hooks/usePatients";
import type { PatientFilter } from "./PatientFilters";

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
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-2 py-1 text-left">Nombre</th>
          <th className="border px-2 py-1 text-left">Apellido</th>
          <th className="border px-2 py-1 text-left">Fecha Registro</th>
          <th className="border px-2 py-1 text-left">Última Conexión</th>
          <th className="border px-2 py-1 text-left">Teléfono</th>
          <th className="border px-2 py-1 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((p) => (
          <tr key={p.id}>
            <td className="border px-2 py-1">{p.registroPaciente.nombres}</td>
            <td className="border px-2 py-1">{p.registroPaciente.apellidos}</td>
            <td className="border px-2 py-1">
              {format(new Date(p.registroPaciente.fechaCreacion), "dd/MM/yyyy")}
            </td>
            <td className="border px-2 py-1">
              {p.ultimaConexion
                ? format(new Date(p.ultimaConexion), "dd/MM/yyyy")
                : "–"}
            </td>
            <td className="border px-2 py-1">
              {p.registroPaciente.telefono ?? "–"}
            </td>
            <td className="border px-2 py-1">
              <PatientActions
                id={p.id}
                estado={p.registroPaciente.estado}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
