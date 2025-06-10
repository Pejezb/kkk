// app/api/auth/me/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { registroPaciente: true },
    });
    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
