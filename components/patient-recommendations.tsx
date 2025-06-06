import { Check, Brain } from "lucide-react"

export function PatientRecommendations() {
  // Datos simulados de recomendaciones
  const recommendations = [
    {
      id: "1",
      title: "Ejercicios de Atención Dividida",
      description: "Realizar los ejercicios de la plataforma Cognifit durante 20 minutos diarios.",
      date: "5 de Mayo, 2023",
      completed: true,
    },
    {
      id: "2",
      title: "Técnicas de Memoria",
      description: "Practicar la técnica de asociación visual con la lista de palabras proporcionada.",
      date: "5 de Mayo, 2023",
      completed: false,
    },
    {
      id: "3",
      title: "Descanso Cognitivo",
      description: "Realizar pausas de 10 minutos cada hora durante actividades que requieran concentración intensa.",
      date: "5 de Mayo, 2023",
      completed: false,
    },
    {
      id: "4",
      title: "Ejercicio Físico",
      description: "Caminar al menos 30 minutos diarios para mejorar el flujo sanguíneo cerebral.",
      date: "5 de Mayo, 2023",
      completed: false,
    },
  ]

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <div key={recommendation.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
          <div
            className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
              recommendation.completed ? "bg-teal-600 text-white" : "border border-muted-foreground"
            }`}
          >
            {recommendation.completed && <Check className="h-3 w-3" />}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{recommendation.title}</h4>
              <span className="text-xs text-muted-foreground">{recommendation.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
            {!recommendation.completed && (
              <button className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700">
                <Brain className="h-3 w-3" />
                <span>Ver detalles</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
