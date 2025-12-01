"use client"

import { Home, LogOut, X, ChevronRight, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Report } from "@/lib/reports-data"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentUser: string
  reports: Report[]
  selectedReport: Report | null
  onSelectReport: (report: Report | null) => void
  onLogout: () => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function Sidebar({
  currentUser,
  reports,
  selectedReport,
  onSelectReport,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const categories = Array.from(new Set(reports.map((r) => r.category)))

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 shadow-2xl shadow-black/20 flex flex-col transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="relative p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-5 h-5 text-blue-400" />
                <h1 className="text-xl font-bold text-white text-balance">Analytics Hub</h1>
              </div>
              <p className="text-xs text-slate-400 mt-1 capitalize flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {currentUser}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          <Button
            variant="ghost"
            onClick={() => {
              onSelectReport(null)
              setIsMobileMenuOpen(false)
            }}
            className={cn(
              "w-full justify-start gap-3 h-11 rounded-xl font-medium transition-all duration-300",
              !selectedReport
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-500 hover:to-indigo-500 scale-[1.02]"
                : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-[1.02]",
            )}
          >
            <Home className="w-5 h-5" />
            <span>Inicio</span>
          </Button>

          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
                {category}
                <div className="h-px flex-1 bg-gradient-to-l from-slate-700 to-transparent" />
              </h3>
              <div className="space-y-1">
                {reports
                  .filter((r) => r.category === category)
                  .map((report) => (
                    <button
                      key={report.id}
                      onClick={() => {
                        onSelectReport(report)
                        setIsMobileMenuOpen(false)
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 group relative overflow-hidden",
                        selectedReport?.id === report.id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-slate-300 hover:bg-white/10 hover:text-white hover:scale-[1.02]",
                      )}
                    >
                      {/* Hover gradient effect */}
                      {selectedReport?.id !== report.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      )}

                      <report.icon className="w-4 h-4 flex-shrink-0 relative z-10" />
                      <span className="flex-1 text-left text-pretty line-clamp-2 relative z-10">{report.title}</span>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-all duration-300 relative z-10",
                          selectedReport?.id === report.id
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                        )}
                      />
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start gap-3 h-11 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 hover:scale-[1.02] group font-medium"
          >
            <LogOut className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
