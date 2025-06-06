import type { ReactNode } from "react"

import { DoctorNav } from "@/components/doctor-nav"
import { DoctorHeader } from "@/components/doctor-header"
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar"

interface DoctorLayoutProps {
  children: ReactNode
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <DoctorHeader />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarContent>
              <DoctorNav />
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
