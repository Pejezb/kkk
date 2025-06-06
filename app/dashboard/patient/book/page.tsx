"use client"
import { useEffect, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const availableTimeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

const appointmentTypes = [
  { id: "1", name: "Consulta inicial" },
  { id: "2", name: "Seguimiento" },
  { id: "3", name: "Terapia" },
  { id: "4", name: "Revisión de medicación" },
  { id: "5", name: "Consulta urgente" },
]

export default function BookAppointmentPage() {
  const router = useRouter()

  // Estado para nombre del paciente, leído desde localStorage al cargar el componente
  const [patientName, setPatientName] = useState<string>("")

  const [date, setDate] = useState<Date | undefined>()
  const [timeSlot, setTimeSlot] = useState<string | undefined>()
  const [appointmentType, setAppointmentType] = useState<string | undefined>()
  const [notes, setNotes] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const storedName = localStorage.getItem("patientName") || ""
    setPatientName(storedName)
  }, [])

  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  // Formatea timeSlot a formato 12h AM/PM en español
  const formatTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(":")
    const dateWithTime = new Date()
    dateWithTime.setHours(Number(hours))
    dateWithTime.setMinutes(Number(minutes))
    return format(dateWithTime, "hh:mm aaaa", { locale: es })
  }

  const handleBookAppointment = () => {
    if (!date || !timeSlot || !appointmentType) return

    setIsLoading(true)

    // Usa el nombre guardado en el estado React (actualizado desde localStorage al montar)
    const appointmentTypeName =
      appointmentTypes.find((type) => type.id === appointmentType)?.name || ""

    const appointmentData = {
      patientName: patientName || "Paciente desconocido", // usar estado
      type: appointmentTypeName,
      date: format(date, "yyyy-MM-dd"),
      time: timeSlot,
      duration: "30",
      status: "Proximo",
      notes,
    }

    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    const updatedAppointments = [appointmentData, ...storedAppointments]
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments))

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/patient?success=true")
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reservar Cita</h1>

      {/* Mostrar nombre paciente actual */}
      <p className="mb-4 text-lg font-medium">
        Reservando cita para: <span className="text-blue-600">{patientName || "Paciente desconocido"}</span>
      </p>

      <div className="space-y-6">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Paso 1: Seleccionar fecha y hora</CardTitle>
              <CardDescription>Elija una fecha y hora disponible para su cita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) =>
                        d < new Date(new Date().setHours(0, 0, 0, 0)) || !isWeekday(d)
                      }
                      locale={es}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hora</label>
                <Select disabled={!date} onValueChange={setTimeSlot} value={timeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {formatTimeSlot(time)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de cita</label>
                <Select onValueChange={setAppointmentType} value={appointmentType} disabled={!timeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de cita" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notas (opcional)</label>
                <Textarea
                  placeholder="Escribe alguna nota para la cita..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!date || !timeSlot || !appointmentType || isLoading}
                onClick={handleBookAppointment}
                className="w-full"
              >
                {isLoading ? "Reservando..." : "Reservar cita"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
