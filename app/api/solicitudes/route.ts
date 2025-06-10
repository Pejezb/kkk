// app/api/solicitudes/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: number;
  tipo: string;
}

// GET: solo devuelve solicitudes del paciente logueado
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

  const solicitudes = await prisma.solicitudCita.findMany({
    where: { pacienteId: payload.userId },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
    orderBy: { fechaSolicitud: "desc" },
  });

  return NextResponse.json(solicitudes);
}

// POST: crea solicitud para el paciente logueado
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

  const { turnoId, motivo } = await req.json();
  const pacienteId = payload.userId;

  // 1) Evitar duplicados
  const exists = await prisma.solicitudCita.findUnique({
    where: { turnoId },
  });
  if (exists) {
    return NextResponse.json(
      { message: "Ya existe una solicitud para ese turno" },
      { status: 409 }
    );
  }

  // 2) Validar que el turno esté DISPONIBLE
  const turno = await prisma.turno.findUnique({ where: { id: turnoId } });
  if (!turno || turno.estado !== "DISPONIBLE") {
    return NextResponse.json({ message: "Turno no válido" }, { status: 400 });
  }

  // 3) Crear la solicitud
  const nueva = await prisma.solicitudCita.create({
    data: {
      paciente: { connect: { usuarioId: pacienteId } },
      turno: { connect: { id: turnoId } },
      motivo,
    },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
  });

  return NextResponse.json(nueva, { status: 201 });
}
