"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import DashboardLayout from "@/components/dashboard-layout"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  if (!currentUser) {
    return <LoginPage onLogin={setCurrentUser} />
  }

  return <DashboardLayout currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
}
