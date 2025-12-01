"use client"

import { Menu, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Report } from "@/lib/reports-data"
import { cn } from "@/lib/utils"

interface DashboardHomeProps {
  currentUser: string
  reports: Report[]
  onSelectReport: (report: Report) => void
  onOpenMobileMenu: () => void
}

export default function DashboardHome({ currentUser, reports, onSelectReport, onOpenMobileMenu }: DashboardHomeProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 19) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="h-full overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenMobileMenu}
              className="lg:hidden hover:bg-slate-100 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent capitalize">
                  {getGreeting()}, {currentUser}
                </h2>
                <Sparkles className="w-5 h-5 text-blue-500 animate-pulse-slow" />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                Tienes acceso a {reports.length} {reports.length === 1 ? "reporte" : "reportes"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="p-6">
        <div className="mb-6 animate-fade-in delay-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
            Tus Reportes Disponibles
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              {reports.length}
            </span>
          </h3>
          <p className="text-sm text-slate-600 text-balance">
            Selecciona un reporte para visualizar la información detallada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reports.map((report, index) => (
            <Card
              key={report.id}
              onClick={() => onSelectReport(report)}
              className={cn(
                "relative p-6 cursor-pointer transition-all duration-500 border-2 border-slate-200/80 hover:border-blue-300 group animate-fade-in-up overflow-hidden bg-gradient-to-br from-white to-slate-50/50",
                "hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.03] active:scale-[0.98]",
                `delay-${(index % 6) * 100 + 200}`,
              )}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative p-3 bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <report.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 mb-2 text-pretty line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {report.title}
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2 text-pretty leading-relaxed">
                    {report.description}
                  </p>

                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:text-blue-700 transition-all duration-300">
                    {report.category}
                  </span>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
