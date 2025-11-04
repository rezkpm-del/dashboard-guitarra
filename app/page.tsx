"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LogOut, BarChart3 } from "lucide-react"

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const validUsers = [
    { username: "admin", password: "1234" },
    { username: "operaciones", password: "dongrillo1234" },
    { username: "direccion", password: "Rene4322" },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = validUsers.some((user) => user.username === username && user.password === password)

    if (isValid) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername("")
    setPassword("")
    setError("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <BarChart3 className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Dashboard de Ventas</CardTitle>
            <CardDescription>La Guitarra - Ingresa tus credenciales</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
              )}
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-slate-900">Dashboard de Ventas - La Guitarra</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://app.powerbi.com/view?r=eyJrIjoiN2I2ODYzZjItMDFlNS00MTFmLThiMDctZWNlZGZlNTkwNDdjIiwidCI6ImE2NWVhNzhhLTg3ODAtNDJjNy1hMGVlLWMyYjBiMWJhZDRiMiIsImMiOjR9"
            className="w-full min-h-[800px] border-0"
            title="Dashboard de Power BI"
            allowFullScreen
          />
        </div>
      </main>
    </div>
  )
}
