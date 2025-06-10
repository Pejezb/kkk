// app/api/solicitudes/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // Listar todas las solicitudes con sus relaciones
  const solicitudes = await prisma.solicitudCita.findMany({
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
    orderBy: { fechaSolicitud: "desc" },
  });
  return NextResponse.json(solicitudes);
}

export async function POST(req: Request) {
  // Crear nueva solicitud
  const { pacienteId, turnoId, motivo } = await req.json();

  // Evitar duplicados: un turno sólo puede tener una solicitud
  const exists = await prisma.solicitudCita.findUnique({
    where: { turnoId },
  });
  if (exists) {
    return NextResponse.json(
      { message: "Ya existe una solicitud para ese turno" },
      { status: 409 }
    );
  }

  const nueva = await prisma.solicitudCita.create({
    data: {
      paciente: { connect: { usuarioId: pacienteId } },
      turno: { connect: { id: turnoId } },
      motivo,
      // estado y fechaSolicitud se establecen por defecto
    },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
  });

  return NextResponse.json(nueva, { status: 201 });
}
