// app/dashboard/doctor/solicitudes/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useSolicitudes from "@/hooks/useSolicitudes";
import { format } from "date-fns";

export default function DoctorSolicitudesPage() {
  const { solicitudes, loading } = useSolicitudes();

  // Filtrar solo PENDIENTES
  const pendientes = solicitudes.filter((s) => s.estado === "PENDIENTE");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Solicitudes de Cita</h1>
      {loading ? (
        <p>Cargando solicitudes…</p>
      ) : pendientes.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <div className="space-y-4">
          {pendientes.map((s) => (
            <Card key={s.id}>
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>
                    {format(new Date(s.fechaSolicitud), "dd/MM/yyyy")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Paciente: {s.paciente.nombres} {s.paciente.apellidos}
                  </p>
                </div>
                <Link
                  href={`/dashboard/doctor/solicitudes/${s.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver detalle
                </Link>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Motivo:</strong> {s.motivo || "-"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
