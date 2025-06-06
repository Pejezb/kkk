import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Patient {
  id: string;
  name: string;
  // agrega aquí más campos si tienes, por ejemplo: age, lastVisit, etc.
}

interface RecentPatientsProps {
  patients: Patient[];
}

export default function RecentPatients({ patients }: RecentPatientsProps) {
  if (!patients.length) {
    return <div>No hay pacientes registrados.</div>;
  }

  return (
    <div className="space-y-2 max-h-96 overflow-auto">
      {patients.map((patient) => (
        <Card key={patient.id} className="p-4">
          <CardHeader>
            <CardTitle>{patient.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Aquí puedes agregar más detalles del paciente */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
