"use client"

import { Home, LogOut, X, Layers, Shield, Cpu } from "lucide-react"
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
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/50 shadow-2xl shadow-black/20 flex flex-col transition-transform duration-300 ease-in-out relative overflow-hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Tech grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

        {/* Gradient accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-[100px]" />

        {/* Header */}
        <div className="relative p-6 border-b border-slate-800/50">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
                  <div className="relative p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight">Analytics Hub</h1>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Enterprise Edition</p>
                </div>
              </div>

              {/* User badge */}
              <div className="flex items-center gap-2.5 pl-1 mt-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                  <span className="text-xs text-slate-300 capitalize font-medium">{currentUser}</span>
                </div>
                <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <Shield className="w-3 h-3 text-blue-400" />
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90 rounded-lg"
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
              "w-full justify-start gap-3 h-12 rounded-xl font-medium transition-all duration-300 relative overflow-hidden",
              !selectedReport
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-500 border border-blue-500/50"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white border border-slate-700/0 hover:border-slate-700/50",
            )}
          >
            <Home className={cn("w-5 h-5", !selectedReport && "drop-shadow-lg")} />
            <span>Panel Principal</span>
            {!selectedReport && <div className="absolute right-2 w-1.5 h-6 bg-white/50 rounded-full" />}
          </Button>

          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2">
                <Cpu className="w-3 h-3 text-blue-400" />
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex-1">{category}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
              </div>
              <div className="space-y-1.5">
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
                        "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-300 group relative overflow-hidden",
                        selectedReport?.id === report.id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 border border-blue-500/50"
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-white border border-slate-700/0 hover:border-slate-700/50",
                      )}
                    >
                      {/* Icon with gradient glow */}
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-all duration-300 relative",
                          selectedReport?.id === report.id
                            ? "bg-white/20 shadow-lg"
                            : `${report.iconGradient} group-hover:scale-110`,
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300",
                            selectedReport?.id !== report.id && `bg-gradient-to-br ${report.iconColor}`,
                          )}
                        />
                        <report.icon
                          className={cn(
                            "w-4 h-4 relative z-10 transition-all duration-300",
                            selectedReport?.id === report.id ? "text-white drop-shadow-lg" : "text-white",
                          )}
                        />
                      </div>

                      <span className="flex-1 text-left text-pretty line-clamp-1 font-medium">{report.title}</span>

                      {selectedReport?.id === report.id && (
                        <div className="absolute right-2 w-1.5 h-8 bg-white/70 rounded-full shadow-lg" />
                      )}

                      {/* Hover shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start gap-3 h-12 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/20 group font-medium"
          >
            <div className="p-1.5 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300">
              <LogOut className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
            </div>
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </aside>
    </>
  )
}
