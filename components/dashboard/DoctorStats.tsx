// components/dashboard/DoctorStats.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar, FileText, ClipboardList } from "lucide-react";
import usePatients from "@/hooks/usePatients";
import useCitas from "@/hooks/useCitas";
// import useHistorias from "@/hooks/useHistorias"; // opcional

export default function DoctorStats() {
  const { patients, loading: loadingPatients } = usePatients();
  const { citas, loading: loadingCitas } = useCitas();
  // const { historias, loading: loadingHistorias } = useHistorias();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Pacientes */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loadingPatients ? "…" : patients.length}
          </div>
        </CardContent>
      </Card>

      {/* Citas Programadas */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loadingCitas ? "…" : citas.length}
          </div>
        </CardContent>
      </Card>

      {/* Historias Clínicas (ejemplo) */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Historias Clínicas</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {/* loadingHistorias ? "…" : historias.length */}
            –
          </div>
        </CardContent>
      </Card>

      {/* Solicitudes Pendientes (opcional) */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {/* aquí pondrías count de solicitudes */}
            –
          </div>
        </CardContent>
      </Card>
    </div>
);
}
