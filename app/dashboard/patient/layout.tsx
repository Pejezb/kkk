// app/dashboard/patient/layout.tsx
import type { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { PatientNav } from "@/components/patient-nav";
import { PatientHeader } from "@/components/patient-header";

export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <PatientHeader />

        <div className="flex flex-1 bg-gray-50">
          <Sidebar className="w-60 border-r">
            <SidebarContent>
              <PatientNav />
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="container mx-auto p-6 w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
