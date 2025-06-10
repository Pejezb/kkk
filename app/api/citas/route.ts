// app/api/citas/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: number;
  tipo: "patient" | "doctor";
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  let payload: JWTPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  // Devuelve citas para paciente o doctor
  const whereClause = payload.tipo === "patient"
    ? { pacienteId: payload.userId }
    : { turno: { profesionalId: payload.userId } };

  const citas = await prisma.cita.findMany({
    where: whereClause,
    include: {
      paciente: {
        select: {
          usuarioId: true,
          nombres: true,
          apellidos: true,
          dni: true,
          direccion: true,
          telefono: true,
          fechaCreacion: true,
        },
      },
      turno: true,
    },
    orderBy: { turno: { fecha: "asc" } },
  });

  return NextResponse.json(citas);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }
  let payload: JWTPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  const { pacienteId, turnoId, tipoDeCita, observaciones } = await req.json();

  // Validar turno
  const turno = await prisma.turno.findUnique({ where: { id: turnoId } });
  if (!turno || turno.estado !== "DISPONIBLE") {
    return NextResponse.json({ message: "Turno no válido" }, { status: 400 });
  }

  if (payload.tipo === "patient") {
    if (pacienteId !== payload.userId) {
      return NextResponse.json(
        { message: "No puedes agendar cita para otro paciente" },
        { status: 403 }
      );
    }
  } else {
    // Doctor solo en sus turnos
    if (turno.profesionalId !== payload.userId) {
      return NextResponse.json(
        { message: "No autorizado para este turno" },
        { status: 403 }
      );
    }
  }

  // Validar paciente existe
  const paciente = await prisma.registroPaciente.findUnique({
    where: { usuarioId: pacienteId },
  });
  if (!paciente) {
    return NextResponse.json({ message: "Paciente no encontrado" }, { status: 404 });
  }

  // Crear cita
  const cita = await prisma.cita.create({
    data: {
      turno: { connect: { id: turnoId } },
      paciente: { connect: { usuarioId: pacienteId } },
      tipoDeCita: tipoDeCita ?? "CONSULTA",
      observaciones,
    },
    include: {
      paciente: {
        select: {
          usuarioId: true,
          nombres: true,
          apellidos: true,
          dni: true,
          direccion: true,
          telefono: true,
          fechaCreacion: true,
        },
      },
      turno: true,
    },
  });

  // Marcar turno como ocupado
  await prisma.turno.update({
    where: { id: turnoId },
    data: { estado: "OCUPADO" },
  });

  return NextResponse.json(cita, { status: 201 });
}
