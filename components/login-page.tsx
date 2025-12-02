"use client"

import type React from "react"

import { useState } from "react"
import { Lock, AlertCircle, User, KeyRound, Sparkles, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginPageProps {
  onLogin: (username: string) => void
}

const VALID_CREDENTIALS: Record<string, string> = {
  admin: "1234",
  operaciones: "grillo1860",
  dirección: "Rene4322",
  euskal: "euskal1960",
  nuñez: "nuñez1690",
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (VALID_CREDENTIALS[username] === password) {
        onLogin(username)
      } else {
        setError("Usuario o contraseña incorrectos")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        {/* Animated electric gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-full blur-[120px] opacity-30 animate-electric-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500 via-violet-400 to-purple-600 rounded-full blur-[100px] opacity-25 animate-electric-pulse-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-full blur-[140px] opacity-20 animate-electric-rotate" />
        </div>

        {/* AI Neural network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <g className="animate-neural-network">
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#line-gradient)" strokeWidth="2" />
            <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="url(#line-gradient)" strokeWidth="2" />
            <line x1="50%" y1="30%" x2="70%" y2="50%" stroke="url(#line-gradient)" strokeWidth="2" />
            <line x1="70%" y1="50%" x2="90%" y2="35%" stroke="url(#line-gradient)" strokeWidth="2" />
            <line x1="20%" y1="70%" x2="40%" y2="60%" stroke="url(#line-gradient)" strokeWidth="2" />
            <line x1="40%" y1="60%" x2="60%" y2="75%" stroke="url(#line-gradient)" strokeWidth="2" />
            <line x1="60%" y1="75%" x2="80%" y2="65%" stroke="url(#line-gradient)" strokeWidth="2" />
          </g>
          <g className="animate-neural-network-delayed">
            <circle cx="10%" cy="20%" r="4" fill="#3b82f6" className="animate-pulse-electric">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="30%" cy="40%" r="5" fill="#06b6d4" className="animate-pulse-electric">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="30%" r="4" fill="#6366f1" className="animate-pulse-electric">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="70%" cy="50%" r="6" fill="#8b5cf6" className="animate-pulse-electric">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="90%" cy="35%" r="4" fill="#3b82f6" className="animate-pulse-electric">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Electric particles */}
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-cyan-400 rounded-full animate-electric-spark shadow-lg shadow-cyan-400/80" />
          <div className="absolute top-[35%] right-[15%] w-2 h-2 bg-blue-400 rounded-full animate-electric-spark-delayed shadow-lg shadow-blue-400/80" />
          <div className="absolute bottom-[25%] left-[20%] w-2.5 h-2.5 bg-indigo-400 rounded-full animate-electric-spark shadow-lg shadow-indigo-400/80" />
          <div className="absolute top-[55%] right-[30%] w-2 h-2 bg-violet-400 rounded-full animate-electric-spark-delayed shadow-lg shadow-violet-400/80" />
          <div className="absolute bottom-[40%] right-[10%] w-3 h-3 bg-cyan-300 rounded-full animate-electric-spark shadow-lg shadow-cyan-300/80" />
          <div className="absolute top-[70%] left-[35%] w-2 h-2 bg-blue-300 rounded-full animate-electric-spark-delayed shadow-lg shadow-blue-300/80" />
        </div>

        {/* Tech grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Animated scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] bg-[length:100%_8px] animate-tech-scan" />
      </div>

      <div className="relative w-full max-w-md animate-scale-fade-in">
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/5 rounded-3xl border border-white/20 shadow-2xl shadow-blue-900/20 p-8 hover:shadow-blue-900/30 transition-all duration-500 relative overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-[100px]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-tr-[100px]" />

          <div className="text-center mb-8 relative">
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-50 animate-pulse-slow" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                <Lock className="w-9 h-9 text-white group-hover:rotate-12 transition-transform duration-300" />
                <Sparkles className="w-4 h-4 text-blue-200 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent tracking-tight">
              Enterprise Analytics Hub
            </h1>
            <p className="text-slate-300 text-sm flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              Plataforma Segura de Inteligencia de Negocios
            </p>

            {/* Tech status indicators */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                <span>Sistema Activo</span>
              </div>
              <div className="w-px h-4 bg-slate-600" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-blue-400" />
                <span>Conexión Segura</span>
              </div>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                Usuario
              </Label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 h-12 px-4 rounded-xl transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-blue-400" />
                Contraseña
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 h-12 px-4 rounded-xl transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-xl animate-shake backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full relative h-12 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Iniciar Sesión
                  </>
                )}
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              Contacta al administrador si tienes problemas de acceso
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
