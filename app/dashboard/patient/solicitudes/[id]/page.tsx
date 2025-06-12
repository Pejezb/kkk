// app/dashboard/patient/solicitudes/[id]/page.tsx
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
  fechaSolicitud: string;
  turno: {
    fecha: string;
    horaInicio: string;
    horaFin: string;
  };
}

export default function SolicitudDetailPage() {
  const router = useRouter();
  const path = usePathname(); 
  const id = Number(path.split("/").pop());
  const { deleteSolicitud } = useSolicitudes();

  // fetcher tipado
  const fetcher = (url: string): Promise<SolicitudDetail> =>
    fetch(url, { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Error cargando solicitud");
        return r.json();
      });

  const { data, error } = useSWR<SolicitudDetail>(
    `/api/solicitudes/${id}`,
    fetcher
  );

  if (error) return <p>Error cargando solicitud.</p>;
  if (!data) return <p>Cargando…</p>;

  const handleCancel = async () => {
    if (confirm("¿Seguro quieres cancelar esta solicitud?")) {
      await deleteSolicitud(id);
      router.push("/dashboard/patient/solicitudes");
    }
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Detalle de Solicitud</h1>
      <div className="space-y-2">
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
        <p>
          <strong>Estado:</strong> {data.estado.toLowerCase()}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => router.back()}>
          Volver
        </Button>
        {data.estado === "PENDIENTE" && (
          <Button variant="destructive" onClick={handleCancel}>
            Cancelar Solicitud
          </Button>
        )}
      </div>
    </div>
  );
}
