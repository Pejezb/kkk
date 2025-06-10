// app/api/patients/[id]/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const user = await prisma.usuario.findFirst({
    where: { id, tipoUsuario: "patient" },
    include: { registroPaciente: true },
  });
  if (!user) {
    return NextResponse.json(
      { message: "Paciente no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
}

export async function PUT(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const existing = await prisma.usuario.findFirst({
    where: { id, tipoUsuario: "patient" },
    include: { registroPaciente: true },
  });
  if (!existing) {
    return NextResponse.json(
      { message: "Paciente no encontrado" },
      { status: 404 }
    );
  }

  const {
    nombreUsuario,
    correo,
    contrasenia,
    nombres,
    apellidos,
    dni,
    estado,
    direccion,
    telefono,
  } = await _req.json();

  // 1) Preparar datos de usuario
  const userData: any = { nombreUsuario, correo };
  if (contrasenia) {
    userData.contrasenia = await bcrypt.hash(contrasenia, 10);
  }

  // 2) Actualizar Usuario y RegistroPaciente
  const updated = await prisma.usuario.update({
    where: { id },
    data: {
      ...userData,
      registroPaciente: {
        update: {
          nombres,
          apellidos,
          dni: Number(dni),
          estado,
          direccion,
          telefono: telefono ? Number(telefono) : null,
        },
      },
    },
    include: { registroPaciente: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const existing = await prisma.usuario.findFirst({
    where: { id, tipoUsuario: "patient" },
    include: { registroPaciente: true },
  });
  if (!existing) {
    return NextResponse.json(
      { message: "Paciente no encontrado" },
      { status: 404 }
    );
  }

  if (existing.registroPaciente?.estado !== "INACTIVO") {
    return NextResponse.json(
      { message: "Solo se pueden eliminar pacientes inactivos" },
      { status: 400 }
    );
  }

  // 3) Borrar primero RegistroPaciente, luego Usuario
  await prisma.registroPaciente.delete({ where: { usuarioId: id } });
  await prisma.usuario.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
