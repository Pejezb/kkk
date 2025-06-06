"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { es } from "date-fns/locale"

interface AppointmentCalendarProps {
  statusFilter: string
}

export function AppointmentCalendar({ statusFilter }: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Datos simulados de citas
  const appointments = [
    {
      id: "1",
      patientName: "Juan Pérez",
      time: "10:00",
      duration: "30 min",
      status: "upcoming",
      date: new Date(2023, 4, 10),
    },
    {
      id: "2",
      patientName: "María García",
      time: "11:00",
      duration: "45 min",
      status: "upcoming",
      date: new Date(2023, 4, 10),
    },
    {
      id: "3",
      patientName: "Miguel Rodríguez",
      time: "14:30",
      duration: "60 min",
      status: "upcoming",
      date: new Date(2023, 4, 10),
    },
    {
      id: "4",
      patientName: "Sara Martínez",
      time: "9:15",
      duration: "30 min",
      status: "completed",
      date: new Date(2023, 4, 8),
    },
    {
      id: "5",
      patientName: "Roberto Fernández",
      time: "15:45",
      duration: "45 min",
      status: "cancelled",
      date: new Date(2023, 4, 12),
    },
  ]

  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter === "all") return true
    return appointment.status === statusFilter.toLowerCase()
  })

  const selectedDateAppointments = filteredAppointments.filter(
    (appointment) =>
      date &&
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear(),
  )

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" locale={es} />
      </div>
      <div className="md:w-1/2">
        <h3 className="text-lg font-medium mb-4">
          {date ? <>Citas para el {date.toLocaleDateString("es-ES")}</> : <>Seleccione una fecha</>}
        </h3>
        <ScrollArea className="h-[400px]">
          {selectedDateAppointments.length > 0 ? (
            <div className="space-y-4">
              {selectedDateAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{appointment.patientName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} ({appointment.duration})
                        </p>
                      </div>
                      <div>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No se encontraron citas para esta fecha.</p>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
