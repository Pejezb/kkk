-- CreateEnum
CREATE TYPE "UsuarioTipo" AS ENUM ('patient', 'doctor');

-- CreateEnum
CREATE TYPE "EstadoRegistro" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "EstadoTurno" AS ENUM ('DISPONIBLE', 'OCUPADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('PENDIENTE', 'ACEPTADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "EstadoCita" AS ENUM ('PROXIMA', 'CANCELADA', 'COMPLETADA');

-- CreateEnum
CREATE TYPE "TipoCita" AS ENUM ('CONSULTA', 'SEGUIMIENTO', 'EVALUACION');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombreUsuario" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "tipoUsuario" "UsuarioTipo" NOT NULL,
    "ultimaConexion" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroPaciente" (
    "usuarioId" INTEGER NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "direccion" TEXT,
    "telefono" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroPaciente_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "Turno" (
    "id" SERIAL NOT NULL,
    "profesionalId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFin" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoTurno" NOT NULL DEFAULT 'DISPONIBLE',

    CONSTRAINT "Turno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitudCita" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "turnoId" INTEGER NOT NULL,
    "fechaSolicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'PENDIENTE',
    "motivoRechazo" TEXT,
    "usuarioId" INTEGER,

    CONSTRAINT "SolicitudCita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id" SERIAL NOT NULL,
    "turnoId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "estado" "EstadoCita" NOT NULL DEFAULT 'PROXIMA',
    "tipoDeCita" "TipoCita" NOT NULL,
    "observaciones" TEXT,
    "usuarioId" INTEGER,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaClinica" (
    "id" SERIAL NOT NULL,
    "citaId" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotaClinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroAuditoria" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "accion" TEXT NOT NULL,
    "descripcion" TEXT,
    "entidad" TEXT NOT NULL,
    "entidadId" INTEGER,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroAuditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombreUsuario_key" ON "Usuario"("nombreUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroPaciente_dni_key" ON "RegistroPaciente"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "SolicitudCita_turnoId_key" ON "SolicitudCita"("turnoId");

-- CreateIndex
CREATE UNIQUE INDEX "Cita_turnoId_key" ON "Cita"("turnoId");

-- AddForeignKey
ALTER TABLE "RegistroPaciente" ADD CONSTRAINT "RegistroPaciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_profesionalId_fkey" FOREIGN KEY ("profesionalId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudCita" ADD CONSTRAINT "SolicitudCita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "RegistroPaciente"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudCita" ADD CONSTRAINT "SolicitudCita_turnoId_fkey" FOREIGN KEY ("turnoId") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudCita" ADD CONSTRAINT "SolicitudCita_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_turnoId_fkey" FOREIGN KEY ("turnoId") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "RegistroPaciente"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaClinica" ADD CONSTRAINT "NotaClinica_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "Cita"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroAuditoria" ADD CONSTRAINT "RegistroAuditoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
