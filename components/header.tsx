"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Inicio", href: "/" },
    {
      name: "Soluciones",
      href: "#",
      children: [
        { name: "Para médicos", href: "/" },
        { name: "Para terapeutas", href: "/" },
        { name: "Para nutricionistas", href: "/" },
      ],
    },
    { name: "Funcionalidades", href: "/" },
    { name: "Precios", href: "/" },
    { name: "Contacto", href: "/" },
  ]

  const [openDropdown, setOpenDropdown] = useState(null)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300",
        isScrolled ? "bg-background/80 border-b shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">MC</span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-bold gradient-text"
            >
              MediConnect
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item, i) => (
            <div key={item.name} className="relative">
              {item.children ? (
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      openDropdown === i ? "text-primary" : "text-muted-foreground hover:text-primary hover:bg-accent",
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn("ml-1 h-4 w-4 transition-transform", openDropdown === i ? "rotate-180" : "")}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-48 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary hover:bg-accent",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm" className="rounded-full px-4">
              Area pacientes
            </Button>
          </Link>
            <Link href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="rounded-full px-4">
              Registrarse
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" aria-label="Toggle Menu" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t"
          >
            <div className="container py-4 grid gap-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="space-y-2">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="pl-4 border-l space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="grid gap-2 pt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full rounded-full">Registrarse</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
