"use client"

import { useState } from "react"
import { Calendar, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AppointmentListProps {
  statusFilter: string
}

export function AppointmentList({ statusFilter }: AppointmentListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Datos simulados de citas
  const appointments = [
    {
      id: "1",
      patientName: "Juan Pérez",
      time: "10:00",
      date: "10 de Mayo, 2023",
      duration: "30 min",
      status: "upcoming",
      notes: "Consulta de seguimiento",
    },
    {
      id: "2",
      patientName: "María García",
      time: "11:00",
      date: "10 de Mayo, 2023",
      duration: "45 min",
      status: "upcoming",
      notes: "Evaluación inicial",
    },
    {
      id: "3",
      patientName: "Miguel Rodríguez",
      time: "14:30",
      date: "10 de Mayo, 2023",
      duration: "60 min",
      status: "upcoming",
      notes: "Sesión de terapia",
    },
    {
      id: "4",
      patientName: "Sara Martínez",
      time: "9:15",
      date: "8 de Mayo, 2023",
      duration: "30 min",
      status: "completed",
      notes: "Revisión de medicación",
    },
    {
      id: "5",
      patientName: "Roberto Fernández",
      time: "15:45",
      date: "12 de Mayo, 2023",
      duration: "45 min",
      status: "cancelled",
      notes: "Cancelada por el paciente",
    },
    {
      id: "6",
      patientName: "Elena Díaz",
      time: "13:30",
      date: "15 de Mayo, 2023",
      duration: "45 min",
      status: "upcoming",
      notes: "Consulta de nuevo paciente",
    },
    {
      id: "7",
      patientName: "David Sánchez",
      time: "11:45",
      date: "9 de Mayo, 2023",
      duration: "30 min",
      status: "completed",
      notes: "Seguimiento",
    },
  ]

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter.toLowerCase()
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Buscar citas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">{appointment.patientName}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} ({appointment.duration})
                        </p>
                      </div>
                      <p className="text-sm">{appointment.notes}</p>
                    </div>
                    <div className="flex flex-col gap-2 md:items-end">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          appointment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status === "completed"
                          ? "Completada"
                          : appointment.status === "upcoming"
                            ? "Próxima"
                            : "Cancelada"}
                      </span>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                        {appointment.status === "upcoming" && (
                          <>
                            <Button variant="outline" size="sm">
                              Reprogramar
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                              Cancelar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No se encontraron citas.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
