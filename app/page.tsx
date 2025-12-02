"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import DashboardLayout from "@/components/dashboard-layout"

export interface ConnectedUser {
  username: string
  status: "online" | "offline"
  connectedAt: Date | null
  disconnectedAt: Date | null
  lastSeen: string
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([
    { username: "admin", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
    {
      username: "operaciones",
      status: "online",
      connectedAt: new Date(Date.now() - 120000),
      disconnectedAt: null,
      lastSeen: "Hace 2 min",
    },
    {
      username: "dirección",
      status: "offline",
      connectedAt: null,
      disconnectedAt: new Date(Date.now() - 900000),
      lastSeen: "Hace 15 min",
    },
    {
      username: "euskal",
      status: "online",
      connectedAt: new Date(Date.now() - 60000),
      disconnectedAt: null,
      lastSeen: "Hace 1 min",
    },
    {
      username: "nuñez",
      status: "offline",
      connectedAt: null,
      disconnectedAt: new Date(Date.now() - 1800000),
      lastSeen: "Hace 30 min",
    },
  ])

  const handleLogin = (username: string) => {
    setCurrentUser(username)
    setConnectedUsers((prev) =>
      prev.map((user) =>
        user.username === username
          ? { ...user, status: "online", connectedAt: new Date(), disconnectedAt: null, lastSeen: "Ahora" }
          : user,
      ),
    )
  }

  const handleLogout = () => {
    if (currentUser) {
      setConnectedUsers((prev) =>
        prev.map((user) =>
          user.username === currentUser
            ? { ...user, status: "offline", disconnectedAt: new Date(), lastSeen: "Ahora mismo" }
            : user,
        ),
      )
    }
    setCurrentUser(null)
  }

  const handleForceDisconnect = (username: string) => {
    if (currentUser === "admin" && username !== "admin") {
      setConnectedUsers((prev) =>
        prev.map((user) =>
          user.username === username
            ? { ...user, status: "offline", disconnectedAt: new Date(), lastSeen: "Desconectado por admin" }
            : user,
        ),
      )
      // If the disconnected user is the current user, log them out
      if (username === currentUser) {
        setCurrentUser(null)
      }
    }
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <DashboardLayout
      currentUser={currentUser}
      onLogout={handleLogout}
      connectedUsers={connectedUsers}
      onForceDisconnect={handleForceDisconnect}
    />
  )
}
