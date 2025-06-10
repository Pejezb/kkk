// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password, userType } = await req.json();

  // 1) Buscar usuario incluyendo su registroPaciente
  const user = await prisma.usuario.findUnique({
    where: { correo: email },
    include: { registroPaciente: true },
  });
  if (!user) {
    return NextResponse.json(
      { message: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  // 2) Validar contraseña
  const isValid = await bcrypt.compare(password, user.contrasenia);
  if (!isValid) {
    return NextResponse.json(
      { message: "Contraseña incorrecta" },
      { status: 401 }
    );
  }

  // 3) (Opcional) verificar tipo de usuario
  if (user.tipoUsuario !== userType) {
    return NextResponse.json(
      { message: "Tipo de usuario no coincide" },
      { status: 403 }
    );
  }

  // 4) Actualizar última conexión
  await prisma.usuario.update({
    where: { id: user.id },
    data: { ultimaConexion: new Date() },
  });

  // 5) Generar JWT
  const token = jwt.sign(
    { userId: user.id, tipo: userType },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );

  // 6) Devolver cookie + datos del usuario (incluyendo nombres/apellidos)
  const res = NextResponse.json(
    {
      ok: true,
      user: {
        id: user.id,
        tipoUsuario: user.tipoUsuario,
        correo: user.correo,
        registroPaciente: {
          nombres: user.registroPaciente?.nombres,
          apellidos: user.registroPaciente?.apellidos,
        },
        ultimaConexion: new Date().toISOString(), // ya actualizada arriba
      },
    },
    { status: 200 }
  );

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 2, // 2 horas
  });

  return res;
}
