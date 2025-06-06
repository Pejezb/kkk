import { FileText, Download, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos simulados de registros médicos
const medicalRecords = [
  {
    id: "1",
    title: "Informe de consulta inicial",
    date: "10 de mayo, 2023",
    doctor: "Dra. Sarah Johnson",
    type: "Informe",
    size: "1.2 MB",
  },
  {
    id: "2",
    title: "Resultados de análisis de sangre",
    date: "15 de mayo, 2023",
    doctor: "Dr. Michael Chen",
    type: "Laboratorio",
    size: "3.5 MB",
  },
  {
    id: "3",
    title: "Plan de tratamiento",
    date: "22 de mayo, 2023",
    doctor: "Dra. Sarah Johnson",
    type: "Plan",
    size: "0.8 MB",
  },
  {
    id: "4",
    title: "Receta médica",
    date: "22 de mayo, 2023",
    doctor: "Dra. Sarah Johnson",
    type: "Receta",
    size: "0.5 MB",
  },
]

// Datos simulados de historial médico
const medicalHistory = [
  {
    id: "1",
    date: "10 de mayo, 2023",
    description: "Consulta inicial - Evaluación de ansiedad",
    provider: "Dra. Sarah Johnson",
    notes: "Paciente presenta síntomas de ansiedad moderada. Se recomienda terapia cognitivo-conductual.",
  },
  {
    id: "2",
    date: "22 de mayo, 2023",
    description: "Seguimiento - Evaluación de progreso",
    provider: "Dra. Sarah Johnson",
    notes: "El paciente muestra mejoras en el manejo de la ansiedad. Se continúa con el plan de tratamiento actual.",
  },
]

export default function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mis Registros Médicos</h1>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Médicos</CardTitle>
              <CardDescription>
                Acceda a sus informes médicos, resultados de laboratorio y otros documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Tamaño</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {record.title}
                        </div>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial Médico</CardTitle>
              <CardDescription>Revise su historial de consultas y tratamientos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {medicalHistory.map((entry) => (
                  <div key={entry.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{entry.description}</h3>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Profesional: {entry.provider}</p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p>{entry.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
