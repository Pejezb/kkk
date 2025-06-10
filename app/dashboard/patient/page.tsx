// app/dashboard/patient/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import useCitas from "@/hooks/useCitas";
import useSolicitudes from "@/hooks/useSolicitudes";
import { format } from "date-fns";

export default function PatientDashboardPage() {
  const { citas, loading: loadingCitas } = useCitas();
  const { solicitudes, loading: loadingSolicitudes } = useSolicitudes();

  const myUpcoming = citas.filter((c) => c.estado === "PROXIMA");
  const myPending  = solicitudes.filter((s) => s.estado === "PENDIENTE");

  return (
    <div className="space-y-6">
      {/* Sección Solicitudes */}
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Mis Solicitudes</CardTitle>
            <CardDescription>Solicitudes de cita pendientes</CardDescription>
          </div>
          <Link href="/dashboard/patient/solicitudes">
            <Button variant="outline" size="sm">Ver Todas</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loadingSolicitudes ? (
            <p>Cargando solicitudes…</p>
          ) : myPending.length === 0 ? (
            <p>No tienes solicitudes pendientes.</p>
          ) : (
            <ul className="space-y-2">
              {myPending.slice(0, 5).map((s) => (
                <li key={s.id} className="flex justify-between">
                  <span>
                    {format(new Date(s.fechaSolicitud), "dd/MM/yyyy")} –{" "}
                    {format(new Date(s.turno.fecha), "dd/MM/yyyy")}
                  </span>
                  <span>{s.motivo ?? "-"}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Sección Próximas Citas */}
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Mis Citas</CardTitle>
            <CardDescription>Próximas citas programadas</CardDescription>
          </div>
          <Link href="/dashboard/patient/appointments">
            <Button variant="outline" size="sm">Ver Todas</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loadingCitas ? (
            <p>Cargando citas…</p>
          ) : myUpcoming.length === 0 ? (
            <p>No tienes citas próximas.</p>
          ) : (
            <ul className="space-y-2">
              {myUpcoming.slice(0, 5).map((c) => (
                <li key={c.id} className="flex justify-between">
                  <span>
                    {format(new Date(c.turno.fecha), "dd/MM/yyyy")}{" "}
                    {format(new Date(c.turno.horaInicio), "HH:mm")}
                  </span>
                  <span>{c.tipoDeCita.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
