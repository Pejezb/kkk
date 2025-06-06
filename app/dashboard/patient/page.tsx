"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Brain, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PatientRecommendations } from "@/components/patient-recommendations"

export default function PatientDashboard() {
  const [name, setName] = useState("")
  const [nextAppointment, setNextAppointment] = useState<any | null>(null)
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([])
  const [allAppointments, setAllAppointments] = useState<any[]>([])
  const [showAllAppointments, setShowAllAppointments] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    const storedName = localStorage.getItem("patientName")
    if (storedName) setName(storedName)

    const storedAppointments = localStorage.getItem("appointments")
    if (storedAppointments) {
      try {
        const appointmentsArray = JSON.parse(storedAppointments)

        if (Array.isArray(appointmentsArray)) {
          const now = new Date()
          const futureAppointments = appointmentsArray
            .map((appt: any) => ({ ...appt, dateObj: new Date(appt.date) }))
            .filter((appt: any) => appt.dateObj >= now)
            .sort((a: any, b: any) => a.dateObj.getTime() - b.dateObj.getTime())

          setAllAppointments(
            appointmentsArray
              .map((appt: any) => ({ ...appt, dateObj: new Date(appt.date) }))
              .sort((a: any, b: any) => a.dateObj.getTime() - b.dateObj.getTime())
          )

          if (futureAppointments.length > 0) {
            setNextAppointment(futureAppointments[0])
            setUpcomingAppointments(futureAppointments.slice(0, 2))
          } else {
            setNextAppointment(null)
            setUpcomingAppointments([])
          }
        }
      } catch (error) {
        console.error("Error parsing appointments from localStorage", error)
      }
    }
  }, [])

  function formatDate(date: Date) {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
    ]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} de ${month} de ${year}`
  }

  function addNewAppointment(newAppt: { date: string; timeSlot: string; doctor?: string; note?: string }) {
    let updatedAppointments = [...allAppointments]

    updatedAppointments.push({ ...newAppt, dateObj: new Date(newAppt.date) })

    updatedAppointments.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

    setAllAppointments(updatedAppointments)

    const now = new Date()
    const futureAppointments = updatedAppointments.filter(appt => appt.dateObj >= now)

    if (futureAppointments.length > 0) {
      setNextAppointment(futureAppointments[0])
      setUpcomingAppointments(futureAppointments.slice(0, 2))
    } else {
      setNextAppointment(null)
      setUpcomingAppointments([])
    }

    const appointmentsToStore = updatedAppointments.map(({ dateObj, ...rest }) => rest)
    localStorage.setItem("appointments", JSON.stringify(appointmentsToStore))
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Bienvenido{ name ? `, ${name}` : "" }
        </h2>
        <Link href="/dashboard/patient/book">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Calendar className="mr-2 h-4 w-4" />
            Reservar Cita
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nextAppointment ? formatDate(nextAppointment.dateObj) : "No hay cita programada"}
            </div>
            <p className="text-xs text-muted-foreground">
              {nextAppointment ? `${nextAppointment.timeSlot} con ${nextAppointment.doctor || "Dr. Juan Martínez"}` : ""}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={!nextAppointment}
              onClick={() => setShowDetailsModal(true)}
            >
              Ver Detalles
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Foros</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Del Dr. Juan Martínez</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/patient/messages" legacyBehavior>
              <a className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Publicaciones
                </Button>
              </a>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Próximas Citas</CardTitle>
            <CardDescription>Sus 2 citas más próximas</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <ul className="space-y-2">
                {upcomingAppointments.map((appt, index) => (
                  <li key={index} className="border p-2 rounded-md">
                    <p className="text-sm font-semibold">{formatDate(new Date(appt.date))}</p>
                    <p className="text-xs text-muted-foreground">
                      {appt.timeSlot} con {appt.doctor || "Dr. Juan Martínez"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No hay citas próximas.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowAllAppointments(!showAllAppointments)}
            >
              {showAllAppointments ? "Ocultar todas" : "Ver todas las citas"}
            </Button>
          </CardFooter>
          {showAllAppointments && (
            <CardContent>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {allAppointments.map((appt, index) => (
                  <li key={index} className="border p-2 rounded-md">
                    <p className="text-sm font-semibold">{formatDate(new Date(appt.date))}</p>
                    <p className="text-xs text-muted-foreground">
                      {appt.timeSlot} con {appt.doctor || "Dr. Juan Martínez"}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>

        <PatientRecommendations />
      </div>

      {/* Modal Detalles Próxima Cita - Solo muestra nota del paciente */}
      {showDetailsModal && nextAppointment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-white p-6 rounded-md max-w-md w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
              onClick={() => setShowDetailsModal(false)}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Nota del Paciente</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {nextAppointment.notes?.trim()
                ? nextAppointment.notes
                : "No se escribió ninguna nota."}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}