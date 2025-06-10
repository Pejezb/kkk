// app/api/turnos/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EstadoTurno } from "@prisma/client";

const SLOT_MIN = 45;
const BREAK_MIN = 15;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const profesionalId = Number(searchParams.get("profesionalId"));
  const fechaParam = searchParams.get("fecha"); // “YYYY-MM-DD”

  // Parsear como local, no en UTC:
  let fecha: Date;
  if (fechaParam) {
    const [y, m, d] = fechaParam.split("-").map(Number);
    fecha = new Date(y, m - 1, d);
  } else {
    const now = new Date();
    fecha = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  // 1) Buscar turnos DISPONIBLES
  let turnos = await prisma.turno.findMany({
    where: { profesionalId, fecha, estado: "DISPONIBLE" },
    orderBy: { horaInicio: "asc" },
  });

  // 2) Generar si no hay
  if (turnos.length === 0) {
    const slots = [];
    let inicio = new Date(fecha);
    inicio.setHours(9, 0, 0, 0);

    for (let i = 0; i < 8; i++) {
      const fin = new Date(inicio.getTime() + SLOT_MIN * 60000);
      slots.push({
        profesionalId,
        fecha,
        horaInicio: inicio,
        horaFin: fin,
        estado: EstadoTurno.DISPONIBLE,
      });
      inicio = new Date(fin.getTime() + BREAK_MIN * 60000);
    }
    await prisma.turno.createMany({ data: slots });
    turnos = await prisma.turno.findMany({
      where: { profesionalId, fecha, estado: "DISPONIBLE" },
      orderBy: { horaInicio: "asc" },
    });
  }

  return NextResponse.json(turnos);
}
