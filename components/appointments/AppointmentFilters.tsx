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

export interface AppointmentFilter {
  status: string;
  search: string;
}

interface AppointmentFiltersProps {
  filter: AppointmentFilter;
  onChange: (f: AppointmentFilter) => void;
}

export default function AppointmentFilters({
  filter,
  onChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <Label htmlFor="search">Buscar</Label>
        <Input
          id="search"
          placeholder="Paciente o tipo"
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="status">Estado</Label>
        <Select
          value={filter.status}
          onValueChange={(v) => onChange({ ...filter, status: v })}
        >
          <SelectTrigger id="status" className="w-[150px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="PROXIMA">Próximo</SelectItem>
            <SelectItem value="COMPLETADA">Completada</SelectItem>
            <SelectItem value="CANCELADA">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
