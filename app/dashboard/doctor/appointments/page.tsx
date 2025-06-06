"use client";

import { useEffect, useState } from "react";
import { PlusCircle, XCircle, Edit2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useStorage from "@/hooks/useLocalStorage";
export default function AppointmentsPage() {
  const { data, isLoading, isError, saveData } = useStorage("appointments", []);
  const [appointments, setAppointments] = useState<any[]>([]);

  // Estado para pacientes y autocompletado
  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtros
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Para modal y formulario
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    date: "",
    time: "",
    duration: "30",
    type: "",
    status: "Proximo",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Cargar pacientes reales de localStorage al montar componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPatients = localStorage.getItem("patients");
      if (storedPatients) {
        try {
          const parsed = JSON.parse(storedPatients);
          setPatients(parsed);
        } catch (error) {
          console.error("Error parsing patients from localStorage", error);
          setPatients([]);
        }
      }
    }
  }, []);

  // Sincronizar localStorage con estado local de citas
  useEffect(() => {
    if (!isLoading && Array.isArray(data)) {
      setAppointments(data);
    }
  }, [data, isLoading]);

  const handleSaveAppointment = () => {
    let updated: any[];
    if (editingIndex !== null) {
      updated = [...appointments];
      updated[editingIndex] = newAppointment;
      setEditingIndex(null);
    } else {
      updated = [newAppointment, ...appointments];
    }
    setAppointments(updated);
    saveData(updated);
    setNewAppointment({
      name: "",
      date: "",
      time: "",
      duration: "30",
      type: "",
      status: "Proximo",
    });
    setDialogOpen(false);
  };

  const handleEditAppointment = (index: number) => {
    setEditingIndex(index);
    setNewAppointment(appointments[index]);
    setDialogOpen(true);
  };

  const handleCancelAppointment = (index: number) => {
    const updated = [...appointments];
    updated[index].status = "Cancelado";
    setAppointments(updated);
    saveData(updated);
  };

  const handleDeleteAppointment = (index: number) => {
    const updated = [...appointments];
    updated.splice(index, 1);
    setAppointments(updated);
    saveData(updated);
  };

  const handleNameChange = (value: string) => {
    setNewAppointment({ ...newAppointment, name: value });

    if (value.trim() === "") {
      setFilteredPatients([]);
      setShowSuggestions(false);
    } else {
      const filtered = patients.filter((p) =>
        p.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPatients(filtered);
      setShowSuggestions(filtered.length > 0);
    }
  };

  // Filtrar citas
  const filteredAppointments = appointments
    .filter((app) => {
      const statusMatch = statusFilter === "all" || app.status === statusFilter;
      const textMatch =
        searchText.trim() === "" ||
        (app.name?.toLowerCase().includes(searchText.toLowerCase())) ||
        (app.type?.toLowerCase().includes(searchText.toLowerCase()));
      return statusMatch && textMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Cargando citas...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error al cargar las citas.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen space-y-6 px-4 md:px-10 pb-10 bg-black text-white">
      <header className="flex flex-col md:flex-row items-center justify-between pt-6 gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Citas</h2>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
          <Input
            placeholder="Buscar por nombre o tipo"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
            className="w-full sm:w-48"
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Proximo">Próximos</SelectItem>
              <SelectItem value="Cancelado">Cancelados</SelectItem>
              <SelectItem value="Completado">Completados</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
            className="w-full sm:w-40"
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white">
              <SelectItem value="asc">Orden Ascendente</SelectItem>
              <SelectItem value="desc">Orden Descendente</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700 flex items-center gap-1 whitespace-nowrap">
                <PlusCircle className="h-5 w-5" />
                Nueva Cita
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingIndex !== null ? "Editar Cita" : "Crear Nueva Cita"}
                </DialogTitle>
              </DialogHeader>

              {/* FORMULARIO */}
              <div className="grid gap-4 py-4">
                <div className="grid gap-2 relative">
                  <Label>Nombre del paciente</Label>
                  <Input
                    className="bg-gray-800 text-white border-gray-700"
                    value={newAppointment.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onFocus={() => {
                      if (filteredPatients.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 150);
                    }}
                    placeholder="Nombre del paciente"
                  />
                  {showSuggestions && (
                    <ul className="absolute top-full left-0 z-10 bg-gray-800 border border-gray-700 w-full max-h-40 overflow-auto text-white rounded-md mt-1">
                      {filteredPatients.map((patient, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer px-3 py-1 hover:bg-gray-700"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setNewAppointment({ ...newAppointment, name: patient.name });
                            setShowSuggestions(false);
                          }}
                        >
                          {patient.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Fecha</Label>
                  <Input
                    type="date"
                    className="bg-gray-800 text-white border-gray-700"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Hora</Label>
                  <Input
                    type="time"
                    className="bg-gray-800 text-white border-gray-700"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, time: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Duración (minutos)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={240}
                    className="bg-gray-800 text-white border-gray-700"
                    value={newAppointment.duration}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, duration: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Tipo de cita</Label>
                  <Input
                    className="bg-gray-800 text-white border-gray-700"
                    value={newAppointment.type}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, type: e.target.value })
                    }
                    placeholder="Tipo de cita"
                  />
                </div>
              </div>
                <Label htmlFor="status" className="mt-4">Estado</Label>
                <Select
                  id="status"
                  value={newAppointment.status}
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, status: value })
                  }
                  className="bg-gray-800 border-gray-700 text-white w-full sm:w-48"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white">
                    <SelectItem value="Proximo">Próximo</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                  </SelectContent>
                </Select>

              {/* BOTONES */}
              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleSaveAppointment}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Guardar
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDialogOpen(false);
                    setEditingIndex(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </DialogContent>

          </Dialog>
        </div>
      </header>


      <main className="flex flex-col gap-4">
        {filteredAppointments.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No hay citas que mostrar.
          </p>
        )}

        {filteredAppointments.map((appointment, index) => (
          <Card key={index} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle>{appointment.name}</CardTitle>
              <CardDescription>{appointment.type}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-1">
              <p>
                <strong>Fecha:</strong> {appointment.date} - {appointment.time}
              </p>
              <p>
                <strong>Duración:</strong> {appointment.duration} minutos
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                <span
                  className={
                    appointment.status === "Proximo"
                      ? "text-green-400"
                      : appointment.status === "Cancelado"
                      ? "text-red-400"
                      : "text-blue-400"
                  }
                >
                  {appointment.status}
                </span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditAppointment(index)}
                aria-label="Editar cita"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              {appointment.status !== "Cancelado" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-500 hover:text-orange-600"
                  onClick={() => handleCancelAppointment(index)}
                  aria-label="Cancelar cita"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDeleteAppointment(index)}
                aria-label="Eliminar cita"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
