"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import DashboardHome from "@/components/dashboard-home"
import ReportViewer from "@/components/report-viewer"
import { type Report, getReportsForUser } from "@/lib/reports-data"
import type { ConnectedUser } from "@/app/page"

interface DashboardLayoutProps {
  currentUser: string
  onLogout: () => void
  connectedUsers: ConnectedUser[]
  onForceDisconnect: (username: string) => void
}

export default function DashboardLayout({
  currentUser,
  onLogout,
  connectedUsers,
  onForceDisconnect,
}: DashboardLayoutProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const userReports = getReportsForUser(currentUser)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        currentUser={currentUser}
        reports={userReports}
        selectedReport={selectedReport}
        onSelectReport={setSelectedReport}
        onLogout={onLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 overflow-hidden">
        {selectedReport ? (
          <ReportViewer report={selectedReport} onBack={() => setSelectedReport(null)} />
        ) : (
          <DashboardHome
            currentUser={currentUser}
            reports={userReports}
            onSelectReport={setSelectedReport}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            connectedUsers={connectedUsers}
            onForceDisconnect={onForceDisconnect}
          />
        )}
      </main>
    </div>
  )
}
