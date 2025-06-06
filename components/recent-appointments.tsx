import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentAppointmentsProps {
  appointments: any[];
}

export default function RecentAppointments({ appointments }: RecentAppointmentsProps) {
  const upcoming = appointments
    .filter((app) => app.status.toLowerCase() === "proximo") // se recomienda toLowerCase para evitar errores
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  if (upcoming.length === 0) {
    return <p className="text-muted-foreground">No hay citas próximas.</p>;
  }

  return (
    <div className="space-y-4">
      {upcoming.map((app, index) => (
        <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg shadow-sm">
          <Avatar className="h-10 w-10">
            <AvatarImage src={app.avatar || "/placeholder.user.jpg"} alt={app.name} />
            <AvatarFallback>{app.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <p className="text-sm font-medium">{app.name}</p>
            <p className="text-xs text-muted-foreground">
              {app.date} a las {app.time}
            </p>
          </div>

          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              app.status === "Completada"
                ? "bg-green-100 text-green-700"
                : app.status === "Proximo" || app.status === "Próxima"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {app.status}
          </span>
        </div>
      ))}
    </div>
  );
}
