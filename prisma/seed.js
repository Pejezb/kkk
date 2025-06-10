// prisma/seed.js
const bcrypt = require('bcryptjs');
const { PrismaClient, UsuarioTipo } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email    = 'doctor@example.com';
  const password = 'doctor123';
  const tipo     = UsuarioTipo.doctor;

  const exists = await prisma.usuario.findUnique({ where: { correo: email } });
  if (exists) {
    console.log('🟡 Doctor ya existe, saltando seed.');
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.usuario.create({
    data: {
      nombreUsuario:  email.split('@')[0],
      correo:         email,
      contrasenia:    hash,
      tipoUsuario:    tipo,
      ultimaConexion: null,
    },
  });

  console.log('✅ Doctor seeded:', email, '/', password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
