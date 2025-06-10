"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface PatientActionsProps {
  id: number;
  estado: "ACTIVO" | "INACTIVO";
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PatientActions({
  id,
  estado,
  onEdit,
  onDelete,
}: PatientActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button size="sm" variant="outline" onClick={() => onEdit(id)}>
        Editar
      </Button>
      {estado === "INACTIVO" && (
        <Button size="sm" variant="destructive" onClick={() => onDelete(id)}>
          Eliminar
        </Button>
      )}
    </div>
  );
}
