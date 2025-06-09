"use client"

import { Patient } from "./PatientsManager"

interface PatientTableProps {
  patients: Patient[]
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  return (
    <table border={1} cellPadding={5} cellSpacing={0}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Estado</th>
          <th>Condición</th>
        </tr>
      </thead>
      <tbody>
        {patients.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.email}</td>
            <td>{p.phone}</td>
            <td>{p.status}</td>
            <td>{p.condition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
