// components/appointments/AppointmentActions.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, X, Check, Trash2 } from "lucide-react";
import type { Cita } from "@/hooks/useCitas";

interface AppointmentActionsProps {
  cita: Cita;
  onView: (cita: Cita) => void;
  onCancel: (id: number) => void;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AppointmentActions({
  cita,
  onView,
  onCancel,
  onComplete,
  onDelete,
}: AppointmentActionsProps) {
  return (
    <div className="flex space-x-1">
      <Button size="sm" variant="outline" onClick={() => onView(cita)} title="Ver">
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onCancel(cita.id)}
        title="Cancelar"
      >
        <X className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onComplete(cita.id)}
        title="Completar"
      >
        <Check className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => onDelete(cita.id)}
        title="Eliminar"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
