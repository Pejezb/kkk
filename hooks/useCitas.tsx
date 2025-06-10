// hooks/useCitas.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface Cita {
  id: number;
  tipoDeCita: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION";
  estado: "PROXIMA" | "CANCELADA" | "COMPLETADA";
  observaciones?: string;
  turno: {
    id: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    estado: "DISPONIBLE" | "OCUPADO" | "CANCELADO";
  };
  paciente: {
    usuarioId: number;
    nombres: string;
    apellidos: string;
    dni: number;
    direccion?: string | null;
    telefono?: number | null;
    fechaCreacion: string;
  };
}

export interface NewCitaPayload {
  pacienteId: number;
  turnoId: number;
  tipoDeCita?: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION";
  observaciones?: string;
}

export interface UpdateCitaPayload {
  estado: "PROXIMA" | "CANCELADA" | "COMPLETADA";
  observaciones?: string;
}

export default function useCitas() {
  const { data, error, mutate } = useSWR<Cita[]>("/api/citas", fetcher);

  return {
    citas: data || [],
    loading: !error && !data,
    error,

    createCita: async (payload: NewCitaPayload) => {
      await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await mutate();
    },

    updateCita: async (id: number, payload: UpdateCitaPayload) => {
      await fetch(`/api/citas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await mutate();
    },

    deleteCita: async (id: number) => {
      await fetch(`/api/citas/${id}`, { method: "DELETE" });
      await mutate();
    },
  };
}
