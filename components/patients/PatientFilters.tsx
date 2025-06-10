"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface PatientFilter {
  search: string;
  status: string; // all, ACTIVO, INACTIVO
}

interface PatientFiltersProps {
  filter: PatientFilter;
  onChange: (newFilter: PatientFilter) => void;
}

export default function PatientFilters({
  filter,
  onChange,
}: PatientFiltersProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <Label htmlFor="patient-search">Buscar:</Label>
        <Input
          id="patient-search"
          placeholder="Nombre o apellido"
          value={filter.search}
          onChange={(e) =>
            onChange({ ...filter, search: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="patient-status">Estado:</Label>
        <Select
          value={filter.status}
          onValueChange={(value) =>
            onChange({ ...filter, status: value })
          }
        >
          <SelectTrigger id="patient-status" className="w-[150px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ACTIVO">Activo</SelectItem>
            <SelectItem value="INACTIVO">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
