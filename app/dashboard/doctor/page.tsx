// app/dashboard/doctor/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

import DoctorStats from "@/components/dashboard/DoctorStats";
import RecentPatients from "@/components/dashboard/RecentPatients";
import RecentAppointments from "@/components/dashboard/RecentAppointments";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Estadísticas rápidas */}
      <DoctorStats />

      {/* Sección de listados */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Recientes Pacientes */}
        <Card className="col-span-4">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Pacientes registrados</CardTitle>
              <CardDescription>Revisa las historias clínicas</CardDescription>
            </div>
            <Link href="/dashboard/doctor/patients">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentPatients />
          </CardContent>
        </Card>

        {/* Próximas Citas */}
        <Card className="col-span-3">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Próximas citas</CardTitle>
              <CardDescription>Citas programadas</CardDescription>
            </div>
            <Link href="/dashboard/doctor/appointments">
              <Button variant="outline">Ver Todas</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentAppointments />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
