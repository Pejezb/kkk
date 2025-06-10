// app/api/citas/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EstadoTurno } from "@prisma/client";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const cita = await prisma.cita.findUnique({
    where: { id },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
  });
  if (!cita) {
    return NextResponse.json({ message: "Cita no encontrada" }, { status: 404 });
  }
  return NextResponse.json(cita);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { estado, observaciones } = await req.json();

  const updated = await prisma.cita.update({
    where: { id },
    data: { estado, observaciones },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  // 1) Obtener turnoId de la cita
  const cita = await prisma.cita.findUnique({
    where: { id },
    select: { turnoId: true },
  });
  if (!cita) {
    return NextResponse.json({ message: "Cita no encontrada" }, { status: 404 });
  }

  // 2) Liberar el turno: marcar como DISPONIBLE
  await prisma.turno.update({
    where: { id: cita.turnoId },
    data: { estado: EstadoTurno.DISPONIBLE },
  });

  // 3) Eliminar la cita
  await prisma.cita.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
