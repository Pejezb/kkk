"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, FileText, Home, Settings } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Panel Principal",
      href: "/dashboard/patient",
      icon: Home,
    },
    {
      title: "Reservar Cita",
      href: "/dashboard/patient/book",
      icon: Calendar,
    },
    {
      title: "Mis Citas",
      href: "/dashboard/patient/appointments",
      icon: Calendar,
    },
    {
      title: "Registros Médicos",
      href: "/dashboard/patient/records",
      icon: FileText,
    },
    {
      title: "Configuración",
      href: "/dashboard/patient/settings",
      icon: Settings,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
