"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useCitas, { NewCitaPayload, UpdateCitaPayload } from "@/hooks/useCitas";
import useTurnos from "@/hooks/useTurnos";
import usePatients from "@/hooks/usePatients";
import type { Cita } from "@/hooks/useCitas";
import AppointmentFilters, { AppointmentFilter } from "@/components/appointments/AppointmentFilters";
import AppointmentTable from "@/components/appointments/AppointmentTable";
import AppointmentForm from "@/components/appointments/AppointmentForm";

const DOCTOR_ID = 1;

export default function AppointmentsPage() {
  const {
    citas,
    loading: loadingCitas,
    error,
    createCita,
    updateCita,
    deleteCita,
  } = useCitas();
  const { patients, loading: loadingPatients } = usePatients();

  const [filter, setFilter] = useState<AppointmentFilter>({
    search: "",
    status: "all",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingCita, setViewingCita] = useState<Cita | null>(null);

  // Fecha para turnos
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const { turnos, loading: loadingTurnos } = useTurnos(DOCTOR_ID, fecha);

  const handleCreate = () => {
    setViewingCita(null);
    setModalOpen(true);
  };

  const handleView = (cita: Cita) => {
    setViewingCita(cita);
    setModalOpen(true);
  };

  const handleCancel = async (id: number) => {
    await updateCita(id, { estado: "CANCELADA" } as UpdateCitaPayload);
  };

  const handleComplete = async (id: number) => {
    await updateCita(id, { estado: "COMPLETADA" } as UpdateCitaPayload);
  };

  const handleDelete = async (id: number) => {
    await deleteCita(id);
  };

  // Filtrar citas
  const filtered = citas.filter((c) => {
    const statusMatch = filter.status === "all" || c.estado === filter.status;
    const fullName = `${c.paciente.nombres} ${c.paciente.apellidos}`.toLowerCase();
    const nameMatch = fullName.includes(filter.search.toLowerCase());
    const typeMatch = c.tipoDeCita.toLowerCase().includes(filter.search.toLowerCase());
    return statusMatch && (nameMatch || typeMatch);
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Citas</h1>
        <div className="flex gap-2">
          <Input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="bg-gray-800 text-white border-gray-700"
          />
          <Button onClick={handleCreate}>Nueva Cita</Button>
        </div>
      </div>

      {/* Filters */}
      <AppointmentFilters filter={filter} onChange={setFilter} />

      {/* Table or loader */}
      {loadingCitas ? (
        <p>Cargando citas…</p>
      ) : error ? (
        <p className="text-red-500">Error al cargar citas</p>
      ) : (
        <AppointmentTable
          citas={filtered}
          onView={handleView}
          onCancel={handleCancel}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) setViewingCita(null);
          setModalOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewingCita ? "Ver Observaciones" : "Nueva Cita"}
            </DialogTitle>
          </DialogHeader>

          {viewingCita ? (
            <div className="space-y-2 p-4">
              <p><strong>Paciente:</strong> {viewingCita.paciente.nombres} {viewingCita.paciente.apellidos}</p>
              <p><strong>Turno:</strong> {`${new Date(viewingCita.turno.fecha).toLocaleDateString()} ${new Date(viewingCita.turno.horaInicio).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`}</p>
              <p><strong>Estado:</strong> {viewingCita.estado}</p>
              <p><strong>Tipo:</strong> {viewingCita.tipoDeCita}</p>
              <p><strong>Observaciones:</strong></p>
              <p>{viewingCita.observaciones || "Sin observaciones"}</p>
            </div>
          ) : loadingPatients || loadingTurnos ? (
            <p>Cargando datos…</p>
          ) : (
            <AppointmentForm
              patients={patients}
              turnos={turnos}
              cita={null}
              onSave={async (data) => {
                await createCita(data);
                setModalOpen(false);
              }}
              onCancel={() => setModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
