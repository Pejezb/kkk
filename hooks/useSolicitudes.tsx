// hooks/useSolicitudes.ts
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => {
    if (!r.ok) throw new Error("Error cargando solicitudes");
    return r.json();
  });

export interface Solicitud {
  id: number;
  motivo?: string;
  motivoRechazo?: string;
  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA";
  fechaSolicitud: string;
  turnoId: number;
  pacienteId: number;
  paciente: {
    nombres: string;
    apellidos: string;
    dni: number;
  };
  turno: {
    id: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    estado: string;
  };
}

export interface NewSolicitudPayload {
  turnoId: number;
  motivo?: string;
}

export interface UpdateSolicitudPayload {
  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA";
  motivoRechazo?: string;
}

export default function useSolicitudes() {
  const { data, error, mutate } = useSWR<Solicitud[]>("/api/solicitudes", fetcher);

  return {
    solicitudes: data || [],
    loading: !error && !data,
    error,

    createSolicitud: async (payload: NewSolicitudPayload) => {
      await fetch("/api/solicitudes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await mutate();
    },

    updateSolicitud: async (id: number, payload: UpdateSolicitudPayload) => {
      await fetch(`/api/solicitudes/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await mutate();
    },

    deleteSolicitud: async (id: number) => {
      await fetch(`/api/solicitudes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await mutate();
    },
  };
}
