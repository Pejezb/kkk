// components/dashboard/RecentPatients.tsx
"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import usePatients from "@/hooks/usePatients";

export default function RecentPatients() {
  const { patients, loading } = usePatients();

  if (loading) {
    return <p>Cargando pacientes recientes…</p>;
  }

  // Ordenar por fecha de creación descendente y tomar los 5 primeros
  const recent = [...patients]
    .sort(
      (a, b) =>
        new Date(b.registroPaciente.fechaCreacion).getTime() -
        new Date(a.registroPaciente.fechaCreacion).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {recent.map((p) => (
        <Card key={p.id} className="bg-gray-50">
          <CardHeader>
            <CardTitle>
              {p.registroPaciente.nombres} {p.registroPaciente.apellidos}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            Registrado{" "}
            {formatDistanceToNow(
              new Date(p.registroPaciente.fechaCreacion),
              { addSuffix: true }
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
