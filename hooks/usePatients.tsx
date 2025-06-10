import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export interface RegistroPaciente {
  nombres: string;
  apellidos: string;
  dni: number;
  direccion?: string;
  telefono?: number;
  estado: "ACTIVO" | "INACTIVO";
  fechaCreacion: string;
}

export interface UsuarioConPaciente {
  id: number;
  nombreUsuario: string;
  correo: string;
  ultimaConexion?: string | null;
  registroPaciente: RegistroPaciente;
}

export interface NuevoPacientePayload {
  nombreUsuario: string;
  correo: string;
  contrasenia: string;
  tipoUsuario: "patient";
  nombres: string;
  apellidos: string;
  dni: number;
  direccion?: string;
  telefono?: number;
  estado: "ACTIVO" | "INACTIVO";
}

export interface EditarPacientePayload extends Omit<NuevoPacientePayload, "contrasenia" | "tipoUsuario"> {
  contrasenia?: string;
}

export default function usePatients() {
  const { data, error, mutate } = useSWR<UsuarioConPaciente[]>("/api/patients", fetcher);

  return {
    patients: data || [],
    loading: !error && !data,
    error,
    addPatient: async (payload: NuevoPacientePayload) => {
      await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await mutate();
    },
    updatePatient: async (id: number, payload: EditarPacientePayload) => {
      await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await mutate();
    },
    deletePatient: async (id: number) => {
      await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });
      await mutate();
    },
  };
}
