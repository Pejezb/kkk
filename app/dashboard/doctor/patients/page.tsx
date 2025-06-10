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

import usePatients, {
  UsuarioConPaciente,
  NuevoPacientePayload,
  EditarPacientePayload,
} from "@/hooks/usePatients";
import PatientFilters, { PatientFilter } from "@/components/patients/PatientFilters";
import PatientTable from "@/components/patients/PatientTable";
import PatientForm from "@/components/patients/PatientForm";

export default function PatientsPage() {
  const { patients, loading, addPatient, updatePatient, deletePatient } = usePatients();

  const [filter, setFilter] = useState<PatientFilter>({ search: "", status: "all" });
  const [editing, setEditing] = useState<UsuarioConPaciente | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleSave = async (data: NuevoPacientePayload | EditarPacientePayload) => {
    if (editing) {
      await updatePatient(editing.id, data as EditarPacientePayload);
    } else {
      await addPatient(data as NuevoPacientePayload);
    }
    setModalOpen(false);
  };

  const handleEdit = (id: number) => {
    const selected = patients.find((p) => p.id === id) || null;
    setEditing(selected);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deletePatient(id);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header y fecha de creación opcional */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        {/* Si quieres un filtro por fecha de registro igual que citas */}
        {/* <Input type="date" /> */}
        <Button onClick={openNew}>Nuevo Paciente</Button>
      </div>

      {/* Filtros */}
      <PatientFilters filter={filter} onChange={setFilter} />

      {/* Tabla o loader */}
      {loading ? (
        <p>Cargando pacientes…</p>
      ) : (
        <PatientTable
          patients={patients}
          filter={filter}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal de formulario */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Paciente" : "Nuevo Paciente"}
            </DialogTitle>
          </DialogHeader>
          <PatientForm
            patient={editing}
            onSave={handleSave}
            onCancel={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
