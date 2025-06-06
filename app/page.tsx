"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  ClipboardList,
  Shield,
  Users,
  FileText,
  Laptop,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Lock,
  HeartPulse,
} from "lucide-react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"

const Counter = ({ target, title, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let startTime
    let animationFrame

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      setCount(Math.floor(percentage * target))

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, isInView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setIsInView(true)}
      className="text-center"
    >
      <div className="text-4xl font-bold text-primary mb-2">{count}+</div>
      <p className="text-muted-foreground">{title}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative px-4 md:px-6 z-10">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4"
            >
              Revolucionando la salud digital
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Tu práctica médica <span className="gradient-text">digitalizada</span> y{" "}
              <span className="gradient-text">autónoma</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8"
            >
              Administra citas, historiales clínicos y más, sin depender de grandes instituciones. Diseñado para
              profesionales independientes del sector salud.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8">
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Explorar funcionalidades
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-primary/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <img
              src="/FondoF.jpg?height=600&width=1200"
              alt="MediConnect Dashboard"
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm border-b border-primary/10 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-accent">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter target={1500} title="Profesionales" />
            <Counter target={25000} title="Pacientes" />
            <Counter target={98} title="% Satisfacción" />
            <Counter target={35} title="% Ahorro de tiempo" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Funcionalidades principales
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-xl text-muted-foreground">
              Diseñado específicamente para profesionales independientes del sector salud
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Doble perfil",
                description:
                  "Sistema con roles diferenciados para profesionales y pacientes, cada uno con accesos y funcionalidades específicas.",
              },
              {
                icon: <Calendar className="h-10 w-10 text-primary" />,
                title: "Agenda de citas",
                description:
                  "Gestiona tu calendario de consultas y permite a tus pacientes agendar citas en línea sin llamadas telefónicas.",
              },
              {
                icon: <ClipboardList className="h-10 w-10 text-primary" />,
                title: "Historial clínico",
                description:
                  "Crea, visualiza y actualiza historiales clínicos digitales con acceso restringido solo a usuarios autorizados.",
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Seguridad de datos",
                description:
                  "Implementación de mecanismos de cifrado, autenticación y cumplimiento con normativas de ciberseguridad.",
              },
              {
                icon: <Laptop className="h-10 w-10 text-primary" />,
                title: "Diseño responsive",
                description: "Interfaz intuitiva que funciona correctamente tanto en PC como en dispositivos móviles.",
              },
              {
                icon: <FileText className="h-10 w-10 text-primary" />,
                title: "Documentación",
                description: "Genera y almacena documentos clínicos, recetas e informes de manera digital y segura.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="feature-card-hover"
              >
                <Card className="h-full border-primary/10 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 md:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Cómo funciona
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Simplificamos tu práctica profesional
            </h2>
            <p className="text-xl text-muted-foreground">
              En solo tres pasos, transforma la manera en que gestionas tu consulta
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <Sparkles className="h-10 w-10 text-primary" />,
                title: "Regístrate",
                description:
                  "Crea tu cuenta como profesional de la salud y configura tu perfil con tus especialidades y horarios disponibles.",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Personaliza",
                description:
                  "Adapta la plataforma a tus necesidades específicas, configura tus plantillas de historiales y documentos.",
              },
              {
                icon: <HeartPulse className="h-10 w-10 text-primary" />,
                title: "Comienza a atender",
                description:
                  "Recibe citas online, gestiona tus pacientes y mantén sus historiales clínicos actualizados y seguros.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="relative">
                  <div className="rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-30px)] h-[2px] bg-primary/20">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 border-primary/20" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Beneficios
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Transforma tu práctica profesional</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Ahorro de tiempo",
                    description:
                      "Reduce el tiempo dedicado a tareas administrativas y optimiza la gestión de tu consulta.",
                  },
                  {
                    title: "Mayor seguridad",
                    description:
                      "Protege la información sensible de tus pacientes con sistemas de seguridad avanzados.",
                  },
                  {
                    title: "Mejor experiencia",
                    description: "Ofrece a tus pacientes una experiencia moderna y eficiente para gestionar sus citas.",
                  },
                  {
                    title: "Impacto ambiental",
                    description:
                      "Reduce el uso de papel y contribuye a la sostenibilidad ambiental con procesos digitales.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />
                <div className="relative rounded-2xl overflow-hidden border border-primary/10 shadow-xl">
                  <img
                    src="/placeholder.jpg?height=600&width=600"
                    alt="Beneficios de la plataforma"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 md:py-32 bg-accent">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Testimonios
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-xl text-muted-foreground">
              Profesionales de la salud que ya han transformado su práctica con MediConnect
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "MediConnect ha transformado completamente mi consulta. Ahora puedo dedicar más tiempo a mis pacientes y menos a la administración.",
                author: "Dra. María Rodríguez",
                role: "Cardióloga",
              },
              {
                quote:
                  "La facilidad para gestionar citas y mantener historiales clínicos actualizados ha mejorado significativamente mi eficiencia.",
                author: "Dr. Carlos Méndez",
                role: "Pediatra",
              },
              {
                quote:
                  "Mis pacientes valoran poder agendar citas en línea y tener acceso a su información médica de forma segura.",
                author: "Dra. Laura Sánchez",
                role: "Dermatóloga",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-background border-primary/10">
                  <CardContent className="p-6">
                    <div className="mb-4 text-primary">{"★".repeat(5)}</div>
                    <p className="mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />
                <div className="relative rounded-2xl overflow-hidden border border-primary/10 shadow-xl">
                  <div className="bg-muted aspect-square flex items-center justify-center">
                    <Lock className="h-32 w-32 text-primary opacity-20" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                Seguridad
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Tu información en buenas manos</h2>
              <p className="text-lg text-muted-foreground mb-6">
                La seguridad y privacidad de los datos de tus pacientes es nuestra prioridad. Implementamos las mejores
                prácticas de seguridad para proteger toda la información.
              </p>
              <div className="space-y-4">
                {[
                  "Cifrado de extremo a extremo",
                  "Autenticación de doble factor",
                  "Cumplimiento con normativas de protección de datos",
                  "Copias de seguridad automáticas",
                  "Auditorías de seguridad periódicas",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Comienza a transformar tu práctica profesional hoy
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Únete a la comunidad de profesionales de salud que ya están optimizando su trabajo con MediConnect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8">
                  Registrarse ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Contactar con ventas
                </Button>
              </Link>
            </div>
          </motion.div>
          <div className="h-10">
            <Footer />
          </div>
        </div>
      </section>
    </div>
  )
}
