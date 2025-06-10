// components/patient-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, FilePlus, CalendarCheck, FileText } from "lucide-react";

export function PatientNav() {
  const pathname = usePathname();

  const navItems = [
    { title: "Dashboard", href: "/dashboard/patient", icon: Home },
    { title: "Solicitud Cita", href: "/dashboard/patient/solicitudes", icon: FilePlus },
    { title: "Citas Programadas", href: "/dashboard/patient/appointments", icon: CalendarCheck },
    { title: "Historial Clínico", href: "/dashboard/patient/historial", icon: FileText },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Paciente</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map(({ title, href, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild isActive={pathname === href} tooltip={title}>
                <Link href={href} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100">
                  <Icon className="h-5 w-5" />
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
