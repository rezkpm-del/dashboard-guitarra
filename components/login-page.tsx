"use client"

import type React from "react"

import { useState } from "react"
import { Lock, AlertCircle, User, KeyRound, Sparkles } from "lucide-react"
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
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl animate-float-reverse" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative w-full max-w-md animate-scale-fade-in">
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl shadow-blue-900/20 p-8 hover:shadow-blue-900/30 transition-shadow duration-500">
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-50 animate-pulse-slow" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                <Lock className="w-9 h-9 text-white group-hover:rotate-12 transition-transform duration-300" />
                <Sparkles className="w-4 h-4 text-blue-200 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Enterprise Analytics Hub
            </h1>
            <p className="text-slate-300 text-sm">Accede a tus reportes de Power BI</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 h-12 px-4 rounded-xl transition-all duration-300 group-hover:bg-white/15"
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
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 h-12 px-4 rounded-xl transition-all duration-300 group-hover:bg-white/15"
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
