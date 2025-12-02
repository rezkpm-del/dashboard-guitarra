"use client"

import {
  Menu,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Activity,
  BarChart3,
  Database,
  Zap,
  Users,
  MessageSquare,
  X,
  Send,
  Clock,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Report } from "@/lib/reports-data"
import type { ConnectedUser } from "@/app/page"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChatSync, type Message } from "@/lib/chat-sync"

interface DashboardHomeProps {
  currentUser: string
  reports: Report[]
  onSelectReport: (report: Report) => void
  onOpenMobileMenu: () => void
  connectedUsers: ConnectedUser[]
  onForceDisconnect: (username: string) => void
}

export default function DashboardHome({
  currentUser,
  reports,
  onSelectReport,
  onOpenMobileMenu,
  connectedUsers,
  onForceDisconnect,
}: DashboardHomeProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatSync = ChatSync.getInstance()

  useEffect(() => {
    setMessages(chatSync.getMessages())

    const unsubscribe = chatSync.subscribe(() => {
      setMessages(chatSync.getMessages())
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const conversationMessages = messages.filter((msg) => {
    if (currentUser === "admin") {
      return (
        (msg.from === currentUser && msg.to === selectedChatUser) ||
        (msg.from === selectedChatUser && msg.to === currentUser)
      )
    } else {
      // Non-admin users can only chat with admin
      return (msg.from === currentUser && msg.to === "admin") || (msg.from === "admin" && msg.to === currentUser)
    }
  })

  const sendMessage = () => {
    if (messageText.trim() && (selectedChatUser || currentUser !== "admin")) {
      const recipient = currentUser === "admin" ? selectedChatUser : "admin"
      if (!recipient) return

      const newMessage: Message = {
        id: `${Date.now()}-${Math.random()}`,
        from: currentUser,
        to: recipient,
        text: messageText.trim(),
        timestamp: new Date().toISOString(),
      }
      chatSync.addMessage(newMessage)
      setMessageText("")
    }
  }

  const onlineUsers = connectedUsers.filter((u) => u.status === "online" && u.username !== currentUser)

  const formatTime = (date: Date | string | null) => {
    if (!date) return "N/A"
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A"
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 19) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="h-full overflow-y-auto relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* First wave of pizzas */}
          <Image
            src="/images/gemini-generated-image-x1jrzex1jrzex1jr-removebg-preview.png"
            alt=""
            width={120}
            height={120}
            className="absolute top-[10%] left-[5%] w-24 h-24 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "0s" }}
          />
          <Image
            src="/images/gemini-generated-image-yysfmuyysfmuyysf-1-removebg-preview.png"
            alt=""
            width={100}
            height={100}
            className="absolute top-[20%] right-[8%] w-20 h-20 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "0.5s" }}
          />
          <Image
            src="/images/gemini-generated-image-fhprw1fhprw1fhpr-removebg-preview.png"
            alt=""
            width={110}
            height={110}
            className="absolute top-[45%] left-[10%] w-24 h-24 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "1s" }}
          />

          {/* Second wave of pizzas */}
          <Image
            src="/images/gemini-generated-image-x1jrzex1jrzex1jr-removebg-preview.png"
            alt=""
            width={90}
            height={90}
            className="absolute bottom-[15%] right-[12%] w-20 h-20 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "1.5s" }}
          />
          <Image
            src="/images/gemini-generated-image-yysfmuyysfmuyysf-1-removebg-preview.png"
            alt=""
            width={130}
            height={130}
            className="absolute top-[60%] right-[20%] w-28 h-28 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "2s" }}
          />
          <Image
            src="/images/gemini-generated-image-fhprw1fhprw1fhpr-removebg-preview.png"
            alt=""
            width={105}
            height={105}
            className="absolute bottom-[25%] left-[15%] w-24 h-24 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "2.5s" }}
          />

          {/* Third wave of pizzas */}
          <Image
            src="/images/gemini-generated-image-x1jrzex1jrzex1jr-removebg-preview.png"
            alt=""
            width={115}
            height={115}
            className="absolute top-[75%] right-[5%] w-26 h-26 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "3s" }}
          />
          <Image
            src="/images/gemini-generated-image-yysfmuyysfmuyysf-1-removebg-preview.png"
            alt=""
            width={95}
            height={95}
            className="absolute top-[35%] left-[25%] w-22 h-22 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "3.5s" }}
          />
          <Image
            src="/images/gemini-generated-image-fhprw1fhprw1fhpr-removebg-preview.png"
            alt=""
            width={125}
            height={125}
            className="absolute bottom-[40%] right-[25%] w-28 h-28 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "4s" }}
          />

          {/* Fourth wave for more coverage */}
          <Image
            src="/images/gemini-generated-image-x1jrzex1jrzex1jr-removebg-preview.png"
            alt=""
            width={100}
            height={100}
            className="absolute top-[5%] right-[30%] w-22 h-22 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "4.5s" }}
          />
          <Image
            src="/images/gemini-generated-image-yysfmuyysfmuyysf-1-removebg-preview.png"
            alt=""
            width={110}
            height={110}
            className="absolute bottom-[10%] left-[8%] w-24 h-24 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "5s" }}
          />
          <Image
            src="/images/gemini-generated-image-fhprw1fhprw1fhpr-removebg-preview.png"
            alt=""
            width={120}
            height={120}
            className="absolute top-[50%] right-[35%] w-26 h-26 object-contain animate-pizza-float-smooth opacity-0"
            style={{ animationDelay: "5.5s" }}
          />
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/30 via-blue-500/25 to-transparent rounded-full blur-3xl animate-electric-pulse" />
          <div className="absolute bottom-[5%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/30 via-violet-500/25 to-transparent rounded-full blur-3xl animate-electric-pulse-delayed" />
          <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 via-cyan-400/15 to-transparent rounded-full blur-3xl animate-electric-rotate" />
          <div
            className="absolute top-[70%] right-[25%] w-[450px] h-[450px] bg-gradient-to-br from-violet-500/25 via-purple-500/20 to-transparent rounded-full blur-3xl animate-electric-pulse"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="absolute inset-0">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `electric-spark ${3 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: "#3b82f6", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "#6366f1", stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>

            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#gradient1)"
                strokeWidth="2"
                className="animate-neural-network"
                style={{
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </svg>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e910_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e910_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-tech-scan" />
            <div
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-tech-scan"
              style={{ animationDelay: "5s" }}
            />
          </div>

          <div className="absolute top-[30%] right-[25%] w-3 h-3 bg-blue-400 rounded-full border-2 border-slate-900 shadow-lg shadow-blue-400/50 animate-pulse" />
          <div
            className="absolute bottom-[40%] left-[20%] w-2.5 h-2.5 bg-indigo-400 rounded-full border-2 border-slate-900 shadow-2xl shadow-indigo-400 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-[60%] right-[40%] w-2 h-2 bg-cyan-400 rounded-full border-2 border-slate-900 shadow-2xl shadow-cyan-400 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-[20%] left-[45%] w-3 h-3 bg-violet-400 rounded-full border-2 border-slate-900 shadow-2xl shadow-violet-400 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-[80%] right-[60%] w-2.5 h-2.5 bg-blue-400 rounded-full border-2 border-slate-900 shadow-2xl shadow-blue-400 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-[10%] left-[70%] w-2 h-2 bg-cyan-400 rounded-full border-2 border-slate-900 shadow-2xl shadow-cyan-400 animate-pulse"
            style={{ animationDelay: "2.5s" }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-20 bg-slate-900/70 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenMobileMenu}
                  className="lg:hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl text-white"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent capitalize">
                      {getGreeting()}, {currentUser}
                    </h2>
                    <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    Acceso a {reports.length} {reports.length === 1 ? "reporte" : "reportes"} de analítica empresarial
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 text-xs">
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                  <span className="text-emerald-300 font-medium">Sistema Operativo</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-lg backdrop-blur-sm">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300 font-medium">Datos en Tiempo Real</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
            <Card className="p-5 border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:border-cyan-400/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-300 font-medium mb-1">Reportes Disponibles</p>
                  <p className="text-3xl font-bold text-white">{reports.length}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </Card>

            <Card className="p-5 border-blue-500/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-400/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-300 font-medium mb-1">Categorías Activas</p>
                  <p className="text-3xl font-bold text-white">{new Set(reports.map((r) => r.category)).size}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-400/30">
                  <Database className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            {currentUser === "admin" ? (
              <Card
                className="p-5 border-violet-500/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 hover:border-violet-400/50 cursor-pointer"
                onClick={() => setIsChatOpen(true)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-300 font-medium mb-1">Usuarios Conectados</p>
                    <p className="text-3xl font-bold text-white">{onlineUsers.length}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-xs text-violet-300">Click para mensajería</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl border border-violet-400/30">
                    <Users className="w-6 h-6 text-violet-400" />
                  </div>
                </div>
              </Card>
            ) : (
              <Card
                className="p-5 border-violet-500/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 hover:border-violet-400/50 cursor-pointer"
                onClick={() => setIsChatOpen(true)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-300 font-medium mb-1">Contactar Admin</p>
                    <p className="text-lg font-bold text-violet-400 flex items-center gap-2 mt-1">
                      <MessageSquare className="w-5 h-5" />
                      Mensajería
                    </p>
                    <p className="text-xs text-slate-400 mt-2">Click para enviar mensaje</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl border border-violet-400/30">
                    <Zap className="w-6 h-6 text-violet-400" />
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="mb-6 animate-fade-in delay-100">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              Panel de Reportes
              <span className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full font-medium shadow-lg shadow-cyan-500/30">
                {reports.length}
              </span>
            </h3>
            <p className="text-sm text-slate-300 text-balance">
              Accede a análisis detallados y métricas empresariales en tiempo real
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <Card
                key={report.id}
                onClick={() => onSelectReport(report)}
                className={cn(
                  "relative p-6 cursor-pointer transition-all duration-500 border border-cyan-500/30 group animate-fade-in-up overflow-hidden",
                  "bg-slate-900/50 backdrop-blur-xl",
                  "hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-3 hover:border-cyan-400/60 active:translate-y-0 active:scale-[0.98]",
                  "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-cyan-500/10 before:via-blue-500/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
                  `delay-${(index % 6) * 100 + 200}`,
                )}
                style={{
                  transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget
                  const rect = card.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  const centerX = rect.width / 2
                  const centerY = rect.height / 2
                  const rotateX = (y - centerY) / 20
                  const rotateY = (centerX - x) / 20
                  card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget
                  card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)"
                }}
              >
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10",
                    `bg-gradient-to-br ${report.iconColor}`,
                  )}
                />

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="relative w-fit">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-500",
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
                        boxShadow:
                          "0 20px 40px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)",
                      }}
                    >
                      <report.icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-lg shadow-emerald-400/50 animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-lg text-white text-pretty line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                      {report.title}
                    </h4>

                    <p className="text-sm text-slate-300 line-clamp-2 text-pretty leading-relaxed">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold",
                          "bg-gradient-to-r from-slate-800/80 to-slate-700/80 text-slate-200 border border-slate-600/50 backdrop-blur-sm",
                          "group-hover:from-cyan-500/20 group-hover:to-blue-500/20 group-hover:text-cyan-300 group-hover:border-cyan-400/50",
                          "transition-all duration-300 shadow-sm",
                        )}
                      >
                        {report.category}
                      </span>

                      <div className="flex items-center gap-1.5 text-cyan-400 font-medium text-sm group-hover:gap-2.5 transition-all duration-300">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ver</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none skew-x-12" />
              </Card>
            ))}
          </div>
        </div>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-5xl h-[700px] bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 flex overflow-hidden animate-slide-up">
            {currentUser === "admin" && (
              <div className="w-80 border-r border-cyan-500/20 bg-slate-900/60 flex flex-col">
                <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-violet-400" />
                    Usuarios del Sistema
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{onlineUsers.length} en línea</p>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {connectedUsers
                    .filter((user) => user.username !== "admin")
                    .map((user) => (
                      <div
                        key={user.username}
                        onClick={() => setSelectedChatUser(user.username)}
                        className={cn(
                          "p-3 rounded-lg cursor-pointer transition-all duration-300 border",
                          selectedChatUser === user.username
                            ? "bg-violet-500/20 border-violet-400/50"
                            : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:border-violet-400/30",
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-2.5 h-2.5 rounded-full shadow-lg",
                                user.status === "online"
                                  ? "bg-emerald-400 shadow-emerald-400/50 animate-pulse"
                                  : "bg-slate-500 shadow-slate-500/50",
                              )}
                            />
                            <span className="font-medium text-white capitalize text-sm">{user.username}</span>
                          </div>
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full font-medium",
                              user.status === "online"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-slate-600/50 text-slate-400",
                            )}
                          >
                            {user.status === "online" ? "Online" : "Offline"}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          {user.connectedAt && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              <span>
                                Conectado: {formatDate(user.connectedAt)} {formatTime(user.connectedAt)}
                              </span>
                            </div>
                          )}
                          {user.disconnectedAt && user.status === "offline" && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Clock className="w-3 h-3 text-orange-400" />
                              <span>
                                Desconectado: {formatDate(user.disconnectedAt)} {formatTime(user.disconnectedAt)}
                              </span>
                            </div>
                          )}
                        </div>

                        {user.status === "online" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              onForceDisconnect(user.username)
                            }}
                            className="w-full mt-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 hover:border-red-400/50 transition-all duration-300"
                          >
                            <LogOut className="w-3 h-3 mr-1.5" />
                            Desconectar Usuario
                          </Button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    {currentUser === "admin" ? (
                      selectedChatUser ? (
                        <>Conversación con {selectedChatUser}</>
                      ) : (
                        <>Selecciona un usuario</>
                      )
                    ) : (
                      <>Chat con Admin</>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentUser === "admin"
                      ? "Gestiona las conversaciones con tu equipo"
                      : "Envía mensajes al administrador del sistema"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsChatOpen(false)
                    setSelectedChatUser(null)
                  }}
                  className="text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {currentUser !== "admin" || selectedChatUser ? (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/50">
                    {conversationMessages.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400 text-sm">
                            {currentUser === "admin"
                              ? "No hay mensajes aún. Inicia la conversación."
                              : "Envía un mensaje al admin para comenzar"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      conversationMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn("flex", msg.from === currentUser ? "justify-end" : "justify-start")}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm",
                              msg.from === currentUser
                                ? "bg-gradient-to-br from-cyan-500/90 to-blue-600/90 text-white rounded-br-sm"
                                : "bg-slate-800/90 text-slate-100 border border-slate-700/50 rounded-bl-sm",
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold capitalize opacity-90">
                                {msg.from === currentUser ? "Tú" : msg.from}
                              </span>
                              <span className="text-xs opacity-70">
                                {new Date(msg.timestamp).toLocaleTimeString("es-ES", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-cyan-500/20 bg-slate-900/60">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!messageText.trim()}
                        className="px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-slate-950/50">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg font-medium">Selecciona un usuario</p>
                    <p className="text-slate-500 text-sm mt-2">
                      Elige un usuario de la lista para iniciar una conversación
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
