// hooks/useCitas.ts
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => {
    if (!r.ok) throw new Error("Error cargando citas");
    return r.json();
  });

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
  turnoId?: number;
  tipoDeCita?: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION";
}

export default function useCitas() {
  const { data, error, mutate } = useSWR<Cita[]>("/api/citas", fetcher);

  return {
    citas: data || [],
    loading: !error && !data,
    error,

    createCita: async (payload: NewCitaPayload) => {
      const res = await fetch("/api/citas", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error creando cita");
      }

      const nuevaCita: Cita = await res.json();
      // Actualización optimista
      mutate((prevCitas = []) => [...prevCitas, nuevaCita], false);
    },

    updateCita: async (id: number, payload: UpdateCitaPayload) => {
      const res = await fetch(`/api/citas/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error actualizando cita");
      await mutate();
    },

    deleteCita: async (id: number) => {
      const res = await fetch(`/api/citas/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error eliminando cita");
      await mutate();
    },
  };
}
