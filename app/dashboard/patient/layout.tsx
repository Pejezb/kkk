import type { ReactNode } from "react"
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { PatientNav } from "@/components/patient-nav"
import { PatientHeader } from "@/components/patient-header"
export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <PatientHeader />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarContent>
              <PatientNav />
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}





