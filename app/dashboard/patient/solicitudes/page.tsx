// app/dashboard/patient/solicitudes/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useSolicitudes from "@/hooks/useSolicitudes";
import { format } from "date-fns";

export default function SolicitudesPage() {
  const { solicitudes, loading } = useSolicitudes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Solicitudes</h1>
        <Link href="/dashboard/patient/solicitudes/new">
          <Button>+ Nueva Solicitud</Button>
        </Link>
      </div>

      {loading ? (
        <p>Cargando solicitudes…</p>
      ) : solicitudes.length === 0 ? (
        <p>No tienes solicitudes pendientes.</p>
      ) : (
        <div className="space-y-4">
          {solicitudes.map((s) => (
            <Card key={s.id}>
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>
                    {format(new Date(s.fechaSolicitud), "dd/MM/yyyy")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Turno: {format(new Date(s.turno.fecha), "dd/MM/yyyy")}{" "}
                    {format(new Date(s.turno.horaInicio), "HH:mm")}
                  </p>
                </div>
                <Link
                  href={`/dashboard/patient/solicitudes/${s.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver detalle
                </Link>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Motivo:</strong> {s.motivo || "-"}
                </p>
                <p>
                  <strong>Estado:</strong> {s.estado.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
