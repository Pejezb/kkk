import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

export function PatientAppointments() {
  // Datos simulados de citas
  const appointments = [
    {
      id: "1",
      date: "15 de Mayo, 2023",
      time: "10:00 AM",
      provider: "Dr. Juan Martínez",
      type: "Evaluación Neuropsicológica",
      status: "Próxima",
    },
    {
      id: "2",
      date: "22 de Mayo, 2023",
      time: "11:30 AM",
      provider: "Dr. Juan Martínez",
      type: "Sesión de Rehabilitación",
      status: "Próxima",
    },
    {
      id: "3",
      date: "5 de Junio, 2023",
      time: "10:00 AM",
      provider: "Dr. Juan Martínez",
      type: "Seguimiento",
      status: "Próxima",
    },
  ]

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex flex-col space-y-2 pb-4 border-b last:border-0">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{appointment.type}</h4>
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
              {appointment.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{appointment.time}</span>
          </div>
          <p className="text-sm">Con: {appointment.provider}</p>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm">
              Reprogramar
            </Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
              Cancelar
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
