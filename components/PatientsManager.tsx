"use client"

import { useState, useEffect } from "react"
import { PatientTable } from "./PatientTable"
import { PatientForm } from "./PatientForm"

export interface Patient {
  id: number
  name: string
  email: string
  phone: string
  status: string
  condition: string
}

export const PatientsManager = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)

  const fetchPatients = async () => {
    setLoading(true)
    const res = await fetch('/api/patients')
    const data = await res.json()
    setPatients(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const addPatient = async (patientData: Omit<Patient, 'id'>) => {
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    })
    if (res.ok) {
      fetchPatients()
    } else {
      alert('Error creando paciente')
    }
  }

  return (
    <div>
      {loading ? <p>Cargando pacientes...</p> : (
        <>
          <PatientTable patients={patients} />
          <PatientForm onAdd={addPatient} />
        </>
      )}
    </div>
  )
}
