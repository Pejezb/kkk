// app/api/patients/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function GET() {
  // Listamos todos los usuarios con tipo PATIENT e incluimos su RegistroPaciente
  const patients = await prisma.usuario.findMany({
    where: { tipoUsuario: "patient" },
    include: { registroPaciente: true },
    orderBy: { registroPaciente: { fechaCreacion: "desc" } },
  });
  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const {
    nombreUsuario,
    correo,
    contrasenia,
    tipoUsuario,       // "patient" o "doctor"
    nombres,           // datos del paciente
    apellidos,
    dni,
    direccion,
    telefono,
  } = await req.json();

  // 1) Evitar duplicados
  const exists = await prisma.usuario.findUnique({ where: { correo } });
  if (exists) {
    return NextResponse.json(
      { message: "Este correo ya está en uso" },
      { status: 409 }
    );
  }

  // 2) Hashear contraseña
  const hash = await bcrypt.hash(contrasenia, 10);

  // 3) Crear Usuario + RegistroPaciente anidado si es patient
  const user = await prisma.usuario.create({
    data: {
      nombreUsuario,
      correo,
      contrasenia: hash,
      tipoUsuario,
      ultimaConexion: null,
      registroPaciente:
        tipoUsuario === "patient"
          ? {
              create: {
                nombres,
                apellidos,
                dni: Number(dni),
                estado: "ACTIVO",
                direccion,
                telefono: telefono ? Number(telefono) : null,
              },
            }
          : undefined,
    },
    include: {
      registroPaciente: true,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
