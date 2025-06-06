"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, MessageCircle, Activity } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export function PatientNav() {
  const pathname = usePathname()

  const navItems = [
    { title: "Dashboard", href: "/dashboard/patient", icon: Home },
    { title: "Reservar Cita", href: "/dashboard/patient/book", icon: Calendar },
    { title: "Foro", href: "/dashboard/patient/messages", icon: MessageCircle },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Paciente</SidebarGroupLabel>
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