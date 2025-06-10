// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 1) Buscar usuario
  const user = await prisma.usuario.findUnique({
    where: { correo: email },
    include: { registroPaciente: true },
  });
  if (!user) {
    return NextResponse.json({ ok: false, message: "Usuario no encontrado" }, { status: 404 });
  }

  // 2) Validar contraseña
  if (!(await bcrypt.compare(password, user.contrasenia))) {
    return NextResponse.json({ ok: false, message: "Contraseña incorrecta" }, { status: 401 });
  }

  // 3) Actualizar última conexión
  await prisma.usuario.update({
    where: { id: user.id },
    data: { ultimaConexion: new Date() },
  });

  // 4) Generar JWT con el tipo real del usuario
  const token = jwt.sign(
    { userId: user.id, tipo: user.tipoUsuario },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );

  // 5) Devolver cookie + payload
  const payload = {
    ok: true,
    user: {
      id: user.id,
      nombreUsuario: user.nombreUsuario,
      correo: user.correo,
      tipoUsuario: user.tipoUsuario,
      registroPaciente: user.registroPaciente
        ? {
            nombres: user.registroPaciente.nombres,
            apellidos: user.registroPaciente.apellidos,
          }
        : null,
      ultimaConexion: new Date().toISOString(),
    },
  };

  const res = NextResponse.json(payload, { status: 200 });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 2,
  });
  return res;
}
