"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExportButton } from "@/components/ExportButton"
import { PatientTable } from "@/components/PatientTable"
import { PatientForm } from "@/components/PatientForm"

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  condition: string;
}

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [open, setOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const handleOpenAdd = () => {
    setSelectedPatient(null)
    setOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pacientes</h2>
        <div className="flex gap-2">
          <ExportButton
            data={[]} // datos vendrán desde la BD
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

      <PatientTable
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onEdit={(patient) => {
          setSelectedPatient(patient)
          setOpen(true)
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPatient ? "Editar Paciente" : "Nuevo Paciente"}
            </DialogTitle>
          </DialogHeader>
          <PatientForm
            patient={selectedPatient}
            onClose={() => {
              setOpen(false)
              setSelectedPatient(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
