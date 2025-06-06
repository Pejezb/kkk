import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="text-xl font-bold gradient-text">MediConnect</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Plataforma digital para profesionales independientes del sector salud. Gestiona citas, historiales
              clínicos y más, de manera eficiente y segura.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Plataforma</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/funcionalidades"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/beneficios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Beneficios
                </Link>
              </li>
              <li>
                <Link href="/precios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/seguridad" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Seguridad
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/soporte" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Suscríbete a nuestro newsletter</h3>
              <div className="flex gap-2 max-w-md">
                <Input type="email" placeholder="tu@email.com" className="rounded-full" />
                <Button type="submit" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Legal</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/privacidad" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="/terminos" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Términos de Servicio
                </Link>
                <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Política de Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MediConnect. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-muted-foreground">Diseñado para profesionales de la salud independientes</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
