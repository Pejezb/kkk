"use client"

import { useState } from "react"
import { Patient } from "./PatientsManager"

interface PatientFormProps {
  onAdd: (patient: Omit<Patient, 'id'>) => void
}

export const PatientForm = ({ onAdd }: PatientFormProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState("")
  const [condition, setCondition] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) {
      alert("El nombre y el email son obligatorios")
      return
    }
    onAdd({ name, email, phone, status, condition })
    setName("")
    setEmail("")
    setPhone("")
    setStatus("")
    setCondition("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <div>
        <label>Nombre:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Teléfono:</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Estado:</label>
        <input value={status} onChange={e => setStatus(e.target.value)} />
      </div>
      <div>
        <label>Condición:</label>
        <input value={condition} onChange={e => setCondition(e.target.value)} />
      </div>
      <button type="submit">Agregar paciente</button>
    </form>
  )
}
