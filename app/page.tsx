"use client"

import { useState, useEffect } from "react"
import LoginPage from "@/components/login-page"
import DashboardLayout from "@/components/dashboard-layout"
import { ChatSync, type ConnectedUser } from "@/lib/chat-sync"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([])
  const chatSync = ChatSync.getInstance()

  useEffect(() => {
    setConnectedUsers(chatSync.getUsers())

    const unsubscribe = chatSync.subscribe(() => {
      setConnectedUsers(chatSync.getUsers())
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!currentUser) return

    const interval = setInterval(() => {
      const now = new Date().toISOString()
      chatSync.updateUserStatus(currentUser, {
        status: "online",
        lastSeen: "Ahora",
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [currentUser])

  const handleLogin = (username: string) => {
    setCurrentUser(username)
    const now = new Date().toISOString()
    chatSync.updateUserStatus(username, {
      status: "online",
      connectedAt: now,
      disconnectedAt: null,
      lastSeen: "Ahora",
    })
  }

  const handleLogout = () => {
    if (currentUser) {
      const now = new Date().toISOString()
      chatSync.updateUserStatus(currentUser, {
        status: "offline",
        disconnectedAt: now,
        lastSeen: "Ahora mismo",
      })
    }
    setCurrentUser(null)
  }

  const handleForceDisconnect = (username: string) => {
    if (currentUser === "admin" && username !== "admin") {
      const now = new Date().toISOString()
      chatSync.updateUserStatus(username, {
        status: "offline",
        disconnectedAt: now,
        lastSeen: "Desconectado por admin",
      })
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
