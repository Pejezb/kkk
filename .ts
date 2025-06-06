// exportAppointments.ts

import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function exportAppointments() {
  try {
    const appointments = await prisma.appointment.findMany();

    // Guardar en un archivo JSON
    fs.writeFileSync("appointments_export.json", JSON.stringify(appointments, null, 2));

    console.log("Exportación completada: appointments_export.json");
  } catch (error) {
    console.error("Error exportando citas:", error);
  } finally {
    await prisma.$disconnect();
  }
}

exportAppointments();
