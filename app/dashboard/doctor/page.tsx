'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecentAppointments from "@/components/recent-appointments";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Calendar, FileText } from "lucide-react"
import useStorage from "@/hooks/useLocalStorage"
import RecentPatients from "@/components/RecentPatients";

export default function DoctorDashboard() {

  const { data: appointmentData, isLoading: appointmentLoad } = useStorage("appointments", []);

  // Temporal fallback para probar pacientes:
  // const { data: patientsData, isLoading: patientsLoad } = useStorage("patients", []);
  const patientsData = [
    { id: '1', name: 'Juan Perez' },
    { id: '2', name: 'Maria Gomez' },
  ];
  const patientsLoad = false;

  console.log("Pacientes cargados:", patientsData, "Loading:", patientsLoad);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Panel de Administración</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patientsLoad ? "0" : patientsData.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointmentLoad ? "0" : appointmentData.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Historias Clinicas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patientsLoad ? "0" : patientsData.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pacientes registrados</CardTitle>
              <CardDescription>Revisar historia clinica de los pacientes </CardDescription>
            </div>
            <Link href="/dashboard/doctor/patients">
              <Button variant="outline" size="lg" className="w-58">
                Añadir paciente
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pl-2">
            <RecentPatients patients={patientsData || []} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Próximas Citas</CardTitle>
              <CardDescription>Citas programadas</CardDescription>
            </div>
            <Link href="/dashboard/doctor/appointments">
              <Button variant="outline" size="sm" className="w-58">
                Ver Todas
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentAppointments appointments={appointmentData || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
