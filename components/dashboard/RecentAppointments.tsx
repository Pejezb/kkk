// components/dashboard/RecentAppointments.tsx
"use client";

import React from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useCitas from "@/hooks/useCitas";

export default function RecentAppointments() {
  const { citas, loading } = useCitas();

  if (loading) {
    return <p>Cargando citas recientes…</p>;
  }

  // Filtrar próximas citas y ordenar por hora ascendente
  const upcoming = citas
    .filter((c) => c.estado === "PROXIMA")
    .sort(
      (a, b) =>
        new Date(a.turno.horaInicio).getTime() -
        new Date(b.turno.horaInicio).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {upcoming.map((c) => (
        <Card key={c.id} className="bg-gray-50">
          <CardHeader>
            <CardTitle>
              {format(new Date(c.turno.fecha), "dd/MM/yyyy")}{" "}
              {format(new Date(c.turno.horaInicio), "HH:mm")} –{" "}
              {c.paciente.nombres} {c.paciente.apellidos}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            {c.tipoDeCita.charAt(0) + c.tipoDeCita.slice(1).toLowerCase()}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
