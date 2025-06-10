// app/api/citas/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // Listar todas las citas confirmadas
  const citas = await prisma.cita.findMany({
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
    orderBy: { id: "desc" },
  });
  return NextResponse.json(citas);
}

export async function POST(req: Request) {
  // Crear nueva cita a partir de paciente + turno
  const { pacienteId, turnoId, tipoDeCita, observaciones } = await req.json();

  // 1) Validar paciente
  const paciente = await prisma.registroPaciente.findUnique({
    where: { usuarioId: pacienteId },
  });
  if (!paciente) {
    return NextResponse.json({ message: "Paciente no encontrado" }, { status: 404 });
  }

  // 2) Validar turno
  const turno = await prisma.turno.findUnique({
    where: { id: turnoId },
  });
  if (!turno || turno.estado !== "DISPONIBLE") {
    return NextResponse.json({ message: "Turno no válido" }, { status: 400 });
  }

  // 3) Crear cita
  const cita = await prisma.cita.create({
    data: {
      turno:        { connect: { id: turnoId } },
      paciente:     { connect: { usuarioId: pacienteId } },
      tipoDeCita:   tipoDeCita ?? "CONSULTA",
      observaciones,
    },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno:    true,
    },
  });

  // 4) Marcar turno como ocupado
  await prisma.turno.update({
    where: { id: turnoId },
    data: { estado: "OCUPADO" },
  });

  return NextResponse.json(cita, { status: 201 });
}
