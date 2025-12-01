"use client"

import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Report } from "@/lib/reports-data"

interface ReportViewerProps {
  report: Report
  onBack: () => void
}

export default function ReportViewer({ report, onBack }: ReportViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 py-4 border-b border-slate-200 bg-white z-10">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0 animate-fade-in">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md shadow-blue-500/30">
            <report.icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-slate-900 truncate">{report.title}</h2>
            <p className="text-xs text-slate-600">{report.category}</p>
          </div>
        </div>
      </header>

      {/* Report iframe */}
      <div className="flex-1 relative bg-slate-50">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
            <div className="text-center animate-fade-in">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-sm text-slate-600 font-medium">Cargando reporte...</p>
              <p className="text-xs text-slate-500 mt-1">Por favor espera un momento</p>
            </div>
          </div>
        )}
        <iframe
          src={report.url}
          className="w-full h-full border-0 animate-fade-in"
          title={report.title}
          onLoad={() => setIsLoading(false)}
          allowFullScreen
        />
      </div>
    </div>
  )
}
