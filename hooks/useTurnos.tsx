import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface Turno {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: "DISPONIBLE" | "OCUPADO" | "CANCELADO";
}

export default function useTurnos(profesionalId: number, fecha: string) {
  const key = `/api/turnos?profesionalId=${profesionalId}&fecha=${fecha}`;
  const { data, error, mutate } = useSWR<Turno[]>(key, fetcher);

  return {
    turnos: data || [],
    loading: !error && !data,
    error,
    occupyTurno: async (id: number) => {
      await fetch(`/api/turnos/${id}`, { method: "PUT" });
      await mutate();
    },
  };
}
