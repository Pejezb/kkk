// app/dashboard/doctor/solicitudes/[id]/page.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import useSolicitudes from "@/hooks/useSolicitudes";
import { format } from "date-fns";

interface SolicitudDetail {
  id: number;
  motivo?: string;
  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA";
  motivoRechazo?: string;
  fechaSolicitud: string;
  paciente: { nombres: string; apellidos: string; dni: number };
  turno: { fecha: string; horaInicio: string; horaFin: string };
}

export default function DoctorSolicitudDetail() {
  const router = useRouter();
  const path = usePathname();
  const id = Number(path.split("/").pop());
  const { updateSolicitud } = useSolicitudes();

  const fetcher = (url: string): Promise<SolicitudDetail> =>
    fetch(url, { credentials: "include" }).then((r) => r.json());

  const { data, error } = useSWR<SolicitudDetail>(
    `/api/solicitudes/${id}`,
    fetcher
  );

  if (error) return <p>Error cargando solicitud.</p>;
  if (!data) return <p>Cargando…</p>;

  const handleDecision = async (estado: "ACEPTADA" | "RECHAZADA") => {
    let motivoRechazo: string | undefined = undefined;
    if (estado === "RECHAZADA") {
      motivoRechazo = prompt("Motivo de rechazo:") || undefined;
    }
    await updateSolicitud(id, { estado, motivoRechazo });
    router.push("/dashboard/doctor/solicitudes");
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Solicitud #{data.id}</h1>
      <div className="space-y-2">
        <p>
          <strong>Paciente:</strong> {data.paciente.nombres}{" "}
          {data.paciente.apellidos}
        </p>
        <p>
          <strong>DNI:</strong> {data.paciente.dni}
        </p>
        <p>
          <strong>Fecha de Solicitud:</strong>{" "}
          {format(new Date(data.fechaSolicitud), "dd/MM/yyyy")}
        </p>
        <p>
          <strong>Turno:</strong>{" "}
          {format(new Date(data.turno.fecha), "dd/MM/yyyy")}{" "}
          {format(new Date(data.turno.horaInicio), "HH:mm")}
        </p>
        <p>
          <strong>Motivo:</strong> {data.motivo || "-"}
        </p>
      </div>
      {data.estado === "PENDIENTE" && (
        <div className="flex space-x-2">
          <Button onClick={() => handleDecision("ACEPTADA")}>
            Aceptar
          </Button>
          <Button variant="destructive" onClick={() => handleDecision("RECHAZADA")}>
            Rechazar
          </Button>
        </div>
      )}
      {data.estado !== "PENDIENTE" && (
        <p>
          <strong>Estado:</strong> {data.estado.toLowerCase()}
        </p>
      )}
      <Button variant="outline" onClick={() => router.back()}>
        Volver
      </Button>
    </div>
  );
}
