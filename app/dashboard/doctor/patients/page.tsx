"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Download, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExportButton } from "@/components/ExportButton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const STORAGE_KEY = "patients"

export default function PatientsPage() {

  // Cargar pacientes desde localStorage con clave más específica
  const [patients, setPatients] = useState(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    console.log("Cargando pacientes desde localStorage:", stored)
    return stored ? JSON.parse(stored) : []
    }
    return []
  })

  // Guardar en localStorage cuando cambian los pacientes
  useEffect(() => {
  console.log("Guardando pacientes en localStorage:", patients)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients))
  }, [patients])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    condition: string;
  }

  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    name: "",
    email: "",
    phone: "",
    status: "Activo",
    condition: "",
  })

  const handleOpenAdd = () => {
    setNewPatient({
      name: "",
      email: "",
      phone: "",
      status: "Activo",
      condition: "",
    })
    setIsEditing(false)
    setOpen(true)
  }

  const handleEdit = (patient: Patient) => {
    setNewPatient({ ...patient })
    setIsEditing(true)
    setEditId(patient.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setPatients(patients.filter((p: Patient) => p.id !== id))
  }

  const handleSave = () => {
if (isEditing && editId) {
    const updatedPatients = patients.map((p: Patient) =>
      p.id === editId ? { ...newPatient, id: editId } : p
    )
    console.log("Editando paciente, nuevos pacientes:", updatedPatients)
    setPatients(updatedPatients)
  } else {
    const newPatientWithId = { ...newPatient, id: Date.now().toString() } as Patient;
    console.log("Añadiendo paciente:", newPatientWithId)
    setPatients([...patients, newPatientWithId])
  }

  setOpen(false)
  setIsEditing(false)
  setEditId(null)
}

  const filteredPatients = patients.filter((patient: any) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.condition && patient.condition.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pacientes</h2>
        <div className="flex gap-2">
          <ExportButton
            data={filteredPatients}
            headers={["name", "email", "phone", "status", "condition"]}
            filename="pacientes.csv"
          />
          <Button onClick={handleOpenAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Paciente
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Buscar paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="Inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Condición</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.status}</TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(patient)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(patient.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Paciente" : "Nuevo Paciente"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Nombre"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newPatient.email}
              onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
            />
            <Input
              placeholder="Teléfono"
              value={newPatient.phone}
              onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
            />
            <Input
              placeholder="Condición"
              value={newPatient.condition}
              onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
            />
            <Select
              value={newPatient.status}
              onValueChange={(value) => setNewPatient({ ...newPatient, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full mt-2 bg-teal-600 hover:bg-teal-700" onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}