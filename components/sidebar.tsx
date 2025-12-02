"use client"

import { Home, LogOut, X, Layers } from "lucide-react"
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
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-white/5 shadow-2xl shadow-black/20 flex flex-col transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="relative p-6 border-b border-white/5">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                  <Layers className="w-6 h-6 text-blue-400 relative" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">Analytics Hub</h1>
              </div>
              <div className="flex items-center gap-2 pl-8">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                <p className="text-xs text-slate-400 capitalize font-medium">{currentUser}</p>
              </div>
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
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <Button
            variant="ghost"
            onClick={() => {
              onSelectReport(null)
              setIsMobileMenuOpen(false)
            }}
            className={cn(
              "w-full justify-start gap-3 h-12 rounded-lg font-medium transition-all duration-300",
              !selectedReport
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-500"
                : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10",
            )}
          >
            <Home className="w-5 h-5" />
            <span>Inicio</span>
          </Button>

          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1">{category}</h3>
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
                        "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all duration-300 group relative",
                        selectedReport?.id === report.id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                          : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10",
                      )}
                    >
                      <div
                        className={cn(
                          "p-1.5 rounded-md transition-all duration-300",
                          selectedReport?.id === report.id
                            ? "bg-white/20"
                            : `${report.iconGradient} group-hover:scale-110`,
                        )}
                      >
                        <report.icon
                          className={cn(
                            "w-4 h-4 transition-all duration-300",
                            selectedReport?.id === report.id ? "text-white" : "text-white",
                          )}
                          style={{
                            filter:
                              selectedReport?.id !== report.id
                                ? `drop-shadow(0 0 8px ${report.iconColor.split(" ")[0].replace("from-", "")})`
                                : "none",
                          }}
                        />
                      </div>

                      <span className="flex-1 text-left text-pretty line-clamp-1 font-medium">{report.title}</span>

                      {selectedReport?.id === report.id && (
                        <div className="w-1 h-6 bg-white rounded-full absolute right-1" />
                      )}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start gap-3 h-12 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 border border-transparent hover:border-red-500/20 group font-medium"
          >
            <LogOut className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
