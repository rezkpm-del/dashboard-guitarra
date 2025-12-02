"use client"

import { Menu, Sparkles, TrendingUp, ChevronRight } from "lucide-react"
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Card
              key={report.id}
              onClick={() => onSelectReport(report)}
              className={cn(
                "relative p-6 cursor-pointer transition-all duration-500 border border-slate-200/50 group animate-fade-in-up overflow-hidden bg-white",
                "hover:shadow-2xl hover:-translate-y-2 active:translate-y-0 active:scale-[0.98]",
                "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white before:to-slate-50 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
                `delay-${(index % 6) * 100 + 200}`,
              )}
              style={{
                transform: "perspective(1000px) rotateX(0deg)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget
                card.style.transform = "perspective(1000px) rotateX(2deg) translateY(-8px)"
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget
                card.style.transform = "perspective(1000px) rotateX(0deg) translateY(0px)"
              }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-xl -z-10" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="relative w-fit">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500",
                      `bg-gradient-to-br ${report.iconColor}`,
                    )}
                  />
                  <div
                    className={cn(
                      "relative p-4 rounded-2xl shadow-xl transition-all duration-500",
                      "group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl",
                      `bg-gradient-to-br ${report.iconColor} ${report.iconBgHover}`,
                    )}
                    style={{
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    <report.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg text-slate-900 text-pretty line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {report.title}
                  </h4>

                  <p className="text-sm text-slate-600 line-clamp-2 text-pretty leading-relaxed">
                    {report.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold",
                        "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700",
                        "group-hover:from-blue-50 group-hover:to-indigo-50 group-hover:text-blue-700",
                        "transition-all duration-300 shadow-sm",
                      )}
                    >
                      {report.category}
                    </span>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none skew-x-12" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
