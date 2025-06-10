// app/api/solicitudes/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const sol = await prisma.solicitudCita.findUnique({
    where: { id },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno: true,
    },
  });
  if (!sol) {
    return NextResponse.json({ message: "Solicitud no encontrada" }, { status: 404 });
  }
  return NextResponse.json(sol);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { estado, motivoRechazo } = await req.json();
  // Actualiza estado y opcionalmente motivoRechazo
  const updated = await prisma.solicitudCita.update({
    where: { id },
    data: { estado, motivoRechazo },
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
  await prisma.solicitudCita.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
