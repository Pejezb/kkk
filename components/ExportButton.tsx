"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExportButtonProps {
  data: any[]
  headers: string[]
  filename?: string
}

export const ExportButton = ({ data, headers, filename = "export.csv" }: ExportButtonProps) => {
  const handleExport = () => {
    if (!data || data.length === 0) return

    const csvRows = data.map(row =>
      headers.map(header => `"${row[header] ?? ""}"`).join(",")
    )

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...csvRows].join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Exportar CSV
    </Button>
  )
}
